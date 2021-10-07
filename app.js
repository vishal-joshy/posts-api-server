const express = require('express');
const cors = require('cors');
const passport = require('passport');
const User = require('./model/userModel');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');
const LocalStrategy = require('passport-local').Strategy;
const config = require('./config');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
	new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, function (
		username,
		password,
		cb
	) {
		return User.findOne({ username, password })
			.then((user) => {
				if (!user) {
					return cb(null, false, { message: 'Incorrect email or password.' });
				}
				return cb(null, user, { message: 'Logged In Successfully' });
			})
			.catch((err) => cb(err));
	})
);

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: 'your_jwt_secret',
		},
		function (jwtPayload, cb) {
			//find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
			console.log("payload",jwtPayload);
			return User.findById(jwtPayload.userId)
				.then((user) => {
					console.log(user);
					return cb(null, user);
				})
				.catch((err) => {
					return cb(err);
				});
		}
	)
);

const app = express();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(flash());
app.use(cookieParser());

app.use((req, res, next) => {
	console.log('req.session', req.session);
	console.log('req.user', req.user);
	next();
});

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
