import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
    getDatabase, ref, onValue, push, set, update, remove, get
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

// ====== CONFIG ======
const ADMIN_PASSWORD = "1234"; // เปลี่ยนรหัสตรงนี้

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
const db  = getDatabase(app);

// ====== STATE ======
let isAdmin = false;
let vipsData = {};
let countdownInterval = null;

// ====== ELEMENTS ======
const modal       = document.getElementById("loginModal");
const adminPassEl = document.getElementById("adminPass");
const msgEl       = document.getElementById("msg");
const vipListEl   = document.getElementById("vip-list");
const histListEl  = document.getElementById("history-list");
const vipCountEl  = document.getElementById("vip-count");
const expCountEl  = document.getElementById("expired-count");
const histCountEl = document.getElementById("history-count");

// ====== POPUP: เพิ่มวัน ======
const addDaysPopup = document.createElement("div");
addDaysPopup.className = "add-days-popup";
addDaysPopup.innerHTML = `
<div class="popup-box">
    <h3>➕ เพิ่มวัน VIP</h3>
    <p id="popup-name" style="color:#aaa;font-size:0.85rem;"></p>
    <input type="number" id="popup-days" placeholder="จำนวนวันที่ต้องการเพิ่ม" min="1">
    <button class="popup-confirm" id="popup-confirm">ยืนยัน</button>
    <button class="popup-cancel" id="popup-cancel">ยกเลิก</button>
</div>`;
document.body.appendChild(addDaysPopup);

let currentPopupKey = null;

document.getElementById("popup-cancel").addEventListener("click", () => {
    addDaysPopup.classList.remove("active");
    document.getElementById("popup-days").value = "";
    currentPopupKey = null;
});

document.getElementById("popup-confirm").addEventListener("click", async () => {
    const days = parseInt(document.getElementById("popup-days").value);
    if (!days || days < 1) return alert("ใส่จำนวนวันให้ถูกต้อง");

    const snap = await get(ref(db, `vips/${currentPopupKey}`));
    if (!snap.exists()) return;

    const vip = snap.val();
    const newExpiry = (vip.expiryTimestamp || Date.now()) + days * 86400000;
    const addedMs = days * 86400000;

    await update(ref(db, `vips/${currentPopupKey}`), {
        expiryTimestamp: newExpiry,
        days: Math.ceil((newExpiry - Date.now()) / 86400000)
    });

    // บันทึกประวัติการเพิ่มวัน
    await push(ref(db, `history_actions/${currentPopupKey}`), {
        action: "add_days",
        addedDays: days,
        timestamp: Date.now()
    });

    addDaysPopup.classList.remove("active");
    document.getElementById("popup-days").value = "";
    currentPopupKey = null;
});

// ====== TABS ======
document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(t => t.classList.add("hidden"));
        btn.classList.add("active");
        document.getElementById("tab-" + btn.dataset.tab).classList.remove("hidden");
    });
});

// ====== MODAL ======
document.querySelector(".admin-btn").addEventListener("click", () => {
    modal.classList.add("active");
});
document.getElementById("closeBtn").addEventListener("click", () => {
    modal.classList.remove("active");
    msgEl.textContent = "";
});

// ====== LOGIN ======
document.getElementById("loginBtn").addEventListener("click", () => {
    if (adminPassEl.value === ADMIN_PASSWORD) {
        isAdmin = true;
        msgEl.style.color = "#4caf50";
        msgEl.textContent = "✅ เข้าสู่ระบบแล้ว";
        renderVips();
    } else {
        msgEl.style.color = "#f44336";
        msgEl.textContent = "❌ รหัสผิด";
    }
});

// ====== เพิ่ม VIP ใหม่ ======
document.getElementById("addVipBtn").addEventListener("click", async () => {
    if (!isAdmin) { msgEl.style.color = "#f44336"; msgEl.textContent = "❌ ต้องล็อกอินก่อน"; return; }

    const name = document.getElementById("vipName").value.trim();
    const days = parseInt(document.getElementById("vipDays").value) || 0;
    const note = document.getElementById("vipNote").value.trim();

    if (!name) { msgEl.style.color = "#f44336"; msgEl.textContent = "❌ ใส่ชื่อก่อน"; return; }
    if (days < 1) { msgEl.style.color = "#f44336"; msgEl.textContent = "❌ จำนวนวันต้องมากกว่า 0"; return; }

    const expiryTimestamp = Date.now() + days * 86400000;
    const newRef = push(ref(db, "vips"));

    await set(newRef, {
        name, days, note,
        expiryTimestamp,
        addedAt: Date.now()
    });

    msgEl.style.color = "#4caf50";
    msgEl.textContent = "✅ เพิ่ม VIP สำเร็จ";
    document.getElementById("vipName").value = "";
    document.getElementById("vipDays").value = "";
    document.getElementById("vipNote").value = "";
});

// ====== ลบ VIP ======
async function deleteVip(key) {
    const snap = await get(ref(db, `vips/${key}`));
    if (!snap.exists()) return;
    const vip = snap.val();

    // ย้ายไปประวัติก่อน
    await push(ref(db, "history"), {
        ...vip,
        removedAt: Date.now(),
        reason: "ถูกลบโดยแอดมิน"
    });

    // แล้วลบออกจาก vips
    await remove(ref(db, `vips/${key}`));
}

// ====== RENDER VIP CARDS ======
function formatCountdown(ms) {
    if (ms <= 0) return "หมดอายุแล้ว";
    const totalSec = Math.floor(ms / 1000);
    const d = Math.floor(totalSec / 86400);
    const h = Math.floor((totalSec % 86400) / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    return `${d} วัน ${h} ชั่วโมง ${m} นาที`;
}

function renderVips() {
    if (countdownInterval) clearInterval(countdownInterval);
    vipListEl.innerHTML = "";

    const now = Date.now();
    const keys =
