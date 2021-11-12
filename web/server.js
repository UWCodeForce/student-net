const next = require('next');
const express = require('express');
require('dotenv').config(); //Load from the .env file

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev }); //Create the next.js server
const handleNextRequest = app.getRequestHandler(); //We need to get the next.js request handler so any routes we don't handle manually
//will be handled by Next.JS
const { pool } = require('./utils/query');
const { auth, getUserById } = require('./utils/auth');
const passport = require('passport');

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
	const user = await getUserById(id);
	if (user) {
		done(null, user);
	} else {
		done(null, false);
	}
});

app.prepare().then(() => {
	const server = express();

	//if we want to manually handle any routes or add middleware, do it here

	server.use(auth);
	server.use(passport.initialize());
	server.use(passport.session());

	require('./utils/databasemigrations')(pool); //Will automatically look for new SQL scripts and execute them in order
	server.all('*', handleNextRequest);

	//Start the server
	server.listen(process.env.PORT || 8080, (err) => {
		if (err) throw err;
		console.log(`Next.js listening on localhost:3000`);
	});
});
