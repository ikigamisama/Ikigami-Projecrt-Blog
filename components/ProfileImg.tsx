"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { FaUpload } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

import profile_icon from "@/assets/profile_icon.png";
import { useState } from "react";

const ProfileImg = () => {
	const [image, setImage] = useState<string | null>(null);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setImage(URL.createObjectURL(file));
		}
	};
	return (
		<>
			<Avatar className='h-[150px] w-[150px] flex items-center'>
				<AvatarImage src={profile_icon.src} alt='@shadcn' />
			</Avatar>

			<div className='flex flex-row gap-2'>
				<input
					type='file'
					accept='image/*'
					id='file-upload'
					className='hidden'
					onChange={handleImageChange}
				/>
				<Button
					className={`text-white hover:bg-cyan-400`}
					onClick={() => document.getElementById("file-upload")?.click()}>
					<FaUpload /> Upload Image
				</Button>
				<Button className={`text-white bg-red-500 hover:bg-red-400`}>
					<GrPowerReset /> Reset Image
				</Button>
			</div>
		</>
	);
};

export default ProfileImg;
