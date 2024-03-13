import express from 'express';

const app = express();

app.get('*', (req, res) => {
  const { url, baseUrl, originalUrl } = req;
  res.json({ url, baseUrl, originalUrl });
});

app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});
