const express = require('express');
const cors = require('cors');
const app = express();

// 🚀 終極 CORS 暴力放行：確保預檢請求 (OPTIONS) 一定能通過
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'ngrok-skip-browser-warning']
}));

app.use(express.json());

// 根路徑測試
app.get('/', (req, res) => res.send("EdisonStar API is running."));

// 命理推演路由
app.post('/analyze', (req, res) => {
  console.log("收到推演請求！");
  res.json({ result: "天機顯現，大吉大利！連線完全成功。" });
});

// 防詐掃描路由
app.post('/scan', (req, res) => {
  console.log("收到防詐請求！");
  res.json({ result: "環境安全，並未發現異常。" });
});

app.listen(3000, '0.0.0.0', () => {
  console.log("Server is running on port 3000 - CORS Fully Enabled");
});
