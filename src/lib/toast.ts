import { writable } from 'svelte/store';

export type Toast = {
  id: number;
  message: string;
  tone: 'success' | 'error';
};

export const toasts = writable<Toast[]>([]);

let nextId = 0;

export function pushToast(
  message: string,
  tone: Toast['tone'] = 'success',
  durationMs = 2200
): void {
  const id = ++nextId;
  toasts.update((list) => [...list, { id, message, tone }]);
  setTimeout(() => {
    toasts.update((list) => list.filter((t) => t.id !== id));
  }, durationMs);
}
