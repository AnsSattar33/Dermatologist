import { account } from './config';

export interface UpdateProfileData {
    name?: string;
    email?: string;
    password?: string;
    oldPassword?: string;
}

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