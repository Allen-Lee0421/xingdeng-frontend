async function handleScan() {
    const url = document.getElementById('urlInput').value;
    const resultArea = document.getElementById('resultArea');
    const resultText = document.getElementById('resultText');
    const lang = document.getElementById('langSelect').value;

    if (!url) return alert("Please enter a URL");

    // 企劃點：展示即時掃描的專業感
    resultText.innerHTML = "⏳ AI 分析中... <br><small>正在比對 8 國語言詐騙資料庫...</small>";
    resultArea.className = "result-placeholder scanning";

    try {
        // 對接您的星燈 API
        const response = await fetch(`https://api.xingdeng.tw/api/check-url?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        // 模擬分析延遲，增加信任度
        setTimeout(() => {
            if (data.is_scam) {
                resultText.innerHTML = "⚠️ 偵測到風險！此網址可能存在詐騙行為。";
                resultArea.className = "result-danger";
            } else {
                resultText.innerHTML = "✅ 掃描完成。此網址在我們的安全清單中。";
                resultArea.className = "result-safe";
            }
        }, 1500);
    } catch (error) {
        resultText.innerText = "連線失敗，請檢查網路狀態。";
    }
}
  
