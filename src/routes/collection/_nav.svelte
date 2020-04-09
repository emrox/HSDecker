<script>
  export let activeHeroClass;

  const heroClasses = {
    'demonhunter': 'Demon Hunter',
    'druid': 'Druid',
    'hunter': 'Hunter',
    'mage': 'Mage',
    'paladin': 'Paladin',
    'priest': 'Priest',
    'rogue': 'Rogue',
    'shaman': 'Shaman',
    'warlock': 'Warlock',
    'warrior': 'Warrior',
    'neutral': 'Neutral',
  };
</script>

<style>
  .class-icon {
    margin: 2px;
    width: 28px;
    height: 28px;
    border: 2px solid #4C3723;
    border-radius: 50%;
  }

  .nav-link:hover .class-icon,
  .active .class-icon {
    margin: 0;
    width: 32px;
    height: 32px;
  }

  .active .class-icon {
    border: 3px solid #D6A45B;
  }
</style>

<nav>
  <ul class="nav nav-tabs">
    {#each Object.entries(heroClasses) as [heroClassIdentifier, heroClassName]}
      <li class="nav-item">
        <a href="/collection/{heroClassIdentifier}" class="nav-link" class:active={heroClassIdentifier === activeHeroClass} title={heroClassName}>
          <img src="/img/classes/{heroClassIdentifier}.png" alt={heroClassName} class="class-icon" />
        </a>
      </li>
    {/each}
  </ul>
</nav>
