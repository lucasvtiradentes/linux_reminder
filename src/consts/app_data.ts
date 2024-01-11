import { join } from 'node:path';
import { readJson } from '../utils/read_json';

const packageJsonPath = join(__dirname, '../../package.json');
const packageJson = readJson(packageJsonPath);

export const APP_CONSTS = {
  name: packageJson.name as string,
  version: packageJson.version as string,
  description: packageJson.description as string
} as const;
