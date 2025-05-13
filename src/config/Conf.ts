
const appwriteConf = {

    appwriteEndPoint: String(import.meta.env.VITE_APPWRITE_END_POINT),
    appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECTID),
    appwriteDtabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE),
    appwriteCollectionID: String(import.meta.env.VITE_APPWRITE_COLLECTIONID)
}


export default appwriteConf