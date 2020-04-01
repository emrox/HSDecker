<script>
  export let deck;
  export const manaBlockHeight = 100;
  export let manaCurve = new Array(8).fill(0, 0, 8);

  deck.forEach(({card, count}) => {
    let cardCost = card.cost > 7 ? 7 : card.cost;

    manaCurve[cardCost] += count;
  }); 

  export const manaCurveMax = Array.from(manaCurve).sort().pop();
</script>

<style>
  .mana-curve {
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-end;
  }

  .mana-curve__step {
    margin-right: 5px;
    text-align: center;
  }

  .mana-curve__step__indicator {
    display: inline-block;
    width: 30px;
    background-color: #324c7d;
    border-bottom: 1px solid #324c7d;
  }

  .mana-curve__step__label {
    display: flex;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    text-shadow: -1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000;
    background-image: url('/img/mana_crystal.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    cursor: default;
  }
</style>

<div class="mana-curve">
  {#each manaCurve as manaCurveStepCount, manaCurveStepIndex}
    <div class="mana-curve__step mana-curve__step__{manaCurveStepIndex}">
      <div class="mana-curve__step__count">{manaCurveStepCount}</div>
      <div class="mana-curve__step__indicator" style="height: {(manaBlockHeight / manaCurveMax) * manaCurveStepCount}px" />
      <div class="mana-curve__step__label">{manaCurveStepIndex == 7 ? '7+' : manaCurveStepIndex}</div>
    </div>
  {/each}
</div>
