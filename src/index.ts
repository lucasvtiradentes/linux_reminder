#! /usr/bin/env node

import { program } from 'commander';
import { platform } from 'node:os';
import { listCommand } from './cli_commands/list';
import { setupCommand } from './cli_commands/setup';
import { removeCommand } from './cli_commands/remove';
import { APP_CONSTS } from './consts/app_data';
import { CONFIGS } from './consts/configs';
import { ERRORS } from './consts/errors';
import { configsSchema } from './schemas/configs.schema';
import { readJson } from './utils/read_json';

type TProgramOptions = {
  setup: string;
  remove: boolean;
  list: boolean;
};

function setupProgramConfigs() {
  program.name(APP_CONSTS.name).version(APP_CONSTS.version).description(APP_CONSTS.description);

  // prettier-ignore
  program
    .option('-s, --setup <file>', 'setup the reminders to run on the specified datetimes')
    .option('-r, --remove', 'remove all configured reminders')
    .option('-l, --list', 'list all configured reminders')

  return program;
}

async function validateFileConfig(file: string) {
  const json = readJson(file);
  const parsedData = configsSchema.parse(json);
  CONFIGS.updateOptions(parsedData.options);

  return parsedData;
}

async function main() {
  const program = setupProgramConfigs().parse();
  const options = program.opts() satisfies TProgramOptions;

  if (platform() !== 'linux') {
    throw new Error(ERRORS.invalid_os);
  }

  if (options.remove) {
    await removeCommand();
    return;
  }

  if (options.list) {
    await listCommand();
    return;
  }

  if (options.setup) {
    const parsedConfigsData = await validateFileConfig(options.setup);
    await setupCommand(parsedConfigsData);
    return;
  }

  program.help();
}

main();
