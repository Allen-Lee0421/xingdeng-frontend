// ===== 全域設定 =====
let currentURL = null
const configPath = "/config.js"
const checkInterval = 10000

// 背景圖對應表
const bgMap = {
  idle: "bg3.jpg",
  success: "bg4.jpg",
  error: "bg5.jpg",
  scan: "bg6.jpg",
  payment: "bg7.jpg"
}

// ===== 背景切換模組 =====
function setBackground(mode) {
  const layer = document.getElementById("backgroundLayer")
  if (layer) {
    layer.style.backgroundImage = `url('${bgMap[mode] || bgMap.idle}')`
  }
}

// ===== 狀態更新模組 =====
function updateStatus(msg, mode = "idle") {
  const status = document.getElementById("statusOutput")
  if (status) {
    const timestamp = new Date().toLocaleTimeString()
    status.innerText = `[${timestamp}] ${msg}`
  }
  setBackground(mode)

  // 自動淡出回復待命狀態
  if (mode !== "idle") {
    setTimeout(() => {
      updateStatus("系統待命中...（自動檢測 API 連線）", "idle")
    }, 5000)
  }
}

// ===== API 驗證模組 =====
function verifyAPI() {
  if (!window.API_BASE_URL) {
    updateStatus("❌ 尚未設定 API_BASE_URL", "error")
    return
  }
  fetch(`${window.API_BASE_URL}/api/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ test: "ping" })
  })
  .then(res => res.json())
  .then(data => {
    updateStatus(`✅ API 正常：${JSON.stringify(data)}`, "success")
  })
  .catch(err => {
    updateStatus(`❌ API 錯誤：${err.message}`, "error")
  })
}

// ===== 推演模組 =====
function startAnalysis() {
  updateStatus("🔍 正在推演中...", "scan")
  fetch(`${window.API_BASE_URL}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "start" })
  })
  .then(res => res.json())
  .then(data => {
    updateStatus(`✅ 推演完成：${data.result || "已取得結果"}`, "success")
  })
  .catch(err => {
    updateStatus(`❌ 推演失敗：${err.message}`, "error")
  })
}

// ===== 防詐掃描模組 =====
function startFraudScan() {
  updateStatus("🛡️ 正在掃描詐騙指紋...", "scan")
  fetch(`${window.API_BASE_URL}/api/fraudscan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scan: true })
  })
  .then(res => res.json())
  .then(data => {
    updateStatus(`✅ 掃描完成：${data.result || "無異常"}`, "success")
  })
  .catch(err => {
    updateStatus(`❌ 掃描失敗：${err.message}`, "error")
  })
}

// ===== 付款模組 =====
function triggerPayment() {
  updateStatus("💳 正在處理付款...", "payment")
  setTimeout(() => {
    updateStatus("✅ 已解鎖天機報告，請查看分析結果。", "success")
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
      updateStatus(`🔁 ngrok URL 已更新：${currentURL}`, "success")
      verifyAPI()
    }
  } catch (err) {
    updateStatus(`❌ 無法讀取 config.js：${err.message}`, "error")
  }
}

// ===== 啟動定時檢查 =====
setInterval(checkNgrokURL, checkInterval)

// ===== 初始化 =====
document.addEventListener("DOMContentLoaded", () => {
  updateStatus("系統待命中...（自動檢測 API 連線）", "idle")
  checkNgrokURL()
})
