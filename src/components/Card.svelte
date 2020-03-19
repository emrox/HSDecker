<script>
	export let card;
</script>

<style>
</style>

<div class="card">
  <h3>{card.name}</h3>
  <blockquote>{@html card.flavor}</blockquote>
  {#if card.cost}<span class="card__cost">{card.cost}</span>{/if}
  {#if card.attack}<span class="card__attack">{card.attack}</span>{/if}
  {#if card.durability}<span class="card__durability">{card.durability}</span>{/if}
</div>
