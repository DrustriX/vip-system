document.body.innerHTML = "<h1 style='color:red'>JS IS WORKING</h1>";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

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

const vipList = document.getElementById("vip-list");
const vipCount = document.getElementById("vip-count");

console.log("SCRIPT LOADED");

// 🔥 กันหน้าขาว + loading state
vipList.innerHTML = `
    <div style="color:#D4AF37; text-align:center; padding:20px;">
        ⏳ กำลังโหลด VIP...
    </div>
`;

onValue(ref(db, "vips"), (snapshot) => {

    const data = snapshot.val();

    vipList.innerHTML = "";

    // ❌ ไม่มีข้อมูล
    if (!data) {
        vipList.innerHTML = `
            <div style="color:#999; text-align:center; padding:20px;">
                ไม่มี VIP ตอนนี้
            </div>
        `;
        vipCount.textContent = "0";
        return;
    }

    const keys = Object.keys(data);
    vipCount.textContent = keys.length;

    keys.forEach((key) => {
        const vip = data[key];

        const div = document.createElement("div");
        div.className = "vip-card";

        div.innerHTML = `
            <h3>${vip.name || key}</h3>
            <p>👑 สถานะ: VIP</p>
            <p>📅 วัน VIP: ${vip.days || 0}</p>
            <p>📝 หมายเหตุ: ${vip.note || "-"}</p>
        `;

        vipList.appendChild(div);
    });

});
