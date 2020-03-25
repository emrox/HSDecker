<script>
  import firebase from 'firebase/app';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const login = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.querySelector('[type="email"]').value;
    const password = form.querySelector('[type="password"]').value;
    const alertBox = form.querySelector('.alert');

    alertBox.classList.add('d-none');

    firebase.auth().signInWithEmailAndPassword(email, password).catch(({ code, message }) => {
      alertBox.innerText = message;
      alertBox.classList.remove('d-none');
    });
  };

  const showRegister = () => {
    dispatch('toggleAuthmenu');
  };
</script>

<form class="px-4 py-8" on:submit={login}>
  <h5>Login</h5>

  <div class="form-group">
    <label for="exampleDropdownFormEmail1">Email address</label>
    <input type="email" class="form-control" placeholder="email@example.com">
  </div>

  <div class="form-group">
    <label for="exampleDropdownFormPassword1">Password</label>
    <input type="password" class="form-control" placeholder="Password">
  </div>

  <div class="alert alert-danger d-none" role="alert" />

  <button type="submit" class="btn btn-primary btn-sm">Login</button>

  <button type="button" on:click={showRegister} class="btn btn-outline-secondary btn-sm">Register new account</button>
</form>
