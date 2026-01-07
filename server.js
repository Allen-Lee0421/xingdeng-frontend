const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

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

function logEvent(type, payload, category = 'general') {
  const timestamp = new Date();
  const dateStr = timestamp.toISOString().split('T')[0];
  const timeStr = timestamp.toISOString();
  const logDir = path.join(__dirname, 'logs');
  const logFile = path.join(logDir, `${dateStr}.txt`);
  const emojiMap = {
    推演: '🔍',
    防詐: '🛡️',
    驗證: '📡',
    錯誤: '❌',
    general: '📄'
  };
  const emoji = emojiMap[category] || '📄';
  const entry = `${emoji} [${timeStr}] [${category}] ${type}\n${JSON.stringify(payload, null, 2)}\n\n`;

  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
  fs.appendFile(logFile, entry, err => {
    if (err) console.error('❌ 寫入 log 檔失敗:', err);
  });
}

app.get('/', (req, res) => {
  respond(res, 'success', 'EdisonStar API is running.');
});

app.post('/analyze', (req, res) => {
  try {
    logEvent('analyze', req.body, '推演');
    respond(res, 'success', '推演完成！測試回應：吉', req.body);
  } catch (err) {
    logEvent('analyze-error', { error: err.message }, '錯誤');
    respond(res, 'error', '推演失敗', { error: err.message });
  }
});

app.post('/scan', (req, res) => {
  try {
    logEvent('scan', req.body, '防詐');
    respond(res, 'danger', '測試：這是可疑網址', req.body);
  } catch (err) {
    logEvent('scan-error', { error: err.message }, '錯誤');
    respond(res, 'error', '掃描失敗', { error: err.message });
  }
});

app.post('/verify', (req, res) => {
  try {
    logEvent('verify', req.body, '驗證');
    respond(res, 'success', 'API 驗證成功', { timestamp: new Date() });
  } catch (err) {
    logEvent('verify-error', { error: err.message }, '錯誤');
    respond(res, 'error', '驗證失敗', { error: err.message });
  }
});

app.use((err, req, res, next) => {
  console.error('❌ 全域錯誤:', err);
  logEvent('global-error', { error: err.message }, '錯誤');
  respond(res, 'error', '伺服器內部錯誤', { error: err.message });
});

app.listen(3000, () => {
  console.log('✅ Server is running on port 3000');
});
