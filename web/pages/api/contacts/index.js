import nextConnect from 'next-connect';
import { query } from '../../../utils/query';

const handler = nextConnect().post(async (req, res) => {
	const { email, name, description } = await req.body;
	try {
		await query(`INSERT INTO contacts(email, name, description) VALUES(?, ?, ?)`, [
			email,
			name,
			description,
		]);
		return res.status(200).json({ message: 'Message sent!' });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

export default handler;
