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
  import Card from '../components/Card.svelte';

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
    <li>
      <Card card={card} />
    </li>
  {/each}
</ul>
