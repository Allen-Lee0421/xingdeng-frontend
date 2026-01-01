// --- 8 國語言辭典 ---
const translations = {
    "zh-TW": { title: "🛡️ 星燈防詐中心", sub: "V4.0 全球化防護與偵測系統", scan: "🔍 網址詐騙掃描", report: "📢 詐騙網址通報", btnS: "開始掃描", btnR: "提交通報" },
    "en": { title: "🛡️ XingDeng Security", sub: "V4.0 Global Protection System", scan: "🔍 URL Fraud Scan", report: "📢 Report Scam", btnS: "Start Scan", btnR: "Submit" }
    // 其他語系可依此擴充...
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

// --- 背景自動切換邏輯 (支援 8 張圖) ---
const bgImages = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg', 'bg6.jpg', 'bg7.jpg', 'bg8.jpg'];

function rotateBackground() {
    const now = new Date();
    // 每 30 分鐘一個區間 (24小時 * 2 = 48 個區間)
    const segments = (now.getHours() * 2) + (now.getMinutes() >= 30 ? 1 : 0);
    const currentBg = bgImages[segments % bgImages.length];

    // 設定背景並增加半透明遮罩確保文字清晰
    document.body.style.backgroundImage = `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('${currentBg}')`;
    console.log(`[星燈系統] 目前使用背景: ${currentBg}`);
}

// 初始化與定時監控
setInterval(rotateBackground, 60000); 
rotateBackground();

// --- 掃描與驗證邏輯 ---
function isValidUrl(s) { try { new URL(s); return true; } catch(e) { return false; } }

function mockApi() {
    return new Promise((res) => {
        setTimeout(() => {
            const isScam = Math.random() < 0.3;
            res({
                status: isScam ? 'Danger' : 'Safe',
                detail: isScam ? '高風險：網址與詐騙特徵高度吻合。' : '低風險：未檢測到明顯詐騙特徵。',
                risk_score: Math.floor(Math.random() * 100)
            });
        }, 1500);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('scanForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const url = document.getElementById('url_to_scan').value;
        const resBox = document.getElementById('scan_result');
        if (!isValidUrl(url)) { resBox.innerText = "❌ 請輸入完整網址 (含 http/https)"; return; }
        
        resBox.innerHTML = '<i class="fas fa-spinner fa-spin"></i> AI 深度掃描中...';
        const data = await mockApi();
        resBox.style.backgroundColor = data.status === 'Danger' ? '#f44336' : '#4CAF50';
        resBox.innerHTML = `**${data.status}** (風險值: ${data.risk_score})<br>${data.detail}`;
    });
});
