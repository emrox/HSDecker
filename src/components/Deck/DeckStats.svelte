<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js';

  export let deck;

  let raritySvg;
  let rarityStats = { 'FREE': 0, 'COMMON': 0, 'RARE': 0, 'EPIC': 0, 'LEGENDARY': 0 };
  let typeStats = { 'MINION': 0, 'SPELL': 0, 'WEAPON': 0, 'HERO': 0 };

  const rarityColors = ['214, 213, 213', '172, 172, 172', '24, 125, 223', '169, 64, 237', '255, 133, 12'];
  const typeColors = ['178, 214, 124', '21, 122, 223', '204, 63, 87', '169, 64, 237'];

  deck.forEach(({ card, count }) => {
    rarityStats[card.rarity] += count;
    typeStats[card.type] += count;
  });

  const rarityStatsData = Object.entries(rarityStats).map(([name, count]) => ({ name, count }));
  const typeStatsData = Object.entries(typeStats).map(([name, count]) => ({ name, count }));

  const drawChart = (element, labels, datapoints, baseColors) => {
    new Chart(
      element,
      {
        type: 'pie',
        data: {
            labels: labels.map((label, index) => `${datapoints[index]} ${label}`),
            datasets: [{
                data: datapoints.map((dp) => dp > 0 ? dp : undefined),
                backgroundColor: baseColors.map((c) => `rgba(${c}, 0.4)`),
                borderColor: baseColors.map((c) => `rgba(${c}, 1)`),
                borderWidth: 1
            }]
        },
        options: {
          responsive: false,
        },
      },
    );
  };

  onMount(() => {
    drawChart(
      document.getElementById('rarityChart'),
      rarityStatsData.map((r) => r.name),
      rarityStatsData.map((r) => r.count),
      rarityColors,
    );

    drawChart(
      document.getElementById('typeChart'),
      typeStatsData.map((t) => t.name),
      typeStatsData.map((t) => t.count),
      typeColors,
    );
  });
</script>

<canvas id="rarityChart" width="300" height="200"></canvas>
<canvas id="typeChart" width="300" height="200"></canvas>
