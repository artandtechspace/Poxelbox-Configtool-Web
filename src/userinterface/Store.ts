import type { ImportObject } from "@/schema/DataTypes";
import { defineStore } from "pinia";

export const useStore = defineStore("base", {
    state: ()=> {
        return {

            // Will hold the remote-data (Loading or error if this is undefined)
            data: undefined as ImportObject|undefined,

            // If there is currently a fetch-data request being send
            isFetching: false,

            // If there is currently a push request being send
            isPushing: false,

            isAdvancedMode: false,
            filter: "",


            popup:{
                isOpen: false,
                title: "" as string,
                text: "" as string
            }
        }
    }
});