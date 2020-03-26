<script>
  import tippy from 'tippy.js';
  import { onMount } from 'svelte';

  export let card;
  export let count = null;

  onMount(async () => {
    tippy(`#card-${card.id}`, {
      content: `<img src="https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${card.id}.png" />`,
      allowHTML: true,
      delay: [0, 0],
      duration: 0
    });
  });
</script>

<style>
.list-card {
  display: inline-flex;
  margin: 0;
  text-shadow: -1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000;
  font-weight: bold;
  font-size: 12px;
  line-height: 26px;
  border: 1px solid #000;
}

h3 {
  position: relative;
  margin: 0;
  width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
}

.list-card.type--spell h3 {
  width: 252px;
}

h3 .fadeout {
  cursor: default;
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 2px 7px;
  font-size: 16px;
  background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 75%);
}

.count,
.cost,
.attack,
.health {
  display: inline-block;
  width: 26px;
  height: 26px;
  text-align: center;
  color: whitesmoke;
  cursor: default;
}

.count,
.attack,
.health {
  border-left: 1px solid #000;
}
.count {
  background-color: #313131;
}

.cost {
  background-color: darkgreen;
}

.attack {
  background-color: olive;
}

.health {
  background-color: darkred;
}

.rarity--free { background-color: #858585; }
.rarity--common { background-color: #858585; }
.rarity--rare { background-color: #315376; }
.rarity--epic { background-color: #644c82; }
.rarity--legendary { background-color: #855c25; }
</style>

<div class="list-card type--{card.type.toLowerCase()}" id="card-{card.id}">
  <span class="cost rarity--{card.rarity.toLowerCase()}" title={card.rarity}>{card.cost || '0'}</span>

  <h3 title={card.name} style="background-image: url('/tiles/Tiles/{card.id}.png')">
    <div class="fadeout">
      {card.name}
    </div>
  </h3>

  {#if card.type !== 'SPELL'}
    <span class="attack">{card.attack || '0'}</span>
    <span class="health">{card.health || card.durability || '-'}</span>
  {/if}

  {#if count}
    <span class="count">{card.rarity === 'LEGENDARY' ? '⭐' : count }</span>
  {/if}
</div>
