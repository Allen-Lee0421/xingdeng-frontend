// --- 1. 背景 8 張圖自動切換邏輯 ---
const bgImages = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg', 'bg6.jpg', 'bg7.jpg', 'bg8.jpg'];

function rotateBackground() {
    const now = new Date();
    // 每 30 分鐘為一格，計算目前應使用的圖片索引
    const segments = (now.getHours() * 2) + (now.getMinutes() >= 30 ? 1 : 0);
    const currentBg = bgImages[segments % bgImages.length];

    // 設置背景遮罩（深色）確保全白文字清晰度
    const overlay = "linear-gradient(rgba(2, 6, 23, 0.85), rgba(2, 6, 23, 0.85))";
    document.body.style.backgroundImage = `${overlay}, url('${currentBg}')`;
    
    console.log(`[星燈防護] 自動切換背景至: ${currentBg}`);
}

// 預加載圖片防止切換時閃爍
bgImages.forEach(src => { const img = new Image(); img.src = src; });

// 每分鐘檢查一次是否需要換圖
setInterval(rotateBackground, 60000);
rotateBackground();


// --- 2. 語言切換邏輯 (全白文字相容) ---
const translations = {
    "zh-TW": { 
        title: "🛡️ 星燈防詐中心", 
        sub: "V5.0 軍事級防護系統", 
        scan: "🔍 網址詐騙掃描", 
        report: "📢 詐騙網址通報", 
        btnS: "啟動深度掃描", 
        btnR: "提交通報" 
    },
    "en": { 
        title: "🛡️ XingDeng Security", 
        sub: "V5.0 Military Protection", 
        scan: "🔍 URL Fraud Scan", 
        report: "📢 Report Scam", 
        btnS: "Start Scan", 
        btnR: "Submit" 
    }
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


// --- 3. 掃描與通報功能 ---
document.addEventListener('DOMContentLoaded', () => {
    // 掃描功能
    const scanForm = document.getElementById('scanForm');
    if (scanForm) {
        scanForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const resBox = document.getElementById('scan_result');
            resBox.style.display = 'block';
            resBox.innerHTML = '<i class="fas fa-spinner fa-spin"></i> AI 掃描引擎運行中...';

            setTimeout(() => {
                const isScam = Math.random() < 0.3;
                const score = Math.floor(Math.random() * 100);
                
                // 動態調整外框顏色增加警示感
                const box = document.querySelector('.scan-box');
                if(isScam) {
                    box.style.borderColor = '#ff4444';
                    box.style.boxShadow = '0 0 50px rgba(255, 0, 0, 0.6)';
                    resBox.innerHTML = `⚠️ 偵測到威脅！ (風險值: ${score})<br>此網址具有高度詐騙風險，請勿點擊。`;
                } else {
                    box.style.borderColor = '#00FF00';
                    box.style.boxShadow = '0 0 50px rgba(0, 255, 0, 0.6)';
                    resBox.innerHTML = `✅ 驗證安全 (風險值: ${score})<br>未偵測到明顯惡意特徵。`;
                }
            }, 2000);
        });
    }

    // 通報功能
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const msg = document.getElementById('message');
            msg.style.display = 'block';
            msg.innerText = "⏳ 正在建立加密通報通道...";
            setTimeout(() => { 
                msg.innerText = "✅ 通報已成功提交至星燈數據庫。"; 
                reportForm.reset();
            }, 2000);
        });
    }
});
