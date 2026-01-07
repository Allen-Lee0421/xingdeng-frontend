const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/verify', (req, res) => {
  res.json({
    code: 'success',
    message: '成功：API 驗證成功',
    data: { timestamp: new Date() }
  });
});

app.listen(3000, () => {
  console.log('✅ Server is running on port 3000');
});
