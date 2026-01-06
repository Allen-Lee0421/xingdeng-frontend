// 1. API 隧道網址 (每次重啟 ngrok 要更新)
const API_BASE_URL = "https://xxxxx.ngrok-free.dev";

// 2. 推演函式
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
    status.innerText = "❌ 連線異常，請確認 ngrok 隧道是否保持 Online 並更新 API_BASE_URL。";
  }
}

// 3. 防詐掃描函式
async function startScan() {
  const status = document.getElementById('statusOutput');
  status.style.color = "#d4af37";
  status.innerText = "正在比對全球詐騙指紋資料庫...";
  try {
    const response = await fetch(`${API_BASE_URL}/scan`, { method: 'POST' });
    if (!response.ok) throw new Error("API 回應異常");
    const data = await response.json();
    status.style.color = "#0f0";
    status.innerText = `掃描完成：${data.result}`;
  } catch {
    status.style.color = "red";
    status.innerText = "❌ 防詐掃描失敗，請確認 ngrok 隧道是否保持 Online 並更新 API_BASE_URL。";
  }
}

// 4. 付款提示
function triggerPayment() {
  alert("【易鑒星科 · 結緣資訊】\n銀行：(822) 中國信託\n帳號：您的帳號\n金額：NT$ 30\n完成後請截圖傳至 LINE 客服。");
}

// 5. 自動檢測 API 對齊
async function verifyAPI() {
  try {
    const res = await fetch(`${API_BASE_URL}/analyze`, { method: 'POST' });
    if (res.ok) {
      console.log("✅ API 對齊成功");
    } else {
      console.warn("⚠️ API 回應異常，請檢查 server.js 路由");
    }
  } catch {
    console.error("❌ 無法連線 API，請更新 script.js 中的 API_BASE_URL");
  }
}
window.onload = verifyAPI;
