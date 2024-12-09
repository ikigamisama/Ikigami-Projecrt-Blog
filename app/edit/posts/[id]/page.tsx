import PostEdit from "@/components/PostEdit";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const EditPosts = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore);

	const { data } = await supabase.from("Posts").select().eq("id", id).single();

	return (
		<>
			<section className='post_header_container min-h-[400px] mb-8'>
				<h1 className='heading'>Edit Your Own Blog Project</h1>
			</section>

			<PostEdit post={data} />
		</>
	);
};

export default EditPosts;
