const express = require('express');
const cors = require('cors');
const app = express();

// 啟用 CORS 與 JSON
app.use(cors({ origin: '*' }));
app.use(express.json());

// 命理推演路由
app.post('/analyze', (req, res) => {
  console.log("收到推演請求！");
  res.json({ result: "天機顯現，大吉大利！Docker 已成功回應。" });
});

// 防詐掃描路由
app.post('/scan', (req, res) => {
  console.log("收到防詐掃描請求！");
  res.json({ result: "防詐資料庫比對完成，未發現異常。" });
});

// 啟動伺服器
app.listen(3000, '0.0.0.0', () => {
  console.log("Server is running on port 3000");
});
