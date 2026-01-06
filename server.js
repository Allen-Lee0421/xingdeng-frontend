const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // 允許跨網域請求
app.use(express.json());

// 對應前端 startAnalysis()
app.post('/analyze', (req, res) => {
  res.json({ result: "天機顯現，大吉大利！Docker 與 ngrok 運作正常。" });
});

// 對應前端 startFraudScan()
app.post('/scan', (req, res) => {
  res.json({ result: "環境純淨，無詐騙威脅。" });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('易鑒星科伺服器已在端口 3000 點火啟動！');
});
