import { existsSync, readFileSync } from 'node:fs';
import { ERRORS } from '../consts/errors';

export function readJson(jsonPath: string): Record<string, unknown> {
  if (!existsSync(jsonPath)) {
    throw new Error(ERRORS.json_not_found(jsonPath));
  }

  try {
    const rawdata = readFileSync(jsonPath);
    const parsedData = JSON.parse(rawdata.toString());
    return parsedData;
  } catch {
    return {};
  }
}
