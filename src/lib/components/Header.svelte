<script lang="ts">
  import { cart, openCart } from '$lib/cart';
  import { RESTAURANT } from '$lib/data';
  import { isOpenNow } from '$lib/hours';

  $: totalItems = $cart.reduce((sum, item) => sum + item.qty, 0);
  $: open = isOpenNow();
</script>

<header class="sticky top-0 z-30 border-b border-border bg-cream/90 backdrop-blur-md">
  <div class="container-x flex h-16 items-center justify-between">
    <a href="/" class="flex items-center gap-3">
      <span
        class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg text-white shadow-sm"
      >
        🍕
      </span>
      <div class="leading-tight">
        <p class="font-display text-lg font-semibold text-ink">
          {RESTAURANT.name}
        </p>
        <p class="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted">
          <span class="h-1.5 w-1.5 rounded-full {open ? 'bg-green-500' : 'bg-red-400'}"></span>
          {open ? 'Aberto agora' : 'Fechado'}
        </p>
      </div>
    </a>

    <button
      type="button"
      on:click={openCart}
      class="relative flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark"
      aria-label="Abrir carrinho"
    >
      <svg
        viewBox="0 0 24 24"
        class="h-4 w-4"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path
          d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
        />
      </svg>
      <span class="hidden sm:inline">Carrinho</span>
      {#if totalItems > 0}
        <span
          class="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-ink"
        >
          {totalItems}
        </span>
      {/if}
    </button>
  </div>
</header>
