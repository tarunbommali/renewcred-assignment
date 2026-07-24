const { connect } = require('mongoose');
const app = require('./app');
const connectDB = require('./config/db');
const env = require('./config/env');


const PORT = env.port;


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`RenewCred CMS Backend running on port ${PORT}`);
  });
  console.log(`RenewCred CMS Backend running on port ${PORT}`);
}).catch((e) => {
  console.log(`Something we wrong ${e}`)
})
