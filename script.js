* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #0a0a0a;
    color: #fff;
    font-family: 'Segoe UI', sans-serif;
    min-height: 100vh;
}

.container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
}

/* HEADER */
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid #333;
    margin-bottom: 30px;
}

header h1 {
    font-size: 2rem;
    color: #D4AF37;
    letter-spacing: 3px;
}

.subtitle {
    color: #aaa;
    font-size: 0.85rem;
}

.admin-btn {
    background: transparent;
    border: 1px solid #D4AF37;
    color: #D4AF37;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
}

.admin-btn:hover {
    background: #D4AF37;
    color: #000;
}

/* HERO */
.hero {
    text-align: center;
    padding: 20px 0;
}

.hero h2 {
    font-size: 1.6rem;
    color: #D4AF37;
    margin-bottom: 10px;
}

.hero p {
    color: #aaa;
}

/* STATS */
.stats {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
}

.card {
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 12px;
    padding: 20px 40px;
    min-width: 150px;
}

.card h3 {
    font-size: 2rem;
    color: #D4AF37;
}

.card p {
    color: #aaa;
    margin-top: 5px;
}

/* VIP LIST */
#vip-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
    margin-top: 20px;
}

.vip-card {
    background: #1a1a1a;
    border: 1px solid #D4AF37;
    border-radius: 12px;
    padding: 20px;
    min-width: 200px;
    text-align: left;
}

.vip-card h3 {
    color: #D4AF37;
    margin-bottom: 8px;
    font-size: 1.1rem;
}

.vip-card p {
    color: #ccc;
    font-size: 0.9rem;
    margin: 4px 0;
}

/* MODAL */
.modal {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.75);
    z-index: 999;
    justify-content: center;
    align-items: center;
}

.modal.active {
    display: flex;
}

.modal-box {
    background: #1a1a1a;
    border: 1px solid #D4AF37;
    border-radius: 12px;
    padding: 30px;
    width: 340px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.modal-box h2 {
    color: #D4AF37;
}

.modal-box h3 {
    margin-top: 5px;
}

.modal-box input {
    background: #111;
    border: 1px solid #444;
    border-radius: 6px;
    color: #fff;
    padding: 10px;
    font-size: 0.95rem;
    outline: none;
}

.modal-box input:focus {
    border-color: #D4AF37;
}

.modal-box button {
    padding: 10px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 0.95rem;
    transition: opacity 0.2s;
}

#loginBtn {
    background: #D4AF37;
    color: #000;
    font-weight: bold;
}

#closeBtn {
    background: #333;
    color: #fff;
}

#addVipBtn {
    background: #2a6a2a;
    color: #fff;
}

.modal-box button:hover {
    opacity: 0.85;
}

#msg {
    font-size: 0.85rem;
    text-align: center;
    min-height: 18px;
}
