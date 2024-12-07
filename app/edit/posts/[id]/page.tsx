import PostForm from "@/components/PostForm";

const EditPosts = () => {
	return (
		<>
			<section className='post_header_container min-h-[400px] mb-8'>
				<h1 className='heading'>Edit Your Own Blog Project</h1>
			</section>

			<PostForm />
		</>
	);
};

export default EditPosts;
