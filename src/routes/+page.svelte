<script lang="ts">
  import { CATEGORIES, MENU_ITEMS, RESTAURANT } from '$lib/data';
  import { cart, openCart } from '$lib/cart';
  import { formatPrice } from '$lib/format';
  import { isOpenNow } from '$lib/hours';
  import { pushToast } from '$lib/toast';
  import type { MenuItem } from '$lib/types';

  let activeCategory: string = 'todas';
  let searchQuery = '';
  let showOnlyPopular = false;
  const open = isOpenNow();

  function normalize(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  $: filtered = MENU_ITEMS.filter((item) => {
    if (activeCategory !== 'todas' && item.categoryId !== activeCategory) {
      return false;
    }
    if (showOnlyPopular && !item.popular) return false;
    if (searchQuery.trim()) {
      const q = normalize(searchQuery.trim());
      const haystack = normalize(item.name + ' ' + item.description);
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  $: categoriesWithCount = CATEGORIES.map((c) => ({
    ...c,
    count: MENU_ITEMS.filter((i) => i.categoryId === c.id).length
  }));

  $: totalItems = $cart.reduce((sum, item) => sum + item.qty, 0);

  $: cartQtyMap = $cart.reduce<Record<string, number>>((acc, item) => {
    acc[item.id] = item.qty;
    return acc;
  }, {});

  $: hasActiveFilter =
    activeCategory !== 'todas' || searchQuery.trim() !== '' || showOnlyPopular;

  function addItem(item: MenuItem) {
    cart.add(item);
    pushToast(`${item.name} adicionado`);
  }

  function clearFilters() {
    searchQuery = '';
    activeCategory = 'todas';
    showOnlyPopular = false;
  }
</script>

<section class="border-b border-border bg-cream">
  <div class="container-x py-12 md:py-16">
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <span
          class="h-2 w-2 rounded-full {open ? 'bg-green-500' : 'bg-red-400'}"
        ></span>
        <span
          class="text-xs uppercase tracking-widest {open
            ? 'text-green-700'
            : 'text-red-600'}"
        >
          {open ? 'Aberto agora' : 'Fechado no momento'}
        </span>
      </div>

      <h1
        class="max-w-3xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl"
      >
        Massa fresca, entrega rápida, pedido direto no WhatsApp.
      </h1>

      <p class="max-w-xl text-muted">
        {RESTAURANT.description}
      </p>

      <div class="mt-2 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
        <span>{RESTAURANT.hoursText}</span>
        <span>
          Pedido mínimo {formatPrice(RESTAURANT.minOrderBRL)}
        </span>
      </div>
    </div>
  </div>
</section>

<section
  class="sticky top-16 z-20 border-b border-border bg-cream/95 backdrop-blur-md"
>
  <div class="container-x py-3">
    <div class="flex flex-col gap-3">
      <div class="flex gap-2">
        <div class="relative flex-1">
          <span
            class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
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
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
          <input
            bind:value={searchQuery}
            type="search"
            placeholder="Buscar no cardápio..."
            class="w-full rounded-full border border-border bg-surface py-2 pl-10 pr-4 text-sm text-ink outline-none focus:border-primary"
          />
        </div>
        <button
          type="button"
          on:click={() => (showOnlyPopular = !showOnlyPopular)}
          class="whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition {showOnlyPopular
            ? 'border-accent bg-accent text-ink'
            : 'border-border bg-surface text-ink hover:border-accent'}"
        >
          ⭐ Populares
        </button>
      </div>

      <div class="scrollbar-hide flex gap-2 overflow-x-auto">
        <button
          type="button"
          on:click={() => (activeCategory = 'todas')}
          class="whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition {activeCategory ===
          'todas'
            ? 'border-primary bg-primary text-white'
            : 'border-border bg-surface text-ink hover:border-primary hover:text-primary'}"
        >
          Todos
        </button>
        {#each categoriesWithCount as cat (cat.id)}
          <button
            type="button"
            on:click={() => (activeCategory = cat.id)}
            class="whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition {activeCategory ===
            cat.id
              ? 'border-primary bg-primary text-white'
              : 'border-border bg-surface text-ink hover:border-primary hover:text-primary'}"
          >
            {cat.emoji} {cat.name}
            <span class="ml-1 opacity-70">({cat.count})</span>
          </button>
        {/each}
      </div>
    </div>
  </div>
</section>

<section class="py-10">
  <div class="container-x">
    {#if filtered.length === 0}
      <div
        class="flex flex-col items-center gap-3 py-16 text-center"
      >
        <span class="text-5xl">🔍</span>
        <p class="font-display text-lg text-ink">
          Nenhum item encontrado
        </p>
        <p class="text-sm text-muted">
          Tente outro termo ou limpe os filtros.
        </p>
        {#if hasActiveFilter}
          <button
            type="button"
            on:click={clearFilters}
            class="mt-2 rounded-full border border-primary px-5 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
          >
            Limpar filtros
          </button>
        {/if}
      </div>
    {:else}
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {#each filtered as item (item.id)}
          <article
            class="flex flex-col rounded-xl border border-border bg-surface p-5 transition hover:border-primary/40 hover:shadow-sm"
          >
            <div class="flex items-start justify-between">
              {#if item.image}
                <img
                  src={item.image}
                  alt={item.name}
                  class="h-16 w-16 rounded-lg object-cover"
                />
              {:else}
                <span class="text-4xl">{item.emoji}</span>
              {/if}
              {#if item.popular}
                <span
                  class="rounded-full bg-accent/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink"
                >
                  Mais pedido
                </span>
              {/if}
            </div>

            <h3 class="mt-3 font-display text-lg font-semibold text-ink">
              {item.name}
            </h3>
            <p class="mt-1 text-sm text-muted">{item.description}</p>

            <div
              class="mt-4 flex items-center justify-between border-t border-border pt-4"
            >
              <span class="font-display text-lg font-semibold text-primary">
                {formatPrice(item.priceBRL)}
              </span>
              <div class="flex items-center gap-2">
                {#if cartQtyMap[item.id]}
                  <span
                    class="flex h-7 min-w-[28px] items-center justify-center rounded-full bg-accent/20 px-2 text-xs font-bold text-ink"
                  >
                    {cartQtyMap[item.id]}x
                  </span>
                {/if}
                <button
                  type="button"
                  on:click={() => addItem(item)}
                  class="rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-primary"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </div>
</section>

{#if totalItems > 0}
  <button
    type="button"
    on:click={openCart}
    class="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark sm:hidden"
  >
    <span>Ver carrinho</span>
    <span class="rounded-full bg-white/20 px-2 py-0.5 text-xs">
      {totalItems}
    </span>
  </button>
{/if}
