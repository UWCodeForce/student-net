const { pool, query } = require('./query');
const session = require('express-session');
const bcrypt = require('bcrypt');
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

const auth = session({
	name: 'sid',
	secret: process.env.SESSION_SECRET || 'keyboard cat',
	resave: false,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		secure: false,
		maxAge: 24 * 60 * 60 * 1000,
	},
	store: sessionStore,
});

const getUserById = async (id) => {
	try {
		var [results] = await query(
			`
		SELECT * FROM users WHERE id = ?
	  `,
			[id]
		);
		if(results.length > 0) {
			let user = results[0];
			return user;
		} else {
			return null;
		}
	} catch (e) {
		throw e;
	}
};

const getUserByEmailAndPass = async (email, password, callback) => { //Can't be async for passport
	try {
		var [results] = await query("SELECT * FROM users WHERE email=?", [email]);
		if(results.length > 0) {
			let user = results[0];
			bcrypt.compare(password, user.password, (err, same) => {
				if(err) throw err;
				if(same) {
					callback(user);
				} else {
					callback(false);
				}
			});
		} else {
			callback(null);
		}
	} catch (e) {
		throw e;
	}
}

module.exports = { auth, getUserById, getUserByEmailAndPass };
