const express = require('express');
const cors = require('cors');
const app = express();

// 解析 JSON
app.use(express.json());

// CORS - 允許所有來源 + 明確 OPTIONS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'ngrok-skip-browser-warning'],
  credentials: false
}));

// 明確處理 preflight OPTIONS 請求
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, ngrok-skip-browser-warning');
  res.sendStatus(200);
});

// 測試根路由
app.get('/', (req, res) => {
  res.send('EdisonStar API is running.');
});

// 命理推演路由
app.post('/analyze', (req, res) => {
  console.log('analyze 收到:', req.body);
  res.json({ result: '推演完成！測試回應：吉', data: req.body });
});

// 防詐掃描路由
app.post('/scan', (req, res) => {
  console.log('scan 收到:', req.body);
  res.json({ status: 'danger', reason: '測試：這是可疑網址', data: req.body });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
