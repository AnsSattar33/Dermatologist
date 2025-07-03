import { Account, Client } from 'appwrite';
import { Databases } from 'appwrite';

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_END_POINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECTID);

export const account = new Account(client);
export const database = new Databases(client);

export { client }; 