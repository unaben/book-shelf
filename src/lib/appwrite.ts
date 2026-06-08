import { Account, Avatars, Client, Databases } from "react-native-appwrite";

const client = new Client();

client
  .setProject("6a200a080026ee0c2bf7")
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setPlatform("dev.org.shelfie");

if (typeof window !== "undefined" && !window.localStorage) {
  (window as any).localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0,
  };
}

export const account = new Account(client);
export const databases: Databases = new Databases(client);
export const avatars = new Avatars(client);
export { client };
