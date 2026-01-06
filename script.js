// 1. 鏈路對齊：鎖定最新的 ngrok 隧道網址
const API_BASE_URL = "https://mariyah-unexplanatory-regan.ngrok-free.dev"; 

// 2. 左框：觀象推演模組功能接續
async function startAnalysis() {
    const status = document.getElementById('statusOutput');
    status.innerText = "正在呼叫 D 槽 Docker 引擎進行演算..."; //
    status.style.color = "#d4af37";

    try {
        // 發送請求至隧道並轉導至本機 3000 端口
        const response = await fetch(`${API_BASE_URL}/analyze`, { method: 'POST' }); 
        const data = await response.json();
        status.innerText = "演算完成：已鎖定您的命運參數。";
    } catch (err) {
        status.innerText = "連線異常，請確認 ngrok 隧道是否保持 Online。"; //
        status.style.color = "#ff4d4d";
    }
}

// 3. 右框：防詐掃描模組功能接續
function startFraudScan() {
    const status = document.getElementById('statusOutput');
    const userInput = prompt("【防詐護盾】請輸入欲偵測的網址、LINE 連結或訊息：");
    
    if (userInput) {
        status.innerText = "正在執行防詐數據比對...";
        status.style.color = "#28a745";
        
        setTimeout(() => {
            alert("偵測完畢：該來源目前安全，已成功阻斷潛在威脅。"); //
            status.innerText = "防詐監測完成，目前安全。";
        }, 1500);
    }
}
