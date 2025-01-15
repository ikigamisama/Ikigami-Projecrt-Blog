import LoanApplication from "@/components/Projects/LoanApplication";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
	params: Promise<{ project: string }>;
};
const Project = async ({ params }: Props) => {
	const { project } = await params;

	switch (project) {
		case "loan-application":
			return <LoanApplication />;
		default:
			return notFound();
	}
};

export default Project;
