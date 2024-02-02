const express = require('express');

const app = express();

app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
