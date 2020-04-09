<script context="module">
	export async function preload({ params, query }) {
    return { activeHeroClass: params.slug }
	}
</script>

<script>
  import CollectionNav from './_nav.svelte';

  export let activeHeroClass;
</script>

<CollectionNav activeHeroClass={activeHeroClass} />
