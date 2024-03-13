import express from 'express';

const app = express();

app.get('auht', (req, res) => {
  res.send('Hi there!');
});

app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});
