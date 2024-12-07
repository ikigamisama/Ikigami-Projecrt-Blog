import { Client, Account } from "appwrite";

export const client = new Client();

const projectId = process.env.APPWRITE_PROJECT_ID;
if (!projectId) {
	throw new Error("Environment variable APPWRITE_PROJECT_ID is not set.");
}

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(projectId);

export const account = new Account(client);
export { ID } from "appwrite";
