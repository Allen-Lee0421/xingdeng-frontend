const express = require('express');
const cors = require('cors');
const app = express();

// ===== 全域設定 =====
app.use(express.json());

// ===== CORS 解封矩陣 =====
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

// ===== 統一回應格式矩陣 =====
function respond(res, code, message, data = {}, lang = 'zh-TW') {
  const translations = {
    'zh-TW': { success: '成功', error: '錯誤', danger: '危險' },
    'en': { success: 'Success', error: 'Error', danger: 'Danger' }
  };
  const dict = translations[lang] || translations['zh-TW'];
  res.json({
    code,
    message: `${dict[code] || code}：${message}`,
    data
  });
}

// ===== 路由層 =====

// 健康檢查
app.get('/', (req, res) => {
  respond(res, 'success', 'EdisonStar API is running.');
});

// 命理推演
app.post('/analyze', (req, res) => {
  console.log('analyze 收到:', req.body);
  respond(res, 'success', '推演完成！測試回應：吉', req.body);
});

// 防詐掃描
app.post('/scan', (req, res) => {
  console.log('scan 收到:', req.body);
  respond(res, 'danger', '測試：這是可疑網址', req.body);
});

// API 驗證
app.post('/verify', (req, res) => {
  respond(res, 'success', 'API 驗證成功', { timestamp: new Date() });
});

// ===== 啟動伺服器 =====
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
