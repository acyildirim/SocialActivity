import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

//Creating Store collection
interface Store {
    activityStore: ActivityStore
}

//Creating instances of our stores
export const store: Store = {
    activityStore: new ActivityStore()
}

//Parsing our store into the create context
export const StoreContext = createContext(store);


//React hook to allow us to use our stores in our components
export function useStore() {
    return useContext(StoreContext);
}