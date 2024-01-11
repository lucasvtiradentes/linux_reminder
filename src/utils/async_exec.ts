import { exec } from 'node:child_process';

type TAsyncExec = {
  stderr: string;
  stdout: string;
};

export function asyncExec(command: string): Promise<TAsyncExec> {
  return new Promise(function (resolve, reject) {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }

      resolve({
        stderr,
        stdout: stdout.trim()
      });
    });
  });
}
