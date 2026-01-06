const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 命理推演模組
app.post('/analyze', (req, res) => {
  res.json({ result: '天機已定：您本月宜靜不宜動。' });
});

// 防詐掃描模組
app.post('/scan', (req, res) => {
  res.json({ result: '掃描結果：該來源目前未列入詐騙資料庫。' });
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`易鑒星科 · 核心伺服器已啟動於 port ${PORT}`);
});
