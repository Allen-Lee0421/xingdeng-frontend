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

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, ngrok-skip-browser-warning');
  res.sendStatus(200);
});

// ===== 回應格式矩陣 =====
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
app.get('/', (req, res) => {
  respond(res, 'success', 'EdisonStar API is running.');
});

app.post('/analyze', (req, res) => {
  try {
    console.log('analyze 收到:', req.body);
    respond(res, 'success', '推演完成！測試回應：吉', req.body);
  } catch (err) {
    respond(res, 'error', '推演失敗', { error: err.message });
  }
});

app.post('/scan', (req, res) => {
  try {
    console.log('scan 收到:', req.body);
    respond(res, 'danger', '測試：這是可疑網址', req.body);
  } catch (err) {
    respond(res, 'error', '掃描失敗', { error: err.message });
  }
});

app.post('/verify', (req, res) => {
  try {
    respond(res, 'success', 'API 驗證成功', { timestamp: new Date() });
  } catch (err) {
    respond(res, 'error', '驗證失敗', { error: err.message });
  }
});

// ===== 全域錯誤捕捉層 =====
app.use((err, req, res, next) => {
  console.error('❌ 全域錯誤:', err);
  respond(res, 'error', '伺服器內部錯誤', { error: err.message });
});

// ===== 啟動伺服器 =====
app.listen(3000, () => {
  console.log('✅ Server is running on port 3000');
});
