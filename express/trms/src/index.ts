import expressSession from 'express-session';
import express from 'express';
import 'express-async-errors';
import path from 'path';
import StatusCodes from 'http-status-codes';
import dotenv from 'dotenv';

dotenv.config({});

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));
app.use(expressSession({
  secret: 'whatever-probably-should-be-from-env-vars',
  cookie: {},
}));

const port = process.env.PORT || 3000;

app.get('/json', (req, res) => {
  console.log('Our callback was invoked!');
  res.json({ data: 'This is sending back JSON' });
});

app.listen(port, () => {
  console.log(`Server has started listining on port ${port}`);
});
