<script>
  import { currentUser } from '../../stores/currentUser.store';

  import Authmenu from './Authmenu.svelte';
  import Usermenu from './Usermenu.svelte';

  export let segment;
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">HSDecker</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item" class:active={segment === undefined}><a class="nav-link" href="/">home</a></li>
      <li class="nav-item" class:active={segment === 'deck'}><a class="nav-link" href="deck">deck</a></li>
      <li class="nav-item" class:active={segment === 'card'}><a class="nav-link" href="card">card</a></li>
      <li class="nav-item" class:active={segment === 'collection'}><a class="nav-link" href="collection">collection</a></li>

      <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
          the blog data when we hover over the link or tap it on a touchscreen -->
      <li class="nav-item" class:active={segment === 'blog'}><a class="nav-link" href="blog">blog</a></li>
    </ul>

    <ul class="navbar-nav">
      {#if $currentUser.status === 'in'}
        <Usermenu />
      {:else}
        <Authmenu />
      {/if}
    </ul>
  </div>
</nav>
