import app from './app';
import {createConnection} from './db';

const { PORT } = process.env;

createConnection();

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}.`);
});
