import { TOptions } from '../schemas/configs.schema';

const INITIAL_CONFIGS = {
  playTextToSpeech: false,
  notificationExpireTime: 3000,
  useZenitAsNotifierSender: false
} satisfies Required<TOptions>;

class Configs {
  cronjob_prefix = 'LINUX_REMINDER_ITEM';
  options: Required<TOptions> = {
    playTextToSpeech: INITIAL_CONFIGS.playTextToSpeech,
    notificationExpireTime: INITIAL_CONFIGS.notificationExpireTime,
    useZenitAsNotifierSender: INITIAL_CONFIGS.useZenitAsNotifierSender
  };

  updateOptions(newOptions: TOptions) {
    this.options = {
      ...this.options,
      ...newOptions
    };
  }
}

export const CONFIGS = new Configs();
