<script>
  import { goto } from '@sapper/app';

  const gotoDeck = (event) => {
    event.preventDefault();
    
    const deckCode = document.querySelector('#gotoDeckInput').value.split("\n").find((line) => line.trim().length && !line.trim().startsWith('#'));

    if (!deckCode) { return; }
    
    goto(`/deck/${deckCode}`);
  }
</script>

<style>
  textarea {
    display: block;
    width: 400px;
    height: 300px;
  }
</style>

<form on:submit={gotoDeck}>
  <textarea id="gotoDeckInput"></textarea>
  <input type="submit" />
</form>
