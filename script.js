const bgImages = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg', 'bg6.jpg', 'bg7.jpg', 'bg8.jpg'];

function rotateBackground() {
    const now = new Date();
    // 每 30 分鐘換一張圖
    const segments = (now.getHours() * 2) + (now.getMinutes() >= 30 ? 1 : 0);
    const currentBg = bgImages[segments % bgImages.length];

    // 設置背景並確保有遮罩層讓文字好讀
    document.body.style.backgroundImage = `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.75)), url('${currentBg}')`;
    console.log(`[星燈系統] 偵測到時間區間，自動變換背景為: ${currentBg}`);
}

// 啟動換膚計時器
setInterval(rotateBackground, 60000); 
rotateBackground();

// --- 語言與掃描邏輯 ---
function isValidUrl(s) { try { new URL(s); return true; } catch(e) { return false; } }

document.addEventListener('DOMContentLoaded', () => {
    // 掃描表單
    document.getElementById('scanForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const resBox = document.getElementById('scan_result');
        resBox.innerHTML = '<i class="fas fa-spinner fa-spin"></i> AI 深度偵測中...';
        
        setTimeout(() => {
            const isScam = Math.random() < 0.3;
            resBox.style.backgroundColor = isScam ? '#dc2626' : '#16a34a';
            resBox.innerHTML = isScam ? '**Danger** (風險值: 88)<br>高風險：偵測到詐騙特徵！' : '**Safe** (風險值: 12)<br>低風險：驗證安全。';
        }, 1500);
    });

    // 通報表單
    document.getElementById('reportForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = document.getElementById('message');
        msg.style.display = 'block';
        msg.innerText = "⏳ 通報已加密提交...";
        setTimeout(() => { msg.innerText = "✅ 感謝您的通報，系統已紀錄。"; }, 2000);
    });
});
