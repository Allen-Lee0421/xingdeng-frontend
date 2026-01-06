/* 請確保您的 script.js 中這段名稱與 HTML 一致 */
async function startFraudScan() { // 改為 startFraudScan 以對應 HTML
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
        status.innerText = "❌ 防詐掃描失敗，請確認 ngrok 隧道。";
    }
}
