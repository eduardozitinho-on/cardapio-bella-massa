<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cart, cartOpen, closeCart } from '$lib/cart';
  import { NEIGHBORHOODS, PAYMENT_METHODS, RESTAURANT } from '$lib/data';
  import { formatPrice } from '$lib/format';
  import { maskPhone, isValidPhone } from '$lib/phone';
  import { buildWhatsAppUrl } from '$lib/whatsapp';
  import { pushToast } from '$lib/toast';
  import type { Neighborhood } from '$lib/types';

  let customerName = '';
  let customerPhoneRaw = '';
  let address = '';
  let neighborhood: Neighborhood = NEIGHBORHOODS[0];
  let paymentMethod = PAYMENT_METHODS[0];
  let notes = '';
  let error: string | null = null;
  let drawerEl: HTMLElement;

  $: customerPhone = maskPhone(customerPhoneRaw);
  $: subtotal = $cart.reduce((sum, item) => sum + item.priceBRL * item.qty, 0);
  $: fee = neighborhood.feeBRL;
  $: total = subtotal + fee;
  $: belowMin = subtotal > 0 && subtotal < RESTAURANT.minOrderBRL;

  $: lockScroll($cartOpen);
  $: if ($cartOpen && drawerEl) drawerEl.focus();

  function lockScroll(open: boolean) {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = open ? 'hidden' : '';
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') closeCart();
  }

  function handleBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) closeCart();
  }

  function handleSubmit() {
    error = null;

    if ($cart.length === 0) {
      error = 'Adicione pelo menos um item ao pedido.';
      return;
    }
    if (belowMin) {
      error = `Pedido mínimo de ${formatPrice(RESTAURANT.minOrderBRL)}.`;
      return;
    }
    if (customerName.trim().length < 2) {
      error = 'Informe seu nome completo.';
      return;
    }
    if (!isValidPhone(customerPhone)) {
      error = 'Informe um telefone válido com DDD.';
      return;
    }
    if (address.trim().length < 5) {
      error = 'Informe o endereço completo com número.';
      return;
    }

    const url = buildWhatsAppUrl({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      address: address.trim(),
      neighborhood,
      paymentMethod,
      notes,
      items: $cart
    });

    window.open(url, '_blank');
    pushToast('Pedido enviado! Confira o WhatsApp.');
    cart.clear();
    customerName = '';
    customerPhoneRaw = '';
    address = '';
    notes = '';
    neighborhood = NEIGHBORHOODS[0];
    paymentMethod = PAYMENT_METHODS[0];
    closeCart();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $cartOpen}
  <div
    class="fixed inset-0 z-50 flex justify-end bg-ink/40 backdrop-blur-sm"
    on:click={handleBackdrop}
    on:keydown={(e) => e.key === 'Escape' && closeCart()}
    transition:fade={{ duration: 150 }}
    role="presentation"
  >
    <aside
      bind:this={drawerEl}
      tabindex="-1"
      in:fly={{ x: 400, duration: 250 }}
      out:fly={{ x: 400, duration: 200 }}
      class="flex h-full w-full max-w-md flex-col bg-cream shadow-2xl outline-none"
      role="dialog"
      aria-modal="true"
      aria-label="Carrinho de compras"
    >
      <header
        class="flex items-center justify-between border-b border-border px-6 py-4"
      >
        <div>
          <h2 class="font-display text-xl font-semibold text-ink">
            Seu pedido
          </h2>
          <p class="text-xs text-muted">
            {$cart.reduce((s, i) => s + i.qty, 0)} item(ns)
          </p>
        </div>
        <button
          type="button"
          on:click={closeCart}
          aria-label="Fechar carrinho"
          class="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition hover:border-primary hover:text-primary"
        >
          ✕
        </button>
      </header>

      {#if $cart.length === 0}
        <div
          class="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center"
        >
          <span class="text-5xl">🛒</span>
          <p class="font-display text-lg text-ink">Seu carrinho está vazio</p>
          <p class="text-sm text-muted">
            Adicione itens do cardápio para começar.
          </p>
        </div>
      {:else}
        <div class="flex-1 overflow-y-auto px-6 py-5">
          <ul class="flex flex-col gap-3">
            {#each $cart as item (item.id)}
              <li
                class="flex items-start gap-4 rounded-lg border border-border bg-surface p-4"
              >
                {#if item.image}
                  <img
                    src={item.image}
                    alt={item.name}
                    class="h-12 w-12 rounded-md object-cover"
                  />
                {:else}
                  <span class="text-2xl">{item.emoji}</span>
                {/if}
                <div class="flex-1">
                  <p class="font-medium text-ink">{item.name}</p>
                  <p class="text-xs text-muted">
                    {formatPrice(item.priceBRL)} · un
                  </p>
                  <div class="mt-2 flex items-center gap-3">
                    <button
                      type="button"
                      on:click={() => cart.decrement(item.id)}
                      class="flex h-7 w-7 items-center justify-center rounded-full border border-border text-ink transition hover:border-primary hover:text-primary"
                      aria-label="Diminuir"
                    >
                      −
                    </button>
                    <span class="w-6 text-center text-sm font-semibold">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      on:click={() => cart.add(item)}
                      class="flex h-7 w-7 items-center justify-center rounded-full border border-border text-ink transition hover:border-primary hover:text-primary"
                      aria-label="Aumentar"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      on:click={() => cart.remove(item.id)}
                      class="ml-auto text-xs text-muted underline-offset-2 hover:text-primary hover:underline"
                    >
                      Remover
                    </button>
                  </div>
                </div>
                <p class="text-sm font-semibold text-primary">
                  {formatPrice(item.priceBRL * item.qty)}
                </p>
              </li>
            {/each}
          </ul>

          <div class="mt-8 border-t border-border pt-6">
            <h3 class="font-display text-lg font-semibold text-ink">
              Dados para entrega
            </h3>

            <div class="mt-4 flex flex-col gap-4">
              <label class="flex flex-col gap-1.5">
                <span class="text-xs uppercase tracking-widest text-muted">
                  Nome completo
                </span>
                <input
                  bind:value={customerName}
                  type="text"
                  placeholder="Ex.: João da Silva"
                  class="rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary"
                />
              </label>

              <label class="flex flex-col gap-1.5">
                <span class="text-xs uppercase tracking-widest text-muted">
                  Telefone (WhatsApp)
                </span>
                <input
                  bind:value={customerPhoneRaw}
                  type="tel"
                  inputmode="tel"
                  placeholder="(11) 99999-9999"
                  class="rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary"
                />
              </label>

              <label class="flex flex-col gap-1.5">
                <span class="text-xs uppercase tracking-widest text-muted">
                  Endereço completo
                </span>
                <input
                  bind:value={address}
                  type="text"
                  placeholder="Rua, número, complemento"
                  class="rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary"
                />
              </label>

              <label class="flex flex-col gap-1.5">
                <span class="text-xs uppercase tracking-widest text-muted">
                  Bairro
                </span>
                <select
                  bind:value={neighborhood}
                  class="rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary"
                >
                  {#each NEIGHBORHOODS as hood (hood.name)}
                    <option value={hood}>{hood.name}</option>
                  {/each}
                </select>
                {#if neighborhood.note}
                  <span
                    class="mt-1 rounded-md border border-amber-400/50 bg-amber-50 px-3 py-1.5 text-[11px] text-amber-800"
                  >
                    {neighborhood.note}
                  </span>
                {/if}
              </label>

              <label class="flex flex-col gap-1.5">
                <span class="text-xs uppercase tracking-widest text-muted">
                  Forma de pagamento
                </span>
                <select
                  bind:value={paymentMethod}
                  class="rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary"
                >
                  {#each PAYMENT_METHODS as method (method)}
                    <option value={method}>{method}</option>
                  {/each}
                </select>
              </label>

              <label class="flex flex-col gap-1.5">
                <span class="text-xs uppercase tracking-widest text-muted">
                  Observações (opcional)
                </span>
                <textarea
                  bind:value={notes}
                  rows="2"
                  placeholder="Ex.: sem cebola, ponto da carne..."
                  class="rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary"
                ></textarea>
              </label>
            </div>
          </div>
        </div>

        <footer class="border-t border-border bg-surface px-6 py-5">
          <div class="flex flex-col gap-1 text-sm">
            <div class="flex justify-between text-muted">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div class="flex justify-between text-muted">
              <span>Taxa de entrega</span>
              <span>{formatPrice(fee)}</span>
            </div>
            <div
              class="mt-2 flex justify-between border-t border-border pt-2 font-display text-lg font-semibold text-ink"
            >
              <span>Total</span>
              <span class="text-primary">{formatPrice(total)}</span>
            </div>
          </div>

          {#if belowMin}
            <p
              class="mt-3 rounded-md border border-amber-400/50 bg-amber-50 px-3 py-2 text-xs text-amber-800"
            >
              Pedido mínimo de {formatPrice(RESTAURANT.minOrderBRL)}. Faltam
              {formatPrice(RESTAURANT.minOrderBRL - subtotal)}.
            </p>
          {/if}

          {#if error}
            <p
              class="mt-3 rounded-md border border-red-400/50 bg-red-50 px-3 py-2 text-xs text-red-700"
            >
              {error}
            </p>
          {/if}

          <button
            type="button"
            on:click={handleSubmit}
            disabled={belowMin}
            class="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            Enviar pedido no WhatsApp
          </button>
          <p class="mt-2 text-center text-[10px] text-muted">
            Você será redirecionado para o WhatsApp com o pedido pronto.
          </p>
        </footer>
      {/if}
    </aside>
  </div>
{/if}
