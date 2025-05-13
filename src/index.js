require('dotenv').config();
const app = require('./app');
const connectDatabase = require('./database');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server listen on port: ' + PORT);
});

connectDatabase();