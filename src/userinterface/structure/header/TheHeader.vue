<script setup lang="ts">
import { useStore } from '@/userinterface/Store';
import { ValueTypes } from "@/schema/DataTypes";
import Spacer from '@/userinterface/utils/Spacer.vue';
import { mapStores } from 'pinia';

const store = useStore();

</script>

<script lang="ts">
export default {
    components: { Spacer },
    computed:{
        ...mapStores(useStore),
        getClasses(){
            return [
                "header",
                this.baseStore.isAdvancedMode ? 'header-shadow' : ''
            ].join(" ");
        }
    }
}
</script>

<template>
    <div :class="getClasses">
        <input class="search" type="text" v-model="store.filter" placeholder="@Section... Baudrate...">
        <Spacer/>
        <span>Advanced Mode:</span>
        <div class="wrapper">
            <input type="checkbox" role="switch" v-model="store.isAdvancedMode">
        </div>
    </div>
</template>

<style scoped lang="scss">

.header{
    display: flex;
    white-space: nowrap;
    padding: .5rem;
    align-items: center;

    .wrapper{
        display: flex;
        align-items: center;
        margin-left: .4rem;
    }

    .search{
        border-bottom: 2px solid rgb(189, 0, 0);
    }
}

</style>
