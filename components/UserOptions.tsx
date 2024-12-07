"use client";

import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

import { Button } from "./ui/button";

import { jetbrainsMono, lato, workSans } from "@/lib/font";
import { FaPencilAlt, FaEdit } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import profile_icon from "@/assets/profile_icon.png";

const UserOptions = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='h-14 w-14'>
					<AvatarImage src={profile_icon.src} alt='@shadcn' />
					<AvatarFallback>JP</AvatarFallback>
					<span className='sr-only'>Toggle user menu</span>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuItem>
					<div className='flex flex-col justify-start gap-2'>
						<p
							className={`font-bold text-[22px] text-black ${jetbrainsMono.className}`}>
							Ikigami
						</p>
						<p
							className={`font-bold text-[14px] !text-black-300 ${jetbrainsMono.className}`}>
							@ikigamidevs
						</p>
					</div>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link
						href='/author/12312/'
						className={`block w-full text-left text-[15px] font-bold ${lato.className}`}
						prefetch={false}>
						<RxAvatar />
						Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link
						href='/create/account/'
						className={`block w-full text-left text-[15px] font-bold ${lato.className}`}
						prefetch={false}>
						<FaPencilAlt />
						Create Post
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link
						href='/edit/account/'
						className={`block w-full text-left text-[15px] font-bold ${lato.className}`}>
						<FaEdit />
						Edit Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Button
						className={`bg-primary hover:bg-primary text-white block w-full text-center ${workSans.className}`}>
						Logout
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserOptions;
