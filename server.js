// --- 模組初始化 ---
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// --- 基礎中介層 ---
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// --- OPTIONS 攔截器 (CORS 預檢封印) ---
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    return res.sendStatus(200);
  }
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// --- API 路由封印 ---
app.post('/verify', (req, res) => {
  res.json({ code: 'success', message: 'API 驗證成功' });
});

app.post('/analyze', (req, res) => {
  res.json({ code: 'success', message: '推演完成！測試回應：吉' });
});

app.post('/scan', (req, res) => {
  res.json({ code: 'danger', message: '測試：這是可疑網址' });
});

// --- 錯誤處理封印 ---
app.use((err, req, res, next) => {
  console.error('錯誤封印：', err);
  res.status(500).json({ code: 'error', message: '伺服器錯誤' });
});

// --- 啟動伺服器 ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
