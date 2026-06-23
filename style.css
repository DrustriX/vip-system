* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    background: #0a0a0a;
    color: #fff;
    font-family: 'Segoe UI', sans-serif;
    min-height: 100vh;
}

.container {
    max-width: 960px;
    margin: 0 auto;
    padding: 20px;
}

/* HEADER */
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid #2a2a2a;
    margin-bottom: 24px;
}

header h1 {
    font-size: 1.9rem;
    color: #D4AF37;
    letter-spacing: 3px;
}

.subtitle { color: #666; font-size: 0.8rem; margin-top: 2px; }

.admin-btn {
    background: transparent;
    border: 1px solid #D4AF37;
    color: #D4AF37;
    padding: 8px 18px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    transition: all 0.2s;
}
.admin-btn:hover { background: #D4AF37; color: #000; }

/* TABS */
.tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    border-bottom: 1px solid #222;
    padding-bottom: 12px;
}

.tab {
    background: transparent;
    border: 1px solid #333;
    color: #888;
    padding: 8px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
}
.tab.active {
    background: #D4AF37;
    color: #000;
    border-color: #D4AF37;
    font-weight: bold;
}

.hidden { display: none; }

/* STATS */
.stats {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 28px;
}

.card {
    background: #141414;
    border: 1px solid #2a2a2a;
    border-radius: 12px;
    padding: 18px 36px;
    min-width: 130px;
    text-align: center;
}
.card h3 { font-size: 2rem; color: #D4AF37; }
.card p { color: #666; font-size: 0.8rem; margin-top: 4px; }

/* VIP GRID */
.vip-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
}

/* VIP CARD */
.vip-card {
    background: #141414;
    border: 1px solid #2a2a2a;
    border-radius: 12px;
    padding: 18px;
    position: relative;
    transition: border-color 0.2s;
}
.vip-card.active-vip { border-color: #2d6a2d; }
.vip-card.expired-vip { border-color: #6a2d2d; }

.vip-card h3 {
    color: #fff;
    font-size: 1rem;
    margin-bottom: 10px;
    padding-right: 24px;
}

.status-badge {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: bold;
    padding: 3px 10px;
    border-radius: 20px;
    margin-bottom: 10px;
    letter-spacing: 0.5px;
}
.badge-active { background: #1a3d1a; color: #4caf50; border: 1px solid #2d6a2d; }
.badge-expired { background: #3d1a1a; color: #f44336; border: 1px solid #6a2d2d; }

.vip-card p {
    color: #888;
    font-size: 0.82rem;
    margin: 4px 0;
}

.countdown {
    font-size: 0.9rem;
    font-weight: bold;
    margin-top: 10px;
    padding: 8px 10px;
    background: #1a1a1a;
    border-radius: 6px;
    text-align: center;
    letter-spacing: 0.3px;
}
.countdown.green { color: #4caf50; }
.countdown.red { color: #f44336; }

/* ACTION BUTTONS */
.card-actions {
    display: flex;
    gap: 8px;
    margin-top: 12px;
}

.btn-add-days {
    flex: 1;
    background: #1a3a1a;
    color: #4caf50;
    border: 1px solid #2d6a2d;
    border-radius: 6px;
    padding: 7px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;
}
.btn-add-days:hover { background: #2d6a2d; color: #fff; }

.btn-delete {
    background: #3a1a1a;
    color: #f44336;
    border: 1px solid #6a2d2d;
    border-radius: 6px;
    padding: 7px 12px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;
}
.btn-delete:hover { background: #6a2d2d; color: #fff; }

/* MODAL */
.modal {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.8);
    z-index: 999;
    justify-content: center;
    align-items: center;
}
.modal.active { display: flex; }

.modal-box {
    background: #141414;
    border: 1px solid #D4AF37;
    border-radius: 14px;
    padding: 28px;
    width: 340px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 90vh;
    overflow-y: auto;
}

.modal-box h2 { color: #D4AF37; font-size: 1.1rem; }
.modal-box h3 { font-size: 0.95rem; }

.modal-box input {
    background: #0f0f0f;
    border: 1px solid #333;
    border-radius: 6px;
    color: #fff;
    padding: 10px;
    font-size: 0.9rem;
    outline: none;
    width: 100%;
}
.modal-box input:focus { border-color: #D4AF37; }

.modal-box button {
    padding: 10px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    transition: opacity 0.2s;
}
#loginBtn { background: #D4AF37; color: #000; font-weight: bold; }
#closeBtn { background: #2a2a2a; color: #fff; }
#addVipBtn { background: #1f5c1f; color: #fff; }
.modal-box button:hover { opacity: 0.85; }

#msg {
    font-size: 0.82rem;
    text-align: center;
    min-height: 16px;
    color: #aaa;
}

/* ADD DAYS POPUP */
.add-days-popup {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    z-index: 1000;
    justify-content: center;
    align-items: center;
}
.add-days-popup.active { display: flex; }
.popup-box {
    background: #141414;
    border: 1px solid #2d6a2d;
    border-radius: 12px;
    padding: 24px;
    width: 280px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.popup-box h3 { color: #4caf50; font-size: 1rem; }
.popup-box input {
    background: #0f0f0f;
    border: 1px solid #333;
    border-radius: 6px;
    color: #fff;
    padding: 10px;
    font-size: 0.9rem;
    outline: none;
    width: 100%;
}
.popup-box input:focus { border-color: #4caf50; }
.popup-confirm {
    background: #1f5c1f;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 10px;
    cursor: pointer;
    font-size: 0.9rem;
}
.popup-cancel {
    background: #2a2a2a;
    color: #aaa;
    border: none;
    border-radius: 6px;
    padding: 10px;
    cursor: pointer;
    font-size: 0.9rem;
}
