import { z } from 'zod';

const reminderItemSchema = z.object({
  name: z.string(),
  category: z.string(),
  time: z.string().length(5),
  days: z.enum(['weekday', 'weekend', 'everyday'])
});

export type TReminderItem = z.infer<typeof reminderItemSchema>;

const optionsSchema = z
  .object({
    playTextToSpeech: z.boolean(),
    notificationExpireTime: z.number(),
    useZenitAsNotifierSender: z.boolean()
  })
  .partial();

export type TOptions = z.infer<typeof optionsSchema>;

export const configsSchema = z.object({
  options: optionsSchema,
  reminders: z.array(reminderItemSchema)
});

export type TConfigs = z.infer<typeof configsSchema>;
