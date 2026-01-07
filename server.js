const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

// CORS 設定
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'ngrok-skip-browser-warning']
}));

// 明確處理 OPTIONS
app.options('*', cors());

// 根路由
app.get('/', (req, res) => {
  res.send('EdisonStar API is running.');
});

// 測試路由
app.post('/analyze', (req, res) => {
  res.json({ result: '推演完成！測試回應' });
});

app.post('/scan', (req, res) => {
  res.json({ status: 'success', reason: '測試掃描' });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
