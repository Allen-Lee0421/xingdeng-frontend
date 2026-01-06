const express = require('express');
const cors = require('cors');
const app = express();

// 核心配置：允許前端跨網域連線
app.use(cors());
app.use(express.json());

// 1. 對應前端 startAnalysis()
app.post('/analyze', (req, res) => {
  console.log("收到命理推演請求...");
  res.json({ result: "天機顯現，大吉大利！Docker 與 ngrok 運作正常。" });
});

// 2. 對應前端 startFraudScan()
app.post('/scan', (req, res) => {
  console.log("收到防詐掃描請求...");
  res.json({ result: "環境純淨，目前無詐騙威脅。" });
});

// 3. 啟動監聽
app.listen(3000, '0.0.0.0', () => {
  console.log('易鑒星科伺服器已在端口 3000 點火啟動！');
});
