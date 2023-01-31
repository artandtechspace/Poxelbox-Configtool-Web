<script setup lang="ts">
import type { FloatValue } from '@/schema/DataTypes';
import ValidatedInput from '@/userinterface/utils/ValidatedInput.vue';
import type { PropType } from 'vue';
import ListItemWrapper from '../ListItemWrapper.vue';

</script>

<script lang="ts">
export default {
    components: { ListItemWrapper, ValidatedInput },
    props: {
        name: {
            required: true,
            type: String
        },
        itm: {
            required: true,
            type: Object as PropType<FloatValue>
        }
    }
}
</script>

<template>
    <ListItemWrapper :itm="itm" :name="name">
        <template #default>
            <ValidatedInput :step=".01" type="number" :maxlength="10" :min="itm.min" :max="itm.max" v-model.number="itm.value" />
        </template>
        <template #desc>
            <div v-if="itm.min && itm.max">
                <h2>Zwischen</h2>
                <p>{{ itm.min }} - {{ itm.max }}</p>
            </div>
            <div v-else-if="itm.min">
                <h2>Minimum</h2>
                <p>{{ itm.min }}</p>
            </div>
            <div v-else-if="itm.min">
                <h2>Minimum</h2>
                <p>{{ itm.min }}</p>
            </div>
        </template>
    </ListItemWrapper>
</template>

<style scoped lang="scss">
</style>
