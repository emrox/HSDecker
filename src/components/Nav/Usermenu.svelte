<script>
  import firebase from 'firebase/app';
  import { currentUser } from '../../stores/currentUser.store';

  export const logout = (event) => {
    event.preventDefault();

    firebase.auth().signOut().then(() => {
      window.location.href = '/';
    });
  }
</script>

<li class="nav-item dropdown">
  <a class="nav-link dropdown-toggle" href="/" id="navbarDropdownUsermenu" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    {$currentUser.email}
  </a>

  <div class="dropdown-menu" aria-labelledby="navbarDropdownUsermenu">
    <a class="dropdown-item" href="/" on:click={logout}>Logout</a>
  </div>
</li>
