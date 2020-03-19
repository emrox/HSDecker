<script context="module">
  export async function preload(page, session) {
    const cardsRes = await this.fetch('data/cards.json');
    const allCards = await cardsRes.json();

    const cards = allCards.reduce((acc, card) => {
      if (
        card.collectible &&
        (
          (card.type === 'HERO' && card.cost) ||
          (card.type === 'MINION') ||
          (card.type === 'SPELL') ||
          (card.type === 'WEAPON')
        )
      ) {
        acc.push(card)
      }

      return acc
    }, [])

    return { cards }
  }
</script>

<script>
  export let cards;

  export const randomDeck = cards.sort(() => 0.5 - Math.random()).slice(0, 30)
</script>

<style>
</style>

<svelte:head>
	<title>HSdecker</title>
</svelte:head>

<h1>Random Deck</h1>

<ul>
  {#each randomDeck as card}
    <li class="card">
      <h3>{card.name}</h3>
      <blockquote>{@html card.flavor}</blockquote>
      {#if card.cost}<span class="card__cost">{card.cost}</span>{/if}
      {#if card.attack}<span class="card__attack">{card.attack}</span>{/if}
      {#if card.durability}<span class="card__durability">{card.durability}</span>{/if}
    </li>
  {/each}
</ul>
