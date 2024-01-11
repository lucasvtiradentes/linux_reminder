import { asyncExec } from '../utils/async_exec';

export async function checkIfNeededBinExists() {
  await asyncExec('which at');
  await asyncExec('which node');
}

export async function getNodejsPath() {
  try {
    return (await asyncExec('which node')).stdout;
  } catch {
    return 'node';
  }
}
