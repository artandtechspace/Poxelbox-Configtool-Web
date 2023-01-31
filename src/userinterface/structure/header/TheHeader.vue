<script setup lang="ts">
import { useStore } from '@/userinterface/Store';
import { ValueTypes } from "@/schema/DataTypes";
import Spacer from '@/userinterface/utils/Spacer.vue';

const store = useStore();

</script>

<script lang="ts">
export default {
    components: { Spacer }
}
</script>

<template>
    <div class="header">
        <input class="search" type="text" v-model="store.filter" placeholder="Süchen...">
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
    box-shadow: 2px 0px 20px rgba(0, 0, 0, 0.491);;

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
