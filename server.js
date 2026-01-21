const express = require('express');
const cors = require('cors'); // 新增：支援 GitHub Pages 呼叫
const { exec } = require('child_process');
const path = require('path');
const app = express();

app.use(cors()); // 允許跨網域請求
app.use(express.json());

// ... (其餘定價與 Block 7 呼叫邏輯不變) ...

app.listen(3000, () => {
    console.log("易鑒星科後端引擎已啟動，準備接收 GitHub 前端請求...");
});
