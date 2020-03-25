<script>
  import firebase from 'firebase/app';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export const register = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.querySelector('[type="email"]').value;
    const password = form.querySelector('[type="password"]').value;
    const alertBox = form.querySelector('.alert');

    alertBox.classList.add('d-none');

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(({ code, message }) => {
      alertBox.innerText = message;
      alertBox.classList.remove('d-none');
    });
  }

  const showLogin = () => {
    dispatch('toggleAuthmenu');
  };
</script>

<form class="px-4 py-8" on:submit={register}>
  <h5>Register</h5>

  <div class="form-group">
    <label for="exampleDropdownFormEmail1">Email address</label>
    <input type="email" class="form-control" placeholder="email@example.com">
  </div>

  <div class="form-group">
    <label for="exampleDropdownFormPassword1">Password</label>
    <input type="password" class="form-control" placeholder="Password">
  </div>

  <div class="alert alert-danger d-none" role="alert" />

  <button type="submit" class="btn btn-primary btn-sm">Register</button>
  <button type="button" on:click={showLogin} class="btn btn-outline-secondary btn-sm">Already have an account?</button>
</form>
