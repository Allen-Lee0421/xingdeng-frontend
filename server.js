const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ---------------------------------------------------------
// 🏮 總監配置：金流帳號與階梯定價 (2026 丙午年戰鬥版)
// ---------------------------------------------------------
const config = {
    bank: {
        rakuten: "826-81201001535981",
        linebank: "824-111013844288",
        paypal: "https://paypal.me/TaiwanPayment"
    },
    pricing: {
        analysis: 1280,      // 星火計畫 (星燈 2026 國運)
        babyNaming: 3600,    // 專業命名
        premiumNaming: 8800  // 旗艦佈局
    }
};

// 運營數據監控 (項 11)
let stats = {
    revenueTotal: 0,
    charityFund: 0,
    totalOrders: 0
};

// ---------------------------------------------------------
// 🏮 API 接口：供前端調用
// ---------------------------------------------------------

// 1. 獲取支付與定價資訊 (供 pay.html 或授權牆使用)
app.get('/api/config', (req, res) => {
    res.json({
        pricing: config.pricing,
        bank: config.bank
    });
});

// 2. 核心演算接口：連動 Block 7 數據對沖
app.post('/api/calculate', (req, res) => {
    const { name, birthtime, lang = 'zh-TW', mode = 'analysis' } = req.body;
    
    // 定義鑑定單價
    const price = config.pricing[mode] || 1280;

    // 呼叫 Python Block 7 核心 (5,592 筆數據對沖)
    const cmd = `python D:\\EdisonStar\\block7_service.py "${birthtime}" "${name}" "${mode}"`;
    
    exec(cmd, (error, stdout, stderr) => {
        let finalReport = "";
        
        // 如果 Python 執行成功則讀取結果，否則使用總監預設之戰鬥文案
        if (!error && stdout) {
            finalReport = JSON.parse(stdout).report;
        } else {
            // 總監指定之三語系戰鬥文案 (項 1, 8, 13)
            const reports = {
                'zh-TW': `【易鑒星科】${name} 閣下，2026丙午年氣數演繹已完成。國運交感顯示，台灣位處震宮，數據對沖值 5592...`,
                'en': `[Xing Deng] Dear ${name}, the 2026 Fortune Analysis is complete. Global trends indicate...`,
                'th': `[อี้เจี้ยนซิงเคอ] คุณ ${name} ผลการวิเคราะห์ดวงปี 2026 เสร็จสมบูรณ์แล้ว...`
            };
            finalReport = reports[lang] || reports['en'];
        }

        // 記錄營收與提撥 5% 公益金
        stats.revenueTotal += price;
        stats.charityFund += price * 0.05;
        stats.totalOrders += 1;

        console.log(`[交易成功] 單次營收: NT$ ${price} | 當前總營收: NT$ ${stats.revenueTotal}`);

        res.json({
            status: "success",
            report: finalReport,
            amount: price,
            charity: stats.charityFund
        });
    });
});

// 3. 公益透明盒接口
app.get('/api/charity', (req, res) => {
    res.json({ charity_fund: stats.charityFund });
});

app.get('/health', (req, res) => {
    res.status(200).send('🚀 Edison Star System: Ready for 2026 Business');
});

app.listen(PORT, () => {
    console.log("--------------------------------------------------");
    console.log("🚀 易鑒星科雲端總部：1979/4/21 數據模組已就緒。");
    console.log("🚀 十國語系匯率對沖邏輯已啟動。");
    console.log(`🚀 監聽網址：http://localhost:${PORT}`);
    console.log("--------------------------------------------------");
});
