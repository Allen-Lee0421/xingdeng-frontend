const express = require('express');
const cors = require('cors');
const app = express();

// 解析 JSON 請求體
app.use(express.json());

// CORS 設定（允許所有來源，測試用）
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'ngrok-skip-browser-warning']
}));

// 明確處理 OPTIONS 預檢請求（這行很重要！）
app.options('*', cors());

// 根路由測試
app.get('/', (req, res) => {
  res.send('EdisonStar API is running.');
});

// 命理推演路由（測試回應）
app.post('/analyze', (req, res) => {
  console.log('收到 analyze 請求:', req.body);
  res.json({ 
    result: '推演完成！測試回應：吉', 
    data: req.body 
  });
});

// 防詐掃描路由（測試回應）
app.post('/scan', (req, res) => {
  console.log('收到 scan 請求:', req.body);
  res.json({ 
    status: 'danger', 
    reason: '這是假投資網址（測試）', 
    data: req.body 
  });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
