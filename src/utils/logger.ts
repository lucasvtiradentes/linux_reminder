const DEBUG_MODE = true;

export const logger = {
  info: (message: any, ...optionalParams: any[]) => {
    console.log(message, ...optionalParams);
  },
  error: (message: any, ...optionalParams: any[]) => {
    if (DEBUG_MODE) {
      console.trace(message, ...optionalParams);
    }
  }
};
