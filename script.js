import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
    getDatabase, ref, onValue, push, set, update, remove, get
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// ====== Firebase Config ======
const firebaseConfig = {
    apiKey: "AIzaSyAg5S0_3O1EicYWqY8jVulF_bF_0kspmDg",
    authDomain: "vip-system-d8317.firebaseapp.com",
    databaseURL: "https://vip-system-d8317-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vip-system-d8317",
    storageBucket: "vip-system-d8317.firebasestorage.app",
    messagingSenderId: "584414132253",
    appId: "1:584414132253:web:5a4ca54246fb66d0ed6ef4"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// ====== STATE ======
let isAdmin = false;
let currentUser = null;
let vipsData = {};
let countdownInterval = null;

// ====== ELEMENTS ======
const modal       = document.getElementById("loginModal");
const adminPassEl = document.getElementById("adminPass"); // ใช้เป็น password input
const msgEl       = document.getElementById("msg");
const vipListEl   = document.getElementById("vip-list");
const histListEl  = document.getElementById("history-list");
const vipCountEl  = document.getElementById("vip-count");
const expCountEl  = document.getElementById("expired-count");
const histCountEl = document.getElementById("history-count");

// ====== AUTH LOGIN (SAFE) ======
document.getElementById("loginBtn").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = adminPassEl.value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        msgEl.style.color = "#4caf50";
        msgEl.textContent = "✅ Login สำเร็จ";
    } catch (e) {
        msgEl.style.color = "#f44336";
        msgEl.textContent = "❌ Login ไม่สำเร็จ";
    }
});

// ====== CHECK ADMIN ======
async function checkAdmin(uid) {
    const snap = await get(ref(db, `admins/${uid}`));
    return snap.exists();
}

// ====== AUTH STATE ======
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        isAdmin = false;
        currentUser = null;
        return;
    }

    currentUser = user;
    isAdmin = await checkAdmin(user.uid);

    console.log("ADMIN STATUS:", isAdmin);

    renderVips();
});

// ====== ADD VIP ======
document.getElementById("addVipBtn").addEventListener("click", async () => {
    if (!currentUser) return alert("ต้อง login ก่อน");

    if (!isAdmin) return alert("คุณไม่ใช่แอดมิน");

    const name = document.getElementById("vipName").value.trim();
    const days = parseInt(document.getElementById("vipDays").value) || 0;
    const note = document.getElementById("vipNote").value.trim();

    if (!name || days < 1) return alert("ข้อมูลไม่ถูกต้อง");

    const expiryTimestamp = Date.now() + days * 86400000;

    const newRef = push(ref(db, "vips"));

    await set(newRef, {
        name,
        days,
        note,
        expiryTimestamp,
        addedAt: Date.now(),
        createdBy: currentUser.uid
    });

    msgEl.textContent = "✅ เพิ่ม VIP สำเร็จ";
});

// ====== DELETE VIP ======
async function deleteVip(key) {
    if (!isAdmin) return alert("ไม่มีสิทธิ์");

    const snap = await get(ref(db, `vips/${key}`));
    if (!snap.exists()) return;

    const vip = snap.val();

    await push(ref(db, "history"), {
        ...vip,
        removedAt: Date.now(),
        reason: "ถูกลบโดยแอดมิน"
    });

    await remove(ref(db, `vips/${key}`));
}

// ====== RENDER ======
function formatCountdown(ms) {
    if (ms <= 0) return "หมดอายุแล้ว";
    const d = Math.floor(ms / 86400000);
    const h = Math.floor((ms % 86400000) / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    return `${d} วัน ${h} ชั่วโมง ${m} นาที`;
}

function renderVips() {
    vipListEl.innerHTML = "";

    const now = Date.now();
    const keys = Object.keys(vipsData);

    vipCountEl.textContent = keys.length;

    keys.forEach(key => {
        const vip = vipsData[key];
        const expiry = vip.expiryTimestamp;
        const remaining = expiry - now;

        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${vip.name}</h3>
            <p>${vip.note || "-"}</p>
            <div>${formatCountdown(remaining)}</div>

            ${isAdmin ? `
                <button onclick="window.deleteVip('${key}')">ลบ</button>
            ` : ""}
        `;

        vipListEl.appendChild(div);
    });
}

// ====== FIREBASE LISTENER ======
onValue(ref(db, "vips"), (snap) => {
    vipsData = snap.val() || {};
    renderVips();
});

// expose delete
window.deleteVip = deleteVip;
