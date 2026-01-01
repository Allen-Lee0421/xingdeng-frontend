const bgImages = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg', 'bg6.jpg', 'bg7.jpg', 'bg8.jpg'];

function rotateBackground() {
    const now = new Date();
    const segments = (now.getHours() * 2) + (now.getMinutes() >= 30 ? 1 : 0);
    const currentBg = bgImages[segments % bgImages.length];
    const overlay = "linear-gradient(rgba(2, 6, 23, 0.85), rgba(2, 6, 23, 0.85))";
    document.body.style.backgroundImage = `${overlay}, url('${currentBg}')`;
}

// 預載圖片
bgImages.forEach(src => { const img = new Image(); img.src = src; });
setInterval(rotateBackground, 60000);
rotateBackground();

// 語言字典
const translations = {
    "zh-TW": { title: "🛡️ 星燈防詐中心", sub: "V5.0 軍事級全球防護系統", scan: "🔍 網址詐騙掃描", report: "📢 詐騙網址通報", btnS: "啟動深度掃描", btnR: "提交通報" },
    "en": { title: "🛡️ XingDeng Security", sub: "V5.0 Military Protection", scan: "🔍 URL Fraud Scan", report: "📢 Report Scam", btnS: "Start Scan", btnR: "Submit" }
};

function changeLanguage() {
    const lang = document.getElementById('langSelect').value;
    const t = translations[lang] || translations["en"];
    document.getElementById('mainTitle').innerText = t.title;
    document.getElementById('subTitle').innerText = t.sub;
    document.getElementById('scanTitle').innerText = t.scan;
    document.getElementById('reportTitle').innerText = t.report;
    document.getElementById('btnScan').innerText = t.btnS;
    document.getElementById('btnReport').innerText = t.btnR;
}

document.addEventListener('DOMContentLoaded', () => {
    // 掃描模擬
    document.getElementById('scanForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const res = document.getElementById('scan_result');
        const box = document.querySelector('.scan-box');
        res.innerHTML = "⚡ 正在連線全球數據庫...";
        setTimeout(() => {
            const isScam = Math.random() < 0.3;
            box.style.borderColor = isScam ? '#ff4444' : '#00FF00';
            box.style.boxShadow = isScam ? '0 0 50px rgba(255,0,0,0.6)' : '0 0 50px rgba(0,255,0,0.6)';
            res.innerHTML = isScam ? "❌ 偵測到詐騙！請立即關閉分頁。" : "✅ 掃描完成，此網址暫無風險。";
        }, 1500);
    });
});
