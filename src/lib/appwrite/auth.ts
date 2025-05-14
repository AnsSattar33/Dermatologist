import { Client, Account, ID } from 'appwrite'
import appwriteConf from '@/config/Conf';
const client = new Client();

client
    .setEndpoint(`${appwriteConf.appwriteEndPoint}`)
    .setProject(`${appwriteConf.appwriteProjectID}`);

export const account = new Account(client)

export const createAccount = async ({ username, email, password }: { username: string, email: string, password: string }) => {

    try {

        const user = await account.create(ID.unique(), email, password, username);

        if (user) {

            return loginAccount({ email, password })

        } else {
            console.log("user not found")
        }

    } catch (error) {

        console.log('error in CreateAccount = ', error)
    }

}

export const loginAccount = async ({ email, password }: { email: string, password: string }) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)

        if (session) {
            return session
        } else console.log("Session has not found ")

    } catch (error) {
        throw error
    }
}

// export const logoutAccount = async () => {

//     try {
//         const result = await account.deleteSession()
//     } catch (error) {
        
//     }
// }