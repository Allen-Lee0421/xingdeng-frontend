// script.js - 最終版 (2026/01/07)

// 1. API 隧道網址
const API_BASE_URL = "https://mariyah-unexplanatory-regan.ngrok-free.dev";

// 2. 共用狀態元素
const statusElement = document.getElementById('statusOutput');

// 3. 共用 fetch 包裝函式
async function callAPI(endpoint, method = 'POST', body = null) {
  if (!statusElement) {
    console.error("找不到 #statusOutput");
    return null;
  }

  statusElement.style.color = "#d4af37";
  statusElement.innerText = "正在連通本機 Docker 引擎...";

  try {
    const headers = {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    };

    const options = { method, headers };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`API 回應異常: ${response.status}`);
    }

    const data = await response.json();

    statusElement.style.color = "#0f0";
    statusElement.innerText = "完成！";

    return data;
  } catch (err) {
    console.error("API 失敗:", err);
    statusElement.style.color = "red";
    statusElement.innerText = `❌ ${err.message}\n請確認 ngrok 隧道開啟，或稍後再試。`;
    return null;
  }
}

// 4. 命理推演
async function startAnalysis() {
  // 未來可加輸入欄位
  const result = await callAPI('/analyze', 'POST', { test: true });
  if (result) {
    statusElement.innerText += `\n推演結果：${result.result || JSON.stringify(result)}`;
  }
}

// 5. 防詐掃描
async function startFraudScan() {
  const input = document.getElementById('scanInput')?.value || "";
  if (!input) {
    statusElement.style.color = "orange";
    statusElement.innerText = "請輸入可疑內容";
    return;
  }

  const result = await callAPI('/scan', 'POST', { url: input });
  if (result) {
    statusElement.innerText += `\n掃描結果：${result.status || '安全'} - ${result.reason || JSON.stringify(result)}`;
  }
}

// 6. 付款
function triggerPayment() {
  alert("【易鑑星科 · 結緣資訊】\n銀行：(822) 中國信託\n帳號：您的帳號\n金額：NT$30\n完成後截圖傳 LINE 客服。");
}

// 7. 頁面載入檢測 API
async function verifyAPI() {
  const result = await callAPI('/analyze', 'POST', { test: true });
  if (result) {
    statusElement.style.color = "#0f0";
    statusElement.innerText = "API 連線正常，可開始使用";
  }
}

window.onload = verifyAPI;
