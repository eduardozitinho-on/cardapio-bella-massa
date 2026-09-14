import { RESTAURANT } from './data';

export function isOpenNow(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  return (
    !RESTAURANT.closedDays.includes(day) &&
    hour >= RESTAURANT.openHour &&
    hour < RESTAURANT.closeHour
  );
}

export function hoursLabel(): string {
  return isOpenNow() ? 'Aberto agora' : 'Fechado no momento';
}
