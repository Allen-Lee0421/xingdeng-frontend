const express = require('express');
const cors = require('cors');
const app = express();

// 🚀 終極 CORS 配置：允許所有來源、標頭與方法
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'ngrok-skip-browser-warning']
}));

app.use(express.json());

// 增加一條根路徑，確保連線測試正常
app.get('/', (req, res) => res.send("EdisonStar API is running."));

// 命理推演路由
app.post('/analyze', (req, res) => {
  console.log("收到推演請求！");
  res.json({ result: "天機顯現，大吉大利！" });
});

// 防詐掃描路由
app.post('/scan', (req, res) => {
  console.log("收到防詐請求！");
  res.json({ result: "環境純淨，目前無威脅。" });
});

app.listen(3000, '0.0.0.0', () => {
  console.log("# Server is running on port 3000");
});
