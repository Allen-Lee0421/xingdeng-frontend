const express = require('express');
const app = express();
app.use(express.json());

app.options('/analyze', (req, res) => res.sendStatus(204)); // CORS 預檢
app.post('/analyze', (req, res) => {
  res.json({ result: '天機已定' });
});

app.listen(3000, () => {
  console.log('易鑒星科後端已啟動於 port 3000');
});
