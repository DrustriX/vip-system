import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, onValue, push, set } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAg5S0_3O1EicYWqY8jVulF_bF_0kspmDg",
    authDomain: "vip-system-d8317.firebaseapp.com",
    databaseURL: "https://vip-system-d8317-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vip-system-d8317",
    storageBucket: "vip-system-d8317.firebasestorage.app",
    messagingSenderId: "584414132253",
    appId: "1:584414132253:web:5a4ca54246fb66d0ed6ef4"
};

const ADMIN_PASSWORD = "1234"; // ← เปลี่ยนรหัสตรงนี้

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Elements
const modal       = document.getElementById("loginModal");
const adminPassEl = document.getElementById("adminPass");
const vipNameEl   = document.getElementById("vipName");
const vipDaysEl   = document.getElementById("vipDays");
const vipNoteEl   = document.getElementById("vipNote");
const vipListEl   = document.getElementById("vip-list");
const vipCountEl  = document.getElementById("vip-count");

// เพิ่ม div แสดง error/success ใน modal
const msgEl = document.createElement("p");
msgEl.id = "msg";
document.querySelector(".modal-box").appendChild(msgEl);

// เปิด Modal
document.querySelector(".admin-btn").addEventListener("click", () => {
    modal.classList.add("active");
});

// ปิด Modal
document.getElementById("closeBtn").addEventListener("click", () => {
    modal.classList.remove("active");
    msgEl.textContent = "";
});

// Login
document.getElementById("loginBtn").addEventListener("click", () => {
    if (adminPassEl.value === ADMIN_PASSWORD) {
        msgEl.style.color = "#4caf50";
        msgEl.textContent = "✅ เข้าสู่ระบบสำเร็จ";
    } else {
        msgEl.style.color = "#f44336";
        msgEl.textContent = "❌ รหัสผิด";
    }
});

// เพิ่ม VIP
document.getElementById("addVipBtn").addEventListener("click", () => {
    if (adminPassEl.value !== ADMIN_PASSWORD) {
        msgEl.style.color = "#f44336";
        msgEl.textContent = "❌ ต้องล็อกอินก่อน";
        return;
    }

    const name = vipNameEl.value.trim();
    const days = parseInt(vipDaysEl.value) || 0;
    const note = vipNoteEl.value.trim();

    if (!name) {
        msgEl.style.color = "#f44336";
        msgEl.textContent = "❌ ใส่ชื่อก่อน";
        return;
    }

    const newRef = push(ref(db, "vips"));
    set(newRef, { name, days, note }).then(() => {
        msgEl.style.color = "#4caf50";
        msgEl.textContent = "✅ เพิ่ม VIP สำเร็จ";
        vipNameEl.value = "";
        vipDaysEl.value = "";
        vipNoteEl.value = "";
    }).catch((err) => {
        msgEl.style.color = "#f44336";
        msgEl.textContent = "❌ Error: " + err.message;
    });
});

// อ่านรายชื่อ VIP จาก Firebase
onValue(ref(db, "vips"), (snapshot) => {
    const data = snapshot.val();
    vipListEl.innerHTML = "";

    if (!data) {
        vipListEl.innerHTML = "<p style='color:#aaa;'>ยังไม่มีสมาชิก VIP</p>";
        vipCountEl.textContent = "0";
        return;
    }

    const keys = Object.keys(data);
    vipCountEl.textContent = keys.length;

    keys.forEach((key) => {
        const vip = data[key];
        const div = document.createElement("div");
        div.className = "vip-card";
        div.innerHTML = `
            <h3>${vip.name || key}</h3>
            <p>👑 สถานะ: VIP</p>
            <p>📅 วัน VIP: ${vip.days || 0} วัน</p>
            <p>📝 หมายเหตุ: ${vip.note || "-"}</p>
        `;
        vipListEl.appendChild(div);
    });
});
