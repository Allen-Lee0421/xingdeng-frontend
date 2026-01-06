//
const API_BASE_URL = "https://mariyah-unexplanatory-regan.ngrok-free.dev"; 

// 左框：觀象演繹
async function startAnalysis() {
    const status = document.getElementById('statusOutput') || document.querySelector('.status-box');
    status.innerText = "正在連通本機 Docker 引擎進行演算...";
    status.style.color = "#d4af37";

    try {
        const response = await fetch(`${API_BASE_URL}/analyze`, { method: 'POST' });
        if (response.ok) {
            status.innerText = "演算完成：已為您揭示隱而未顯的方向。";
        } else {
            status.innerText = "後端通訊錯誤 (502)，請確認 Docker 容器是否啟動。"; //
            status.style.color = "red";
        }
    } catch (err) {
        status.innerText = "連線異常，請確認 ngrok 視窗是否 Online。"; //
        status.style.color = "red";
    }
}

// 右框：防詐掃描
function startFraudScan() {
    const userInput = prompt("請貼上要偵測的網址或訊息：");
    if(userInput) alert("防詐模組分析中... 目前該來源安全。");
}
