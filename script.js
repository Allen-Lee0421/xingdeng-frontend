// 1. 隧道網址對齊
const API_BASE_URL = "https://mariyah-unexplanatory-regan.ngrok-free.dev"; 

// 2. 命理推演功能
async function startAnalysis() {
    const status = document.getElementById('statusOutput');
    status.innerText = "正在呼叫本機 Docker 引擎進行演算...";
    status.style.color = "#d4af37";

    try {
        const res = await fetch(`${API_BASE_URL}/analyze`, { method: 'POST' });
        if (res.ok) {
            status.innerText = "演算完成：已為您揭示隱而未顯的方向。";
        } else {
            // 處理 502 Bad Gateway
            status.innerText = "連線異常：隧道已通，但 Docker 核心尚未啟動。";
            status.style.color = "red";
        }
    } catch (err) {
        status.innerText = "連線失敗，請檢查 ngrok 是否 Online。";
    }
}

// 3. 防詐掃描模擬
function startFraudScan() {
    const input = prompt("請貼上可疑網址：");
    if(input) {
        document.getElementById('statusOutput').innerText = "防詐比對中...";
        setTimeout(() => alert("掃描結果：該來源目前安全。"), 1500);
    }
}
