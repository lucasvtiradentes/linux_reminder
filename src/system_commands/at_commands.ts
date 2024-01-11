import { CONFIGS } from '../consts/configs';
import { asyncExec } from '../utils/async_exec';
import { logger } from '../utils/logger';

export async function addAtJob(command: string, time: string) {
  try {
    await asyncExec(`echo "${command}" | at "${time}"`);
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
}

export async function removeAtJob(atJobIndex: string) {
  try {
    await asyncExec(`at -d ${atJobIndex}`);
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
}

type TAtJob = {
  atJobCommand: string;
  atJobIndex: string;
  atJobTime: string;
};

export async function listAllAtJobs() {
  try {
    const atJobs: TAtJob[] = [];

    const atJobIndexesArr = (await asyncExec(`at -l`)).stdout.split('\n').filter((item) => item !== '');

    const parsedJobArr = atJobIndexesArr.map((item) => {
      const itemArr = item.split('\t');
      return {
        jobIndex: itemArr[0],
        jobTime: itemArr[1].split(' ')[3].slice(0, 5)
      };
    });

    for (const atJobInfo of parsedJobArr) {
      const result = await asyncExec(`at -c ${atJobInfo.jobIndex}`);
      const atJobCommand = result.stdout.split('\n').find((item) => item.includes(CONFIGS.cronjob_prefix));
      atJobs.push({ atJobCommand, atJobIndex: atJobInfo.jobIndex, atJobTime: atJobInfo.jobTime });
    }

    return atJobs;
  } catch (err) {
    logger.error(err);
    return [];
  }
}
