// 페이지 공통 유틸 (DB와 무관)

const DRAFT_KEY = 'reportDraft';

export function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
}

// toISOString()은 UTC 기준이라 한국 시간 오전 9시 전에는 전날 날짜가 나오므로 로컬 날짜를 직접 조합
export function todayLocal() {
    const d = new Date();
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function isValidScore(n) {
    return Number.isFinite(n) && n >= 0 && n <= 100;
}

// 소수 첫째 자리까지의 숫자
export function calcAverage(scores, fields) {
    if (!fields.length) return 0;
    const sum = fields.reduce((acc, f) => acc + (Number(scores?.[f.key]) || 0), 0);
    return Math.round((sum / fields.length) * 10) / 10;
}

// index → test → result 사이에서 아직 저장 전인 입력값을 넘겨주는 임시 저장소.
// 탭을 닫으면 사라지도록 sessionStorage 사용 (공용 PC에 학생 정보가 남지 않게)
export function loadDraft() {
    try {
        return JSON.parse(sessionStorage.getItem(DRAFT_KEY));
    } catch {
        return null;
    }
}

export function saveDraft(draft) {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

export function clearDraft() {
    sessionStorage.removeItem(DRAFT_KEY);
}
