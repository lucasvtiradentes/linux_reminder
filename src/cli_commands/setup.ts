import { CONFIGS } from '../consts/configs';
import { TConfigs } from '../schemas/configs.schema';
import { addAtJob, listAllAtJobs } from '../system_commands/at_commands';
import { getTodayDayOfTheWeek, isCurrentTimeBefore } from '../utils/date_utils';
import { logger } from '../utils/logger';

export async function setupCommand(configsData: TConfigs) {
  for (const remind of configsData.reminders) {
    const { name, category, days, time } = remind;

    const todayDayOfTheWeek = getTodayDayOfTheWeek();
    const shouldRunToday = (() => {
      if (days === 'everyday') return true;
      if (days === 'weekday' && [1, 2, 3, 4, 5].includes(todayDayOfTheWeek)) return true;
      if (days === 'weekend' && [6, 7].includes(todayDayOfTheWeek)) return true;

      return false;
    })();

    if (!shouldRunToday) continue;

    const isCurrentTimeBeforeJobTime = isCurrentTimeBefore(time);
    if (!isCurrentTimeBeforeJobTime) continue;

    const allScheduledJobs = await listAllAtJobs();

    const speachPart = CONFIGS.options.playTextToSpeech ? `spd-say \\"${name}\\";` : '';
    const notificationPart = (() => {
      if (CONFIGS.options.useZenitAsNotifierSender) {
        return '';
      } else {
        return `notify-send -t ${CONFIGS.options.notificationExpireTime} \\"${category}\\" \\"${name}\\";`;
      }
    })();
    const finalExpression = `{ echo ${CONFIGS.cronjob_prefix}; ${speachPart} ${notificationPart} }`;
    if (allScheduledJobs.map((item) => item.atJobCommand).some((item) => item.includes(name))) continue;

    await addAtJob(finalExpression, time);
    logger.info(`schedule job: ${time} - ${category} - ${name}`);
  }
}
