import { listAllAtJobs, removeAtJob } from '../system_commands/at_commands';
import { logger } from '../utils/logger';

export async function uninstallCommand() {
  const allScheduledJobs = await listAllAtJobs();
  for (const atJob of allScheduledJobs) {
    console.log(atJob);
    const jobIndex = atJob.atJobIndex;
    await removeAtJob(jobIndex);
    logger.info(`removed atjob with index ${jobIndex}`);
  }
}
