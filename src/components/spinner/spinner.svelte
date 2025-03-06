<script lang="ts" module>
	import type { WithElementRef } from 'bits-ui';
	import type { SVGAttributes } from 'svelte/elements';
	import { tv, type VariantProps } from 'tailwind-variants';

	export const spinnerVariants = tv({
		base: 'animate-spin size-4 text-gray-200 dark:text-gray-600 inline',
		variants: {
			variant: {
				gray: 'fill-gray-600 dark:fill-gray-300',
				primary: 'fill-primary',
				red: 'fill-red-600'
			}
		},
		defaultVariants: {
			variant: 'primary'
		}
	});

	export type SpinnerVariant = VariantProps<typeof spinnerVariants>['variant'];

	export type SpinnerProps = WithElementRef<SVGAttributes<SVGSVGElement>> & {
		variant?: SpinnerVariant;
	};
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	let { class: className, variant = 'primary' }: SpinnerProps = $props();
</script>

<div role="status">
	<svg
		class={cn(spinnerVariants({ variant }), className)}
		aria-hidden="true"
		viewBox="0 0 100 101"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="m100 50.591c0 27.614-22.386 50-50 50s-50-22.386-50-50c0-27.614 22.386-50 50-50s50 22.386 50 50zm-90.919 0c0 22.599 18.32 40.919 40.919 40.919s40.919-18.32 40.919-40.919-18.32-40.919-40.919-40.919-40.919 18.32-40.919 40.919z"
			fill="currentColor"
		/>
		<path
			d="m93.968 39.041c2.4254-0.6371 3.8948-3.1293 3.0403-5.487-1.7147-4.7312-4.1369-9.1847-7.1912-13.206-3.9715-5.2288-8.9341-9.6242-14.604-12.935-5.6702-3.311-11.937-5.4726-18.443-6.3616-5.0032-0.6837-10.072-0.6044-15.035 0.22749-2.4732 0.41455-3.9215 2.919-3.2844 5.3445 0.6372 2.4255 3.1193 3.8484 5.6004 3.4838 3.8006-0.55855 7.6686-0.58021 11.49-0.058 5.324 0.7275 10.453 2.4966 15.093 5.2061 4.6404 2.7096 8.7016 6.3067 11.952 10.586 2.3326 3.0711 4.2148 6.4503 5.5962 10.035 0.9019 2.34 3.361 3.8023 5.7865 3.1651z"
			fill="currentFill"
		/>
	</svg>

	<span class="sr-only">Loading...</span>
</div>
