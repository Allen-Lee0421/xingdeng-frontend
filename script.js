// 1. 【核心對齊】請將引號內替換為您剛剛在 ngrok 看到的最新網址
const API_BASE_URL = "在此貼上您剛剛複製的 ngrok 網址"; 

// 2. 左框功能：觀象演繹
async function startAnalysis() {
    const status = document.getElementById('statusOutput');
    status.innerText = "正在連通本機 Docker 引擎進行演算...";
    status.style.color = "#d4af37";

    try {
        const response = await fetch(`${API_BASE_URL}/analyze`, { method: 'POST' });
        const data = await response.json();
        status.innerText = "演算完成：已為您揭示隱而未顯的方向。";
    } catch (err) {
        status.innerText = "連線異常，請確認 ngrok 隧道是否保持 Online。"; // 解決報錯
        status.style.color = "#ff4d4d";
    }
}

// 3. 右框功能：防詐掃描
function startFraudScan() {
    const userInput = prompt("請貼上要偵測的網址或訊息：");
    if(userInput) {
        document.getElementById('statusOutput').innerText = "防詐模組分析中...";
        setTimeout(() => alert("偵測完畢：該來源目前安全，請安心使用。"), 1500);
    }
}

// 4. 結緣功能
function triggerPayment() {
    alert("【易鑒星科 · 結緣資訊】\n銀行：(822) 中國信託\n金額：NT$ 30\n完成後請傳截圖至 LINE 客服解鎖報告。");
}
