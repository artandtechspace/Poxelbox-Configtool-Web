<script setup lang="ts">
import type { IntPresetValue, IntValue } from '@/schema/DataTypes';
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
            type: Object as PropType<IntPresetValue>
        }
    }
}
</script>

<template>
    <ListItemWrapper :itm="itm" :name="name">
        <template #default>
            <select v-model="itm.value">
                <option :key="id" v-for="opt, id in itm.presets" :value="opt">{{ opt }}</option>
            </select>
            <Spacer />
        </template>
    </ListItemWrapper>
</template>

<style scoped lang="scss">
select {
    margin-left: .4rem;
    background: rgb(54, 54, 54);
    color: rgb(218, 218, 218);
    padding: .1rem .4rem;

    option {
        color: rgb(218, 218, 218);
    }
}
</style>
