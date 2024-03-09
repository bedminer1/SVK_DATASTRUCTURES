<script lang="ts">
	import '../app.postcss';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import { AppBar } from '@skeletonlabs/skeleton';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<div class="flex gap-4">
			<a href="/">home</a>
			<a href="/linked-list">linked-list</a>
			<a href="/hash-map">hash-map</a>
		</div>
		
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<a href="https://github.com/bedminer1/SVK_DATASTRUCTURES" target="_blank">github@bedminer1</a>
	</svelte:fragment>
</AppBar>
<slot />
