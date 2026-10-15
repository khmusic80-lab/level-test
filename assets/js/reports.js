// 리포트 저장소 접근은 모두 이 파일을 거칩니다. DB를 바꿀 때는 이 파일만 고치면 됩니다.
import {
    db, collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc,
    query, where, orderBy, serverTimestamp, writeBatch, Timestamp
} from './firebase.js';

export const reportsCol = collection(db, 'entrance_reports');

const withId = snap => ({ id: snap.id, ...snap.data() });

export async function listReports() {
    const snap = await getDocs(query(reportsCol, orderBy('created_at', 'desc')));
    return snap.docs.map(withId);
}

export async function listReportsByMajor(major) {
    const snap = await getDocs(query(reportsCol, where('major', '==', major)));
    return snap.docs.map(withId);
}

export async function getReport(id) {
    const snap = await getDoc(doc(reportsCol, id));
    return snap.exists() ? withId(snap) : null;
}

// 새 문서 id를 돌려줍니다.
export async function createReport(data) {
    const ref = await addDoc(reportsCol, {
        ...data,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
    });
    return ref.id;
}

export function updateReport(id, data) {
    return updateDoc(doc(reportsCol, id), { ...data, updated_at: serverTimestamp() });
}

export function deleteReport(id) {
    return deleteDoc(doc(reportsCol, id));
}

// 백업용: 날짜를 ISO 문자열로 바꾼 일반 객체 배열
export async function exportReports() {
    return (await listReports()).map(r => ({
        ...r,
        created_at: r.created_at?.toDate?.().toISOString() ?? null,
        updated_at: r.updated_at?.toDate?.().toISOString() ?? null
    }));
}

// 복원용: 같은 id는 덮어쓰고 없으면 새로 만듦. 목록에 없는 리포트는 건드리지 않음.
export async function upsertReports(reports) {
    // Firestore 배치는 최대 500건
    for (let i = 0; i < reports.length; i += 400) {
        const batch = writeBatch(db);
        for (const { id, created_at, ...data } of reports.slice(i, i + 400)) {
            const created = created_at ? new Date(created_at) : null;
            batch.set(doc(reportsCol, id), {
                ...data,
                created_at: created && !isNaN(created) ? Timestamp.fromDate(created) : serverTimestamp(),
                updated_at: serverTimestamp()
            });
        }
        await batch.commit();
    }
}
