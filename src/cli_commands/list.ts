import { listAllAtJobs } from '../system_commands/at_commands';
import { logger } from '../utils/logger';

export async function listCommand() {
  const allScheduledJobs = await listAllAtJobs();

  const parsedItems = allScheduledJobs.map((item) => {
    const isZenity = item.atJobCommand.includes('zenity');
    if (isZenity) {
      return {
        category: '',
        name: '',
        time: item.atJobTime
      };
    } else {
      const commandArr = item.atJobCommand.split('-t ')[1].split(' ');
      const [, category, ...nameArr] = commandArr;
      return {
        category: category.replace(/"/g, ''),
        name: nameArr.join(' ').split(';')[0].replace(/"/g, ''),
        time: item.atJobTime
      };
    }
  });

  logger.info(parsedItems.map((item) => `${item.time} - ${item.category} - ${item.name}`).join('\n'));
}

// colocar hora do atJob
