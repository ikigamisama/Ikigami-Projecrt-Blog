import DataVisualizer from "@/components/Projects/DataVisualizer";
import LoanApplication from "@/components/Projects/LoanApplication";
import SpellGrammarChecker from "@/components/Projects/SpellGrammarChecker";
import { notFound } from "next/navigation";

type Props = {
	params: Promise<{ project: string }>;
};
const Project = async ({ params }: Props) => {
	const { project } = await params;

	switch (project) {
		case "loan-approval-prediction":
			return <LoanApplication />;
		case "spell-grammer-checker":
			return <SpellGrammarChecker />;
		case "data-visualizer":
			return <DataVisualizer />;
		default:
			return notFound();
	}
};

export default Project;
