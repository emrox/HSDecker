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
</script>

<style>
</style>

<svelte:head>
	<title>HSdecker</title>
</svelte:head>

<h1>Hello World {cards}</h1>
