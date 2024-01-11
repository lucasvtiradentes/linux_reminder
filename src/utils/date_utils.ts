export const getTodayDayOfTheWeek = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  return dayOfWeek;
};

export function isCurrentTimeBefore(targetTime: string): boolean {
  const now = new Date();

  const [targetHour, targetMinute] = targetTime.split(':').map(Number);
  const targetDateTime = new Date(now);
  targetDateTime.setHours(targetHour, targetMinute, 0, 0);

  return now < targetDateTime;
}
