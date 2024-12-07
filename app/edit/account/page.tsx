import EditProfile from "@/components/EditProfile";
import ProfileImg from "@/components/ProfileImg";
import { roboto_mono } from "@/lib/font";

const EditAccount = () => {
	return (
		<section className='container mx-auto'>
			<div className='flex flex-col md:flex-row w-full my-8 gap-4'>
				<div className='flex-[1_1_100%] md:flex-[3_3_0%] login-card flex flex-col items-center gap-4'>
					<ProfileImg />
				</div>

				<div className='flex-[1_1_100%] md:flex-[7_7_0%] login-card !py-6 px-8'>
					<h1 className={`text-4xl font-bold mb-8 ${roboto_mono.className}`}>
						Edit Profile
					</h1>
					<EditProfile />
				</div>
			</div>
		</section>
	);
};

export default EditAccount;
