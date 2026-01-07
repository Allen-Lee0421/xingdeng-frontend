const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// OPTIONS 攔截器
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

// 三路由掛載
app.post('/verify', (req, res) => {
  res.json({ code: 'success', message: 'API 驗證成功' });
});
app.post('/analyze', (req, res) => {
  res.json({ code: 'success', message: '推演完成！測試回應：吉' });
});
app.post('/scan', (req, res) => {
  res.json({ code: 'danger', message: '測試：這是可疑網址' });
});

app.listen(3000, () => {
  console.log('✅ Server running on port 3000');
});
