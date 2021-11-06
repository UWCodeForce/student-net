import { findJobById } from '../../../utils/jobs'

export default async function jobHandler({ query: { id } }, res) {

    var [job] = await findJobById(id);
  
    // Job with id exists
    if (job.length > 0) {
      res.status(200).json(job)
    } else {
      res.status(404).json({ message: `Job with id: ${id} not found.` })
    }
  }