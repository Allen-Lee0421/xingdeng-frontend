const express = require('express');
const cors = require('cors');
const app = express();

// 加入 CORS 中間件（允許所有來源，測試用）
app.use(cors({
  origin: '*',  // 測試時用 *，上線改成 ['https://xingdeng.tw']
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'ngrok-skip-browser-warning']
}));

// 你的其他路由...
app.post('/analyze', (req, res) => { ... });
app.post('/scan', (req, res) => { ... });

app.listen(3000, () => console.log('Server is running on port 3000'));
