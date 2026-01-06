const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' })); // 允許任何來源
app.use(express.json());

app.post('/analyze', (req, res) => {
  console.log("收到請求！");
  res.setHeader('Access-Control-Allow-Origin', '*'); // 二重保險
  res.json({ result: "天機顯現，大吉大利！Docker 已成功回應。" });
});

app.listen(3000, '0.0.0.0');
