const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// CORS 設定，允許 ngrok-skip-browser-warning header
app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'ngrok-skip-browser-warning']
}));

// 全域中介層：在所有回應中加入 ngrok-skip-browser-warning header
app.use((req, res, next) => {
  res.setHeader('ngrok-skip-browser-warning', 'true');
  next();
});

// 路由 /analyze
app.post('/analyze', (req, res) => {
  res.json({ result: "推演成功內容" });
});

// 路由 /scan
app.post('/scan', (req, res) => {
  res.json({ result: "掃描成功內容" });
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`易鑒星科 · 核心伺服器已啟動於 port ${PORT}`);
});
