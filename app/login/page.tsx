import LoginForm from "@/components/LoginForm";
import { jetbrainsMono } from "@/lib/font";
import Link from "next/link";

const Login = async () => {
	return (
		<section className='flex flex-col h-[calc(90vh-30px)] w-full items-center justify-center px-4'>
			<div className='login-card w-[500px]'>
				<h2 className='text-4xl font-bold'>Login</h2>

				<LoginForm />

				{/* <p className={`text-center text-sm ${jetbrainsMono.className}`}>
					Don't have an account? Register{" "}
					<Link href='/register' className='font-bold'>
						Here
					</Link>
				</p> */}
			</div>
		</section>
	);
};

export default Login;
