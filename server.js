const express = require('express');
const cors = require('cors');
const fs = require('fs');
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

// ===== 日誌封存矩陣 =====
function logEvent(type, payload, category = 'general') {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] [${category}] ${type} 收到：${JSON.stringify(payload)}\n`;
  fs.appendFile('log.txt', entry, err => {
    if (err) console.error('❌ 寫入 log.txt 失敗:', err);
  });
}

// ===== 路由層 =====

// 健康檢查
app.get('/', (req, res) => {
  respond(res, 'success', 'EdisonStar API is running.');
});

// 命理推演
app.post('/analyze', (req, res) => {
  try {
    logEvent('analyze', req.body, '推演');
    respond(res, 'success', '推演完成！測試回應：吉', req.body);
  } catch (err) {
    logEvent('analyze-error', { error: err.message }, '錯誤');
    respond(res, 'error', '推演失敗', { error: err.message });
  }
});

// 防詐掃描
app.post('/scan', (req, res) => {
  try {
    logEvent('scan', req.body, '防詐');
    respond(res, 'danger', '測試：這是可疑網址', req.body);
  } catch (err) {
    logEvent('scan-error', { error: err.message }, '錯誤');
    respond(res, 'error', '掃描失敗', { error: err.message });
  }
});

// API 驗證
app.post('/verify', (req, res) => {
  try {
    logEvent('verify', req.body, '驗證');
    respond(res, 'success', 'API 驗證成功', { timestamp: new Date() });
  } catch (err) {
    logEvent('verify-error', { error: err.message }, '錯誤');
    respond(res, 'error', '驗證失敗', { error: err.message });
  }
});

// ===== 全域錯誤捕捉層 =====
app.use((err, req, res, next) => {
  console.error('❌ 全域錯誤:', err);
  logEvent('global-error', { error: err.message }, '錯誤');
  respond(res, 'error', '伺服器內部錯誤', { error: err.message });
});

// ===== 啟動伺服器 =====
app.listen(3000, () => {
  console.log('✅ Server is running on port 3000');
});
const express = require('express');
const cors = require('cors');
const fs = require('fs');
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

// ===== 日誌封存矩陣 =====
function logEvent(type, payload, category = 'general') {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] [${category}] ${type} 收到：${JSON.stringify(payload)}\n`;
  fs.appendFile('log.txt', entry, err => {
    if (err) console.error('❌ 寫入 log.txt 失敗:', err);
  });
}

// ===== 路由層 =====

// 健康檢查
app.get('/', (req, res) => {
  respond(res, 'success', 'EdisonStar API is running.');
});

// 命理推演
app.post('/analyze', (req, res) => {
  try {
    logEvent('analyze', req.body, '推演');
    respond(res, 'success', '推演完成！測試回應：吉', req.body);
  } catch (err) {
    logEvent('analyze-error', { error: err.message }, '錯誤');
    respond(res, 'error', '推演失敗', { error: err.message });
  }
});

// 防詐掃描
app.post('/scan', (req, res) => {
  try {
    logEvent('scan', req.body, '防詐');
    respond(res, 'danger', '測試：這是可疑網址', req.body);
  } catch (err) {
    logEvent('scan-error', { error: err.message }, '錯誤');
    respond(res, 'error', '掃描失敗', { error: err.message });
  }
});

// API 驗證
app.post('/verify', (req, res) => {
  try {
    logEvent('verify', req.body, '驗證');
    respond(res, 'success', 'API 驗證成功', { timestamp: new Date() });
  } catch (err) {
    logEvent('verify-error', { error: err.message }, '錯誤');
    respond(res, 'error', '驗證失敗', { error: err.message });
  }
});

// ===== 全域錯誤捕捉層 =====
app.use((err, req, res, next) => {
  console.error('❌ 全域錯誤:', err);
  logEvent('global-error', { error: err.message }, '錯誤');
  respond(res, 'error', '伺服器內部錯誤', { error: err.message });
});

// ===== 啟動伺服器 =====
app.listen(3000, () => {
  console.log('✅ Server is running on port 3000');
});
console.log('🧠 CPU 使用率:', process.cpuUsage());
console.log('🧠 記憶體使用:', process.memoryUsage());
