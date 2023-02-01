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

            endpoint: window.location.host,

            popup:{
                isOpen: false,
                title: "" as string,
                text: "" as string
            }
        }
    },

    getters: {
        // Returns the filter split into category and item
        getAppliedFilters() : { category?: string, item?: string} {
            const baseFilter = this.filter.toLowerCase().trim();

            // Checks if there was no category filter applied
            if(!baseFilter.startsWith("@"))
            return {
                category: undefined,
                item: baseFilter
            };

            // Gets the space-index
            var spaceIdx = baseFilter.indexOf(" ");

            // Checks if no seperate item filter got applied
            if(spaceIdx === -1)
            return {
                category: baseFilter.substring(1),
                item: undefined
            };

            // Splits into item and category filter
            var item = baseFilter.substring(spaceIdx+1).trim();

            return {
                category: baseFilter.substring(1,spaceIdx),
                item: item.length <= 0 ? undefined : item
            }
        }
    }
});