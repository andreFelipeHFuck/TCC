import { Appwrite } from "./appwrite";

export function appwriteInitializer(
    service: Appwrite
): () => Promise<void> {
    return () => service.init();
}