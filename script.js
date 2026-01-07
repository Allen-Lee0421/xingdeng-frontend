let currentURL = null
const configPath = "/config.js"  // 或 "/.env" 視你的架構而定
const checkInterval = 10000      // 每 10 秒檢查一次

async function checkNgrokURL() {
  try {
    const res = await fetch(configPath)
    const text = await res.text()
    const match = text.match(/https:\/\/[a-zA-Z0-9\-]+\.ngrok[^'"]+/)
    if (match && match[0] !== currentURL) {
      console.log("🔁 ngrok URL 已更新，重新載入前端模組")
      currentURL = match[0]
      window.location.reload()
    }
  } catch (err) {
    console.error("❌ 無法讀取 config.js:", err)
  }
}

setInterval(checkNgrokURL, checkInterval)
