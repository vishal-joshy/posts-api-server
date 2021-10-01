const express = require('express');
const connectDB = require('./db');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.use('/api', require('./routes/postApi'));

// error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send(err);
});

app.listen(8080, () => {
	console.log('server running at 8080');
});
