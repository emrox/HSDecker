<script>
  export let segment;
</script>

<style>
  .dropdown-menu-login {
    width: 300px;
  }
</style>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">HSDecker</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item" class:active={segment === undefined}><a class="nav-link" href="/">home</a></li>
      <li class="nav-item" class:active={segment === 'deck'}><a class="nav-link" href="deck">deck</a></li>

      <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
          the blog data when we hover over the link or tap it on a touchscreen -->
      <li class="nav-item" class:active={segment === 'blog'}><a class="nav-link" href="blog">blog</a></li>
    </ul>

    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="/" id="navbarDropdownLogin" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          login
        </a>

        <div class="dropdown-menu dropdown-menu-right dropdown-menu-login" aria-labelledby="navbarDropdownLogin">
          <form class="px-4 py-8">
            <div class="form-group">
              <label for="exampleDropdownFormEmail1">Email address</label>
              <input type="email" class="form-control" placeholder="email@example.com">
            </div>

            <div class="form-group">
              <label for="exampleDropdownFormPassword1">Password</label>
              <input type="password" class="form-control" placeholder="Password">
            </div>

            <button type="submit" class="btn btn-primary">Register</button>
          </form>
        </div>
      </li>
    </ul>
  </div>
</nav>
