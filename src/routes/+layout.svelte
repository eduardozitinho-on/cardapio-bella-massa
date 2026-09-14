<script lang="ts">
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import CartDrawer from '$lib/components/CartDrawer.svelte';
  import Toast from '$lib/components/Toast.svelte';
  import { RESTAURANT } from '$lib/data';
</script>

<svelte:head>
  <title>{RESTAURANT.name} — {RESTAURANT.tagline}</title>
  <meta
    name="description"
    content="Peça pizza, lanches e porções pelo WhatsApp. Entrega em Suzano e região."
  />
  <meta property="og:title" content="{RESTAURANT.name} — {RESTAURANT.tagline}" />
  <meta
    property="og:description"
    content="Cardápio digital com pedido pelo WhatsApp. Sem app, sem cadastro."
  />
  <meta property="og:type" content="website" />
</svelte:head>

<Header />
<main>
  <slot />
</main>
<Footer />
<CartDrawer />
<Toast />
