import Image from "next/image";

import { assets } from "@/assets/assets";
import { Button } from "./ui/button";
import { roboto_mono } from "@/lib/font";

import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";

import UserOptions from "./UserOptions";

const Header = () => {
	return (
		<header className='header'>
			<div className='flex justify-between items-center'>
				<Link href='/'>
					<Image
						src={assets.logo}
						width={100}
						alt='main-logo'
						className='w-[130px] sm:w-auto'
						priority
					/>
				</Link>
				<div className='flex flex-row items-center'>
					<UserOptions />
					<Button
						className={`header-btn ${roboto_mono.className}`}
						variant='outline'
						asChild>
						<Link href='/login'>
							Get Started <Image src={assets.arrow} alt='' />
						</Link>
					</Button>
					<ThemeSwitcher />
				</div>
			</div>
		</header>
	);
};

export default Header;
