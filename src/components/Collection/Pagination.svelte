<script>
  import { buildUrl } from '../../helper/url.js';

  const cardsPerPage = 8;

  export let activeHeroClass;
  export let classCards;
  export let currentPage;

  let prevPageLink;
  let nextPageLink;

  $: {
    const baseLink = `/collection/${activeHeroClass}`;

    prevPageLink = buildUrl(baseLink, { page: currentPage > 2 ? currentPage - 1 : undefined });
    nextPageLink = buildUrl(baseLink, { page: currentPage + 1 });
  }
</script>

<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" class:disabled={currentPage <= 1}>
      <a class="page-link" href="{prevPageLink}" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>

    <li class="page-item" class:disabled={currentPage * cardsPerPage > classCards.length}>
      <a class="page-link" href="{nextPageLink}" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
