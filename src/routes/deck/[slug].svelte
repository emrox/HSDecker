<script context="module">
  export async function preload(page, session) {
    const { slug } = page.params;

    return { slug };
  }
</script>

<script>
  export let slug;
</script>

<h1>{slug}</h1>
