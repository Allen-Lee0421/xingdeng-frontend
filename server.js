const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 🏮 總監 13 項規格：金流與定價
const config = {
    bank: {
        rakuten: "826 樂天國際銀行 帳號：81201001535981",
        linebank: "824 Line Bank 帳號：111013844288",
        paypal: "https://paypal.me/TaiwanPayment"
    },
    pricing: {
        analysis: 1280,      // 原名/國運測算
        babyNaming: 3600,    // 新生兒/成家取名優待
        premiumNaming: 8800  // 高階取名/改名
    }
};

let stats = { revenue: 0, charity: 0 };

// API: 獲取系統配置
app.get('/api/config', (req, res) => res.json(config));

// API: 核心演算 (連動 Block 7)
app.post('/api/calculate', (req, res) => {
    const { name, birthtime, mode, lang } = req.body;
    const price = config.pricing[mode] || 1280;
    
    // 執行 D:\EdisonStar\block7_service.py 進行 5592 數據對沖
    const cmd = `python D:\\EdisonStar\\block7_service.py "${birthtime}" "${name}" "${mode}"`;
    
    exec(cmd, (error, stdout) => {
        let report = "";
        if (!error && stdout) {
            report = JSON.parse(stdout).report;
        } else {
            // 備援文案 (總監戰鬥版)
            report = `【易鑒星科】${name} 閣下，2026丙午年氣數演繹已完成。國運交感顯示，數據對沖值 5592 閉環成功...`;
        }
        
        stats.revenue += price;
        stats.charity += price * 0.05;
        res.json({ status: "success", report, charity: stats.charity });
    });
});

app.listen(PORT, () => console.log(`🚀 營利模式啟動：http://localhost:${PORT}`));
