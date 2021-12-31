import nextConnect from 'next-connect';
import { query } from '../../../utils/query';

const handler = nextConnect().get(async (req, res) => {
	const user = req.user;

	try {
		const id = user.id;
		var [results] = await query(`SELECT * FROM PROFILE WHERE userId = ?`, [id]);
		if (results.length < 1) res.status(401).json({ error: id });

		return res.json({ profile: results });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

export default handler;
