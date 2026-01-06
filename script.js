// 鎖定目前 Online 隧道網址
const API_BASE_URL = "https://mariyah-unexplanatory-regan.ngrok-free.dev"; 

async function startAnalysis() {
    const status = document.getElementById('statusOutput');
    status.style.color = "#d4af37";
    status.innerText = "正在連通本機 Docker 引擎進行因果推演...";
    try {
        const response = await fetch(`${API_BASE_URL}/analyze`, { method: 'POST' });
        if (!response.ok) throw new Error("API 回應異常");
        const data = await response.json();
        status.style.color = "#0f0";
        status.innerText = `推演完成：${data.result}`;
    } catch {
        status.style.color = "red";
        status.innerText = "❌ 連線異常，請確認 Docker 容器是否為 Running。"; //
    }
}

async function startScan() {
    const status = document.getElementById('statusOutput');
    status.style.color = "#d4af37";
    status.innerText = "正在比對全球詐騙指紋資料庫...";
    try {
        const response = await fetch(`${API_BASE_URL}/scan`, { method: 'POST' });
        const data = await response.json();
        status.style.color = "#0f0";
        status.innerText = `掃描完成：${data.result}`;
    } catch {
        status.style.color = "red";
        status.innerText = "❌ 防詐掃描失敗，請檢查 API 隧道。";
    }
}
