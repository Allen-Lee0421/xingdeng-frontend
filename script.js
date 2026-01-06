// 核心對齊目前的 Online 隧道
const API_BASE_URL = "https://mariyah-unexplanatory-regan.ngrok-free.dev";

async function startAnalysis() {
    const status = document.getElementById('statusOutput');
    status.innerText = "正在進行因果推演...";
    try {
        const res = await fetch(`${API_BASE_URL}/analyze`, { method: 'POST' });
        const data = await res.json();
        status.innerText = `推演完成：${data.result}`;
    } catch (e) {
        status.innerText = "❌ 推演失敗，請確認後端是否 Online";
    }
}

// 函式名稱必須與 HTML 的 startFraudScan 一致
async function startFraudScan() {
    const status = document.getElementById('statusOutput');
    status.innerText = "正在比對防詐資料庫...";
    try {
        const res = await fetch(`${API_BASE_URL}/scan`, { method: 'POST' });
        const data = await res.json();
        status.innerText = `掃描完成：${data.result}`;
    } catch (e) {
        status.innerText = "❌ 掃描失敗";
    }
}
