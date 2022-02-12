import nextConnect from 'next-connect';
import { query } from '../../../utils/query';

const handler = nextConnect().get(async (req, res) => {
	const user = req.user;

	try {
		const id = user.id;
		var [results] = await query(`SELECT * FROM PROFILE WHERE userId = ?`, [id]);
		if (results.length == 0) res.status(401).json({ error: 'Profile not found!' });

		return res.json({ profile: results[0] });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

export default handler;
