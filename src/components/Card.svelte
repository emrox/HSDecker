<script>
  import tippy from 'tippy.js';
  import { onMount } from 'svelte';

  export let card;
  export let count;

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
.card {
  display: inline-flex;
  margin: 0.1em;
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

h3 .fadeout {
  cursor: default;
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 2px 7px;
  font-size: 16px;
  background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 75%);
}

blockquote {
  display: none;
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
}

.cost,
.attack,
.health {
  border-left: 1px solid #000;
}
.count {
  background-color: darkblue;
}

.cost {
  background-color: darkgreen;
}

.attack {
  background-color: darkred;
}

.health {
  background-color: olive;
}
</style>

<div class="card" id="card-{card.id}">
  <span class="count">{count || ''}</span>

  <h3 title={card.name} style="background-image: url('/tiles/Tiles/{card.id}.png')">
    <div class="fadeout">
      {card.name}
    </div>
  </h3>

  <blockquote>{@html card.text}</blockquote>

  <span class="cost">{card.cost || '0'}</span>
  <span class="attack">{card.attack || '-'}</span>
  <span class="health">{card.health || card.durability || '-'}</span>
</div>
