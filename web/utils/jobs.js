const { query } = require('./query.js');

module.exports.allJobs = async () => {
	try {
		let res = await query('SELECT * FROM indeedjobs');
		return res;
	} catch (e) {
		throw Error(e.message);
	}
};

module.exports.findJobById = async (id) => {
	try {
		let res = await query(`SELECT * FROM indeedjobs WHERE id = ?`, [id]);
		return res;
	} catch (e) {
		throw Error(e.message);
	}
};
