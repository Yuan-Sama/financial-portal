<script lang="ts">
	import { goto } from '$app/navigation';
	import { createAvatar } from '@dicebear/core';
	import { adventurer } from '@dicebear/collection';
	import { LogOut, User } from 'lucide-svelte';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuGroup,
		DropdownMenuGroupHeading,
		DropdownMenuItem,
		DropdownMenuSeparator,
		DropdownMenuTrigger
	} from './ui/dropdown-menu';
	import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
	import { applyAction } from '$app/forms';

	let { displayName }: { displayName: string } = $props();

	const avatar = createAvatar(adventurer, {
		seed: 'Sophia',
		backgroundColor: ['d1d4f9', 'ffdfbf'],
		backgroundType: ['gradientLinear']
	});
</script>

<DropdownMenu>
	<DropdownMenuTrigger class="hover:cursor-pointer" title={displayName}>
		<Avatar>
			<AvatarImage src={avatar.toDataUri()} alt={displayName} />
			<AvatarFallback>{displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
		</Avatar>
	</DropdownMenuTrigger>

	<DropdownMenuContent align="end">
		<DropdownMenuGroup>
			<DropdownMenuGroupHeading>{displayName}</DropdownMenuGroupHeading>
			<DropdownMenuSeparator />
			<DropdownMenuItem class="hover:cursor-pointer">
				<User class="mr-1" />
				<span>Profile</span>
			</DropdownMenuItem>

			<DropdownMenuSeparator />

			<!-- TODO: update logic of this -->
			<DropdownMenuItem
				class="hover:cursor-pointer text-destructive/80 font-bold data-[highlighted]:text-destructive w-full"
			>
				{#snippet child({ props })}
					<button
						{...props}
						onclick={async () => {
							await fetch('/log-out', { method: 'POST' });
							return goto('/', { invalidateAll: true });
						}}
					>
						<LogOut class="mr-1" />
						<span>Log out</span>
					</button>
				{/snippet}
			</DropdownMenuItem>
		</DropdownMenuGroup>
	</DropdownMenuContent>
</DropdownMenu>
