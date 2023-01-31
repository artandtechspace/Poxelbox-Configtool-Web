<script setup lang="ts">
import type { ColorValue, FloatValue, int } from '@/schema/DataTypes';
import ValidatedInput from '@/userinterface/utils/ValidatedInput.vue';
import type { PropType } from 'vue';
import ListItemWrapper from '../ListItemWrapper.vue';
import Spacer from "../../../utils/Spacer.vue";

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
            type: Object as PropType<ColorValue>
        }
    },

    methods: {
        onChange(evt: Event){
            // Updates the value
            this.itm.value = parseInt((evt as any).target.value.substring(1),16) as int;
        }
    },

    computed:{
        getColor(){
            return "#"+this.itm.value.toString(16);
        }
    }
}
</script>

<template>
    <ListItemWrapper :itm="itm" :name="name">
        <template #default>
            <input type="color" :value="getColor" @change="onChange">
            <Spacer />
        </template>
    </ListItemWrapper>
</template>

<style scoped lang="scss">
</style>
