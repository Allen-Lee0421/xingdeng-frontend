const express = require('express');
const cors = require('cors');
const app = express();

// 加 CORS：允許所有來源（測試用）
app.use(cors({
  origin: '*',  // 允許所有域名，包含 xingdeng.tw
  methods: ['GET', 'POST', 'OPTIONS'],  // 允許這些方法
  allowedHeaders: ['Content-Type', 'ngrok-skip-browser-warning']  // 允許這些標頭
}));

// 你的其他程式碼...
app.get('/', (req, res) => {
  res.send('EdisonStar API is running.');
});

// 你的 API 路由，例如
app.post('/analyze', (req, res) => {
  res.json({ result: '推演完成！' });
});

app.post('/scan', (req, res) => {
  res.json({ status: 'success', reason: '測試回應' });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
// script.js - 最終版 (2026/01/07)

const API_BASE_URL = "https://mariyah-unexplanatory-regan.ngrok-free.dev";

const statusElement = document.getElementById('statusOutput');

async function callAPI(endpoint, method = 'POST', body = null) {
  if (!statusElement) {
    console.error("找不到 statusOutput");
    return null;
  }

  statusElement.style.color = "#d4af37";
  statusElement.innerText = "正在連通後端 API...";

  try {
    const headers = {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '69420'  // 常用跳過 ngrok 警告的數字
    };

    const options = { method, headers };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`API 錯誤: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    statusElement.style.color = "#0f0";
    statusElement.innerText = "API 連線成功！";

    return data;
  } catch (err) {
    console.error("API 失敗:", err);
    statusElement.style.color = "red";
    statusElement.innerText = `❌ 連線失敗\n原因: ${err.message}\n請確認 ngrok 隧道開啟，或稍後再試。`;
    return null;
  }
}

async function startAnalysis() {
  const result = await callAPI('/analyze', 'POST', { test: true });
  if (result) {
    statusElement.innerText += `\n推演結果：${result.result || JSON.stringify(result)}`;
  }
}

async function startFraudScan() {
  const input = document.getElementById('scanInput')?.value || "";
  if (!input) {
    statusElement.style.color = "orange";
    statusElement.innerText = "請輸入內容";
    return;
  }

  const result = await callAPI('/scan', 'POST', { url: input });
  if (result) {
    statusElement.innerText += `\n掃描結果：${result.status || '安全'} - ${result.reason || JSON.stringify(result)}`;
  }
}

function triggerPayment() {
  alert("【易鑑星科 · 結緣資訊】\n銀行：(822) 中國信託\n帳號：您的帳號\n金額：NT$30\n完成後截圖傳 LINE 客服。");
}

async function verifyAPI() {
  const result = await callAPI('/analyze', 'POST', { test: true });
  if (result) {
    statusElement.style.color = "#0f0";
    statusElement.innerText = "API 連線正常，可開始使用";
  }
}

window.onload = verifyAPI;

