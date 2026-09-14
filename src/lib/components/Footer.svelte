<script lang="ts">
  import { RESTAURANT } from '$lib/data';
</script>

<footer class="border-t border-border bg-surface">
  <div class="container-x grid gap-8 py-12 sm:grid-cols-3">
    <div>
      <p class="font-display text-lg font-semibold text-ink">
        {RESTAURANT.name}
      </p>
      <p class="mt-2 text-sm text-muted">{RESTAURANT.description}</p>
    </div>
    <div>
      <p class="text-xs uppercase tracking-widest text-primary">Horário</p>
      <p class="mt-2 text-sm text-muted">{RESTAURANT.hoursText}</p>
      <p class="mt-1 text-sm text-muted">
        Pedido mínimo {RESTAURANT.minOrderBRL.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })}
      </p>
    </div>
    <div>
      <p class="text-xs uppercase tracking-widest text-primary">Contato</p>
      <p class="mt-2 text-sm text-muted">{RESTAURANT.address}</p>
      <p class="mt-1 text-sm text-muted">{RESTAURANT.instagram}</p>
    </div>
  </div>
  <div class="border-t border-border">
    <div
      class="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted sm:flex-row"
    >
      <p>
        © {new Date().getFullYear()} {RESTAURANT.name}. Site demonstrativo.
      </p>
      <p>Feito como portfólio — não representa estabelecimento real.</p>
    </div>
  </div>
</footer>
