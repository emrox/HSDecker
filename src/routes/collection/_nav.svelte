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
    width: 28px;
    height: 28px;
  }
</style>

<nav>
  <ul class="nav nav-pills">
    {#each Object.entries(heroClasses) as [heroClassIdentifier, heroClassName]}
      <li class="nav-item">
        <a href="/collection/{heroClassIdentifier}" class="nav-link" class:active={heroClassIdentifier === activeHeroClass}>
          <img src="/img/classes/{heroClassIdentifier}.png" alt={heroClassName} class="class-icon" />
          {heroClassName}
        </a>
      </li>
    {/each}
  </ul>
</nav>
