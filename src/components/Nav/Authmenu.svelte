<script>
  import Register from './Register.svelte';
  import Login from './Login.svelte';

  let showRegister;

  const toggleAuthmenu = () => {
    showRegister = !showRegister;
  }
</script>

<style>
  .dropdown-menu-login {
    width: 300px;
  }
</style>

<li class="nav-item dropdown">
  <a class="nav-link dropdown-toggle" href="/" id="navbarDropdownAuth" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    login
  </a>

  <div class="dropdown-menu dropdown-menu-right dropdown-menu-login" aria-labelledby="navbarDropdownAuth">
    <div style="display: {showRegister ? 'block' : 'none'}">
      <Register on:toggleAuthmenu={toggleAuthmenu} />
    </div>
    <div style="display: {showRegister ? 'none' : 'block'}">
      <Login on:toggleAuthmenu={toggleAuthmenu} />
    </div>
  </div>
</li>
