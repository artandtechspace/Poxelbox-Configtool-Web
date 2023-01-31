<script setup lang="ts">
import { useStore } from '@/userinterface/Store';
import { ValueTypes } from "@/schema/DataTypes";
import ListItemColor from "./types/ListItemColor.vue";
import ListItemBool from "./types/ListItemBool.vue";
import ListItemFloat from "./types/ListItemFloat.vue";
import ListItemInt from "./types/ListItemInt.vue";
import ListItemIntPreset from "./types/ListItemIntPreset.vue";
import ListItemStringPreset from "./types/ListItemStringPreset.vue";
import type {CategoryObject} from "@/schema/DataTypes";
import type { PropType } from 'vue';

</script>

<script lang="ts">

const COMPONENT_MAPPING: {[K in ValueTypes]: string} = {
    [ValueTypes.COLOR]: "ListItemColor",
    [ValueTypes.BOOL]: "ListItemBool",
    [ValueTypes.FLOAT]: "ListItemFloat",
    [ValueTypes.INT]: "ListItemInt",
    [ValueTypes.INT_PRESET]: "ListItemIntPreset",
    [ValueTypes.STR_PRESET]: "ListItemStringPreset"
};

export default {
    components: { ListItemColor, ListItemBool, ListItemFloat, ListItemInt, ListItemIntPreset, ListItemStringPreset },

    props:{
        category: {
            required: true,
            type: Object as PropType<CategoryObject>
        },

        categoryName: {
            required: true,
            type: String
        }
    },

    computed:{
        getFilteredItems(){
            const store=useStore();
            
            // Gets the basic filter-string in lowercase
            const filterName = store.filter.toLowerCase();

            // Filters all items
            var filteredItems : CategoryObject = {};
            for(var name in this.category){
                var value = this.category[name];

                if(value.title && value.title!.toLowerCase().indexOf(filterName)>-1)
                    filteredItems[name] = value;
            }

            return filteredItems;
        },

        shouldRender(){
            return Object.keys(this.getFilteredItems).length > 0;
        }
    }
}
</script>

<template>
    <div v-if="shouldRender">
        <h1>{{ categoryName }}</h1>
        <component v-for="itm, name in getFilteredItems" :key="name" :name="name" :is="COMPONENT_MAPPING[itm.type]" :itm="itm"></component>
    </div>
</template>

<style scoped lang="scss">
h1{
    font-size: 1.2rem;
    margin-left: .8rem;
    margin-top: .8rem;
}
</style>
