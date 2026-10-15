// Firebase 초기화 + 로그인 확인. Firebase SDK 버전은 이 파일에서만 관리합니다.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

export { signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
export {
    collection, doc, getDoc, getDocs, addDoc, setDoc, updateDoc, deleteDoc,
    query, where, orderBy, serverTimestamp, writeBatch, Timestamp
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// Firebase 콘솔 > 프로젝트 설정 > 일반 > 내 앱 > "SDK 설정 및 구성"의 값을 붙여넣으세요.
// (웹 apiKey는 공개되어도 되는 값입니다. 데이터 보호는 firestore.rules가 담당합니다.)
const firebaseConfig = {
    apiKey: "AIzaSyBs1mgUE55w2-zDTXj-vCImQT4DM32GlTg",
    authDomain: "level-test-70c72.firebaseapp.com",
    projectId: "level-test-70c72",
    storageBucket: "level-test-70c72.firebasestorage.app",
    messagingSenderId: "1058819690998",
    appId: "1:1058819690998:web:f8d66bb0e5c37fb07177d7"
};

if (firebaseConfig.apiKey.startsWith('YOUR_')) {
    alert('Firebase 설정이 비어 있습니다. assets/js/firebase.js에 프로젝트 설정값을 입력하세요. (README.md 참고)');
    throw new Error('Firebase config missing');
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// 로그인되어 있으면 <body hidden>을 풀고 user를 돌려주고, 아니면 로그인 페이지로 보냅니다.
export function requireAuth() {
    return new Promise(resolve => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            unsubscribe();
            if (user) {
                document.body.hidden = false;
                resolve(user);
            } else {
                const current = (location.pathname.split('/').pop() || 'index.html') + location.search;
                location.replace(`login.html?next=${encodeURIComponent(current)}`);
            }
        });
    });
}

export async function logout() {
    await signOut(auth);
    location.replace('login.html');
}
