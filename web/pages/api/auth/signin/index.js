import nextConnect from 'next-connect';
import bcrypt from 'bcrypt';
import { query } from '../../../../utils/query';

const handler = nextConnect().post(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) res.status(400).json({ error: 'Email or Password cannot be blank' });

	try {
		var results = await query(
			`
              SELECT password, id FROM users WHERE email = ?
            `,
			[email]
		);

		if (results[0].length < 1) res.status(401).json({ error: 'Email not found' });
		else results = JSON.parse(JSON.stringify(results[0][0])); // this is needed to parse the RowPacket that mysql returns

		const { password: hashedPW, id } = results;

		const isValid = await bcrypt.compare(password, hashedPW);

		if (!isValid) res.status(401).json({ error: 'Incorrect Password' });
		else if (isValid) {
			/**
			 *  Do some stuff with sessions
			 *
			 */

			res.status(200).json({ message: 'Success' });
		}
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

export default handler;
