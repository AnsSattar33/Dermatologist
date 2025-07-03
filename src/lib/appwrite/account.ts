import { account } from './config';
import { database } from './config';
import { ID } from 'appwrite';

export interface UpdateProfileData {
    name?: string;
    email?: string;
    password?: string;
    oldPassword?: string;
}

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTIONID;

export const getAccount = async () => {
    try {
        const user = await account.get();
        return user;
    } catch (error) {
        console.error('Error fetching account:', error);
        throw error;
    }
};

export const updateProfile = async (data: UpdateProfileData) => {
    try {
        const updates = [];

        if (data.name) {
            updates.push(account.updateName(data.name));
        }

        if (data.email && data.password) {
            updates.push(account.updateEmail(data.email, data.password));
        }

        if (data.password && data.oldPassword) {
            updates.push(account.updatePassword(data.password, data.oldPassword));
        }

        await Promise.all(updates);
        return await getAccount();
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};

export const deleteAccount = async () => {
    try {
        await account.deleteSessions();
        return true;
    } catch (error) {
        console.error('Error deleting account:', error);
        throw error;
    }
};

export async function saveCartItems(userId: string, items: any[]) {
    console.log('DATABASE_ID:', DATABASE_ID);
    console.log('COLLECTION_ID:', COLLECTION_ID);
    console.log('userId:', userId);
    console.log('items:', items);
    const promises = items.map(item => {
        console.log('Saving item:', item);
        return database.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {
                userId,
                ProductId: item.id,
                ProductName: item.name,
                Price: item.price,
                imageURL: item.image,
                quantity: item.quantity,
            }
        ).catch(err => {
            console.error('Error saving item:', item, err);
            throw err;
        });
    });
    try {
        return await Promise.all(promises);
    } catch (err) {
        console.error('Error saving cart items:', err);
        throw err;
    }
} 