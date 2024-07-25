
import { ID, Account, Client, Databases, Query, Models} from 'appwrite'
import Snackbar from 'react-native-snackbar'
import { APPWRITE_COLLECTION_ID, APPWRITE_DATABASE_ID, APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from './hidden'



const appwriteClient = new Client()

const APPWRITE_ENDPOINT_= APPWRITE_ENDPOINT
const APPWRITE_PROJECT_ID_= APPWRITE_PROJECT_ID
const APPWRITE_DATABASE_ID_= APPWRITE_DATABASE_ID
const APPWRITE_COLLECTION_ID_= APPWRITE_COLLECTION_ID

type CreateUserAccount = {
    email: string;
    password: string;
    name: string;
}

type LoginUserAccount = {
    email: string;
    password: string;
}

class AppwriteService{
    account;
    databases;
    
    constructor(){
        appwriteClient
        .setEndpoint(APPWRITE_ENDPOINT_)
        .setProject(APPWRITE_PROJECT_ID_)

        this.account = new Account(appwriteClient)

        this.databases = new Databases(appwriteClient);
    }

    async getDataFromDatabase() {
        try{
            const result = await this.databases.listDocuments(
                APPWRITE_DATABASE_ID_,
                APPWRITE_COLLECTION_ID_,
                [] // queries (optional)
            );

            if(result)
                {
                   // console.log(result)
                    return await result;
                }

        }
        catch(error){
            Snackbar.show({text: 'error getting data', duration: Snackbar.LENGTH_SHORT})
        }
    }

    async deleteEntryFromDatabase(id : string){
        try{
           
           await this.databases.deleteDocument(APPWRITE_DATABASE_ID_, APPWRITE_COLLECTION_ID_, id)

        }
        catch(error){
            Snackbar.show({text: 'could not delete', duration: Snackbar.LENGTH_SHORT})
        }
    }

    async insertIntoDatabase(text: string){

        try{
            const insertPromise = await this.databases.createDocument(
                APPWRITE_DATABASE_ID_,
                APPWRITE_COLLECTION_ID_,
                ID.unique(),
                { "title": text }
            );

            if(insertPromise){
                Snackbar.show({text: 'inserted!', duration: Snackbar.LENGTH_SHORT})
            }
        }
        catch(error){
            Snackbar.show({ text:"error inserting", duration:Snackbar.LENGTH_SHORT});
        }

    }

    async createAccount({email, password, name} : CreateUserAccount){

        try{
             const userAccount = await this.account.create(ID.unique(), email, password, name);
            
             if(userAccount){
                Snackbar.show({
                    text: "good!!!", duration: Snackbar.LENGTH_SHORT
                })
                return this.loginAccount({email, password});
             }
             else{
                return userAccount;
             }
        }
        catch(error)
        {
            Snackbar.show({ text:"error creating", duration:Snackbar.LENGTH_SHORT});
        }
    }

    async loginAccount({email, password} : LoginUserAccount){
        try{
           return await this.account.createEmailPasswordSession(email, password);
        }
        catch(error){
            Snackbar.show({ text:"error logging " + error, duration:Snackbar.LENGTH_SHORT});
        }
    }

    async logout(){
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            console.log("Appwrite service :: getCurrentAccount() :: " + error);
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get()
        }
        catch(error){
            //wlll throw error if user is not logged in
        }
    }   

    async forgotPassword(email: string){
        try{
            return await this.account.createRecovery(email, "http://example.com")
        }
        catch(error){
            Snackbar.show({ text:"error logging " + error, duration:Snackbar.LENGTH_SHORT});
        }
    }
    
}

export default AppwriteService;