import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import type { CartItem, MenuItem } from './types';

function createCartStore() {
  const initial: CartItem[] = browser
    ? JSON.parse(localStorage.getItem('bm_cart') || '[]')
    : [];
  const { subscribe, set, update } = writable<CartItem[]>(initial);

  if (browser) {
    subscribe((items) => {
      localStorage.setItem('bm_cart', JSON.stringify(items));
    });
  }

  return {
    subscribe,
    add(item: MenuItem) {
      update((items) => {
        const existing = items.find((i) => i.id === item.id);
        if (existing) {
          return items.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
          );
        }
        return [...items, { ...item, qty: 1 }];
      });
    },
    decrement(id: string) {
      update((items) =>
        items
          .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
          .filter((i) => i.qty > 0)
      );
    },
    remove(id: string) {
      update((items) => items.filter((i) => i.id !== id));
    },
    clear() {
      set([]);
    }
  };
}

export const cart = createCartStore();
export const cartOpen = writable(false);

export function openCart() {
  cartOpen.set(true);
}

export function closeCart() {
  cartOpen.set(false);
}

export function cartSubtotal(): number {
  return get(cart).reduce((sum, item) => sum + item.priceBRL * item.qty, 0);
}
