const nextConnect = require('next-connect');
const { pool } = require('../utils/query');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const sessionStore = new MySQLStore(
	{
		expiration: 3600,
		createDatabaseTable: false, // probably should create it manually
		schema: {
			tableName: 'sessions',
			columnNames: {
				session_id: 'session_id',
				expires: 'session_expiry',
				data: 'session_data',
			},
		},
	},
	pool
);

const auth = nextConnect().use(
	session({
		name: 'sid',
		secret: process.env.SESSION_SECRET || 'keyboard cat',
		resave: false, // no need to store the session again everytime for every user
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 300, // 5 mins, might want to add to serverconstants.js later
		},
		store: sessionStore,
	})
);

export default auth;
