<script>
  export let card;
  export let count;
</script>

<style>
.card {
  display: flex;
  margin: 0.5em;
}

h3 {
  margin: 0 0.5em;
  width: 10em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

blockquote {
  display: none;
}

.count,
.cost,
.attack,
.health {
  display: inline-block;
  width: 2em;
  height: 2em;
  font-size: 80%;
  text-align: center;
  color: whitesmoke;
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

<div class="card">
  <span class="count">{count || ''}</span>

  <h3 title={card.name}>{card.name}</h3>

  <blockquote>{@html card.text}</blockquote>

  <span class="cost">{card.cost || ''}</span>
  <span class="attack">{card.attack || '-'}</span>
  <span class="health">{card.health || card.durability || '-'}</span>
</div>
