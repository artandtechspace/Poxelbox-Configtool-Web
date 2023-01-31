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
    <div class="advheader">
        <div>
            <span>Endpunkt:</span>
            <input class="endpoint" type="text" v-model="store.endpoint" placeholder="api.endpunkt.de">
        </div>
        <Spacer/>
    </div>
</template>

<style scoped lang="scss">

.advheader{
    display: flex;
    white-space: nowrap;
    padding: .5rem;
    align-items: center;
    background: rgba(0, 0, 0, 0.154);

    input{
        border-bottom: 2px solid rgb(0, 22, 189);
        font-size: 1rem;
    }
}

</style>
