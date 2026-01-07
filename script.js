let currentURL = null
const checkInterval = 10000

const bgMap = {
  idle: "bg3.jpg",
  success: "bg4.jpg",
  error: "bg5.jpg",
  scan: "bg6.jpg",
  payment: "bg7.jpg"
}

function setBackground(mode) {
  const layer = document.getElementById("backgroundLayer")
  if (layer) {
    layer.style.backgroundImage = `url('${bgMap[mode] || bgMap.idle}')`
  }
}

function updateStatus(msg, mode = "idle") {
  const status = document.getElementById("statusOutput")
  if (status) {
    const timestamp = new Date().toLocaleTimeString()
    status.innerText = `[${timestamp}] ${msg}`
  }
  setBackground(mode)

  if (mode !== "idle") {
    setTimeout(() => {
      updateStatus("系統待命中...（自動檢測 API 連線）", "idle")
    }, 5000)
  }
}

function verifyAPI() {
  if (!window.API_BASE_URL) {
    updateStatus("❌ 尚未設定 API_BASE_URL", "error")
    return
  }
  fetch(`${window.API_BASE_URL}/verify`, {
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

function startAnalysis() {
  updateStatus("🔍 正在推演中...", "scan")
  fetch(`${window.API_BASE_URL}/analyze`, {
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

function startFraudScan() {
  updateStatus("🛡️ 正在掃描詐騙指紋...", "scan")
  fetch(`${window.API_BASE_URL}/scan`, {
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

function trigger
