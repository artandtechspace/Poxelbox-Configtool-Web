<script setup lang="ts">
import { useStore } from '@/userinterface/Store';
import ListItemColor from "./types/ListItemColor.vue";
import ListItemBool from "./types/ListItemBool.vue";
import ListItemFloat from "./types/ListItemFloat.vue";
import ListItemInt from "./types/ListItemInt.vue";
import ListItemIntPreset from "./types/ListItemIntPreset.vue";
import ListItemStringPreset from "./types/ListItemStringPreset.vue";
import ListCategory from './ListCategory.vue';

const store = useStore();

</script>

<script lang="ts">

export default {
    components: { ListItemColor, ListItemBool, ListItemFloat, ListItemInt, ListItemIntPreset, ListItemStringPreset, ListCategory },
}
</script>

<template>
    <ListCategory v-for="itm, name in store.data!" :key="name" :categoryName="(name as string)" :category="itm" />
</template>

<style scoped lang="scss">
</style>
