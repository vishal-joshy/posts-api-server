const express = require('express');
const cors = require('cors');

const connectDB = require('./db');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

connectDB();

app.use('/api', require('./routes/postApi'));
app.use('/api', require('./routes/userApi'));

// error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send(err);
});

app.listen(8080, () => {
	console.log('server running at 8080');
});
