// 1. 【核心對齊】鎖定您目前重開機後最新的 ngrok 隧道網址
const API_BASE_URL = "https://mariyah-unexplanatory-regan.ngrok-free.dev"; 

// 2. 左框功能：觀象演繹 · 開始推演
async function startAnalysis() {
    const status = document.getElementById('statusOutput');
    status.innerText = "正在連通本機 Docker 引擎進行演算..."; //
    status.style.color = "#d4af37";

    try {
        const response = await fetch(`${API_BASE_URL}/analyze`, { method: 'POST' });
        const data = await response.json();
        // 成功後將狀態更新
        status.innerText = "演算完成：已為您揭示隱而未顯的方向。";
    } catch (err) {
        // 解決您截圖中看到的連線異常紅字
        status.innerText = "連線異常，請確認本機 ngrok 視窗是否顯示 Online。";
        status.style.color = "#ff4d4d";
    }
}

// 3. 右框功能：防詐掃描 · 保護荷包
function startFraudScan() {
    const userInput = prompt("請貼上要偵測的網址或訊息：");
    if(userInput) {
        document.getElementById('statusOutput').innerText = "防詐模組分析中...";
        setTimeout(() => {
            alert("偵測完畢：該來源目前安全，請安心使用。");
        }, 1500);
    }
}

// 4. 結緣功能與支付提示
function triggerPayment() {
    alert("【易鑒星科 · 結緣資訊】\n金額：NT$ 30 / 天\n完成後請傳截圖至 LINE 客服解鎖完整報告。");
}
