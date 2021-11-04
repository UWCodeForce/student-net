import nextConnect from 'next-connect';
import bcrypt from 'bcrypt';
import { query } from '../../../../utils/query';
import { SALT_ROUNDS } from '../../../../utils/systemconstants';

const handler = nextConnect().post(async (req, res) => {
	const { email, password } = await req.body;

	if (!email || !password) res.json({ error: 'Email or Password cannot be blank!' });

	try {
		/*
            todo:
              - validate password: see if it has 8 digits and 1 symbol 
              - add check to see if email has @uwinnipeg.ca or @webmail.uwinnipeg.ca
              - add check to see if email exists
              - send validation link to email
          */

		const hashedPW = await bcrypt.hash(password, SALT_ROUNDS);
		const results = await query(
			`
              INSERT INTO users(email, password) VALUES(?, ?)   
            `,
			[email, hashedPW]
		);

		return res.status(200).json({ message: 'Registered!' });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

export default handler;
