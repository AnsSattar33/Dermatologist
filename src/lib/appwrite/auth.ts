import { Client, Account, ID } from 'appwrite'
import appwriteConf from '@/config/Conf';
import { account } from './config';

const client = new Client();

client
    .setEndpoint(`${appwriteConf.appwriteEndPoint}`)
    .setProject(`${appwriteConf.appwriteProjectID}`);

export const createAccount = async ({ username, email, password }: { username: string, email: string, password: string }) => {
    try {
        // Try to create the account
        const user = await account.create(ID.unique(), email, password, username);
        if (user) {
            // If account creation is successful, try to login
            return loginAccount({ email, password });
        } else {
            throw new Error("User creation failed");
        }
    } catch (error: any) {
        // Format error message for better user experience
        if (error.message.includes('unique')) {
            throw new Error("Email already exists. Please try logging in instead.");
        }
        throw error;
    }
};

export const loginAccount = async ({ email, password }: { email: string, password: string }) => {
    try {
        // First, try to get current session
        try {
            const currentSession = await account.getSession('current');
            if (currentSession) {
                // If there's an active session, delete it first
                await account.deleteSession(currentSession.$id);
            }
        } catch (error) {
            // If no session exists or error getting session, proceed with login
            console.log('No active session found');
        }

        // Create new session
        const session = await account.createEmailPasswordSession(email, password);
        if (!session) {
            throw new Error("Failed to create session");
        }

        // Get user details after successful login
        const user = await account.get();
        return {
            sessionId: session.$id,
            userId: user.$id,
            email: user.email,
            name: user.name
        };
    } catch (error: any) {
        // Format error message for better user experience
        if (error.message.includes('Invalid credentials')) {
            throw new Error("Invalid email or password");
        }
        throw error;
    }
};

export const logoutAccount = async () => {
    try {
        await account.deleteSession('current');
    } catch (error: any) {
        throw new Error("Failed to logout. Please try again.");
    }
};