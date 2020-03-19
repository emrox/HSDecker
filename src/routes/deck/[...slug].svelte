<script context="module">
  import { encode, decode, FormatType } from 'deckstrings';

  export async function preload(page, session) {
    const { slug } = page.params;
    const deckCode = slug.join('/');

    return { deckCode };
  }
</script>

<script>
  export let deckCode;
</script>

<h1>{deckCode}</h1>
