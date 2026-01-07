// ===== 全域設定 =====
let currentURL = null
const configPath = "/config.js"   // 從後端生成的 config.js 讀取 ngrok URL
const checkInterval = 10000       // 每 10 秒檢查一次 ngrok URL

// ===== 狀態更新模組 =====
function updateStatus(msg) {
  const status = document.getElementById("statusOutput")
  if (status) {
    const timestamp = new Date().toLocaleTimeString()
    status.innerText = `[${timestamp}] ${msg}`
  }
}

// ===== API 驗證模組 =====
function verifyAPI() {
  if (!window.API_BASE_URL) {
    updateStatus("❌ 尚未設定 API_BASE_URL")
    return
  }
  fetch(`${window.API_BASE_URL}/api/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ test: "ping" })
  })
  .then(res => res.json())
  .then(data => {
    updateStatus(`✅ API 正常：${JSON.stringify(data)}`)
  })
  .catch(err => {
    updateStatus(`❌ API 錯誤：${err.message}`)
  })
}

// ===== 推演模組 =====
function startAnalysis() {
  updateStatus("🔍 正在推演中...")
  fetch(`${window.API_BASE_URL}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "start" })
  })
  .then(res => res.json())
  .then(data => {
    updateStatus(`✅ 推演完成：${data.result || "已取得結果"}`)
  })
  .catch(err => {
    updateStatus(`❌ 推演失敗：${err.message}`)
  })
}

// ===== 防詐掃描模組 =====
function startFraudScan() {
  updateStatus("🛡️ 正在掃描詐騙指紋...")
  fetch(`${window.API_BASE_URL}/api/fraudscan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scan: true })
  })
  .then(res => res.json())
  .then(data => {
    updateStatus(`✅ 掃描完成：${data.result || "無異常"}`)
  })
  .catch(err => {
    updateStatus(`❌ 掃描失敗：${err.message}`)
  })
}

// ===== 付款模組（模擬） =====
function triggerPayment() {
  updateStatus("💳 正在處理付款...")
  setTimeout(() => {
    updateStatus("✅ 已解鎖天機報告，請查看分析結果。")
  }, 2000)
}

// ===== ngrok URL 自動同步模組 =====
async function checkNgrokURL() {
  try {
    const res = await fetch(configPath)
    const text = await res.text()
    const match = text.match(/https:\/\/[a-zA-Z0-9\-]+\.ngrok[^'"]+/)
    if (match && match[0] !== currentURL) {
      currentURL = match[0]
      window.API_BASE_URL = currentURL
      updateStatus(`🔁 ngrok URL 已更新：${currentURL}`)
      verifyAPI()
    }
  } catch (err) {
    updateStatus(`❌ 無法讀取 config.js：${err.message}`)
  }
}

// ===== 啟動定時檢查 =====
setInterval(checkNgrokURL, checkInterval)

// ===== 初始化 =====
document.addEventListener("DOMContentLoaded", () => {
  updateStatus("系統待命中...（自動檢測 API 連線）")
  checkNgrokURL()
})
