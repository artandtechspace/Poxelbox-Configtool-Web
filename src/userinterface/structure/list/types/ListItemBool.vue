<script setup lang="ts">
import type { BoolValue, IntValue } from '@/schema/DataTypes';
import Spacer from '@/userinterface/utils/Spacer.vue';
import ValidatedInput from '@/userinterface/utils/ValidatedInput.vue';
import type { PropType } from 'vue';
import ListItemWrapper from '../ListItemWrapper.vue';

</script>

<script lang="ts">
export default {
    components: { ListItemWrapper, ValidatedInput, Spacer },
    props: {
        name: {
            required: true,
            type: String
        },
        itm: {
            required: true,
            type: Object as PropType<BoolValue>
        }
    }
}
</script>

<template>
    <ListItemWrapper :itm="itm" :name="name">
        <template #default>
            <div class="wrapper">
                <input type="checkbox" v-model="itm.value" role="switch">

            </div>
            <Spacer/>
        </template>
    </ListItemWrapper>
</template>

<style scoped lang="scss">
div.wrapper{
    display: flex;
    width: 5rem;
    margin-left:.4rem;
}
</style>
