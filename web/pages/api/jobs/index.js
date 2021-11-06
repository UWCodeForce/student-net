import nextConnect from 'next-connect'
import { allJobs } from '../../../utils/jobs'

const handler = nextConnect()

    .get(async (req, res) => {
        try {
            var [results] = await allJobs();
            if (results.length > 0) {
                res.json(results)
            }
            else {
                res.status(500).json({error: "No jobs found"});
            }
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    })

export default handler