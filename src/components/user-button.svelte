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
				<User class="mr-2" />
				<span>Profile</span>
			</DropdownMenuItem>

			<DropdownMenuSeparator />

			<DropdownMenuItem
				class="hover:cursor-pointer"
				onclick={async () => {
					const response = await fetch('/api/log-out', {
						method: 'POST'
					});

					const data = await response.json();

					if (data.location) return await goto(data.location, { invalidateAll: true });
				}}
			>
				<LogOut class="mr-2" />
				<span>Log out</span>
			</DropdownMenuItem>
		</DropdownMenuGroup>
	</DropdownMenuContent>
</DropdownMenu>
