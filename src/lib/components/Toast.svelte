<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { toasts } from '$lib/toast';
</script>

<div
  class="pointer-events-none fixed left-1/2 top-20 z-[60] flex -translate-x-1/2 flex-col items-center gap-2"
>
  {#each $toasts as toast (toast.id)}
    <div
      in:fly={{ y: -12, duration: 200 }}
      out:fade={{ duration: 150 }}
      class="pointer-events-auto rounded-full px-5 py-2.5 text-sm font-medium shadow-lg {toast.tone ===
      'success'
        ? 'bg-ink text-white'
        : 'bg-red-600 text-white'}"
    >
      {toast.message}
    </div>
  {/each}
</div>
