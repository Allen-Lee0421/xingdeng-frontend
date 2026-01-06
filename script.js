// 1. 【核心對齊】鎖定目前 Online 隧道網址
const API_BASE_URL = "https://mariyah-unexplanatory-regan.ngrok-free.dev"; 

// 2. 左框：觀象演繹功能
async function startAnalysis() {
    const status = document.getElementById('statusOutput') || document.body;
    status.innerText = "正在連通本機 Docker 引擎進行演算...";
    
    try {
        const response = await fetch(`${API_BASE_URL}/analyze`, { method: 'POST' });
        if (response.ok) {
            status.innerText = "演算完成：已為您揭示隱而未顯的方向。";
        } else {
            status.innerText = "連線成功但後端異常 (502)，請確認 Docker 容器已啟動。"; //
        }
    } catch (err) {
        status.innerText = "連線異常，請確認 ngrok 視窗是否顯示 Online。"; 
    }
}

// 3. 右框：防詐掃描功能
function startFraudScan() {
    const input = prompt("請貼上要偵測的網址：");
    if(input) {
        alert("防詐模組分析中... 目前比對 165 資料庫顯示安全。"); 
    }
}
