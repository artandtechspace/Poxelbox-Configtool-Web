<script setup lang="ts">
import type { BasicValue } from '@/schema/DataTypes';
import { useStore } from '@/userinterface/Store';
import Icon from '@/userinterface/utils/Icon.vue';
import type { PropType } from 'vue';

const store = useStore();

</script>

<script lang="ts">

export default {
    props: {
        itm: {
            required: true,
            type: Object as PropType<BasicValue<any>>
        },
        name: {
            required: true,
            type: String
        }
    },
    data(){return {
        isDescToggled: false
    }},
    components: { Icon },
    computed:{
        getListItemClass(){
            return [
                "list-item",
                (this.isDescToggled ? "withDesc" : "")
            ].join(" ");
        },

        hasDescription(){
            return this.itm.desc || store.isAdvancedMode;
        }
    },
}
</script>

<template>
    <div :class="getListItemClass">
        <div class="header">
            <span>{{ itm.title || `[${name}]` }}:</span>
            <slot />
            <Icon class="dropdown" v-if="hasDescription" name="dropdown" @click="isDescToggled = !isDescToggled" />
            <a target="_blank" :href="itm.link" title="Mehr Informationen" v-if="itm.link !== undefined">
                <Icon class="" name="info"/>
            </a>
        </div>
        <div class="description" v-if="hasDescription && isDescToggled">
            <div v-if="itm.desc">
                <h2>Beschreibung</h2>
                <p>{{ itm.desc! }}</p>
            </div>
            <slot name="desc" />
            <div v-if="store.isAdvancedMode">
                <h2>Code-Name</h2>
                <p>{{ name }}</p>
            </div>
            <div v-if="store.isAdvancedMode">
                <h2>Type</h2>
                <p>{{ itm.type }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">

.list-item{
    border: 2px solid black;
    border-radius: 5px;
    margin: 1rem;
    margin-left: 2rem;
    padding: .4rem;


    .header{
        white-space: nowrap;
        align-items: center;
        font-size: 1rem;
        display: flex;

        a {
            display: flex;
        }

        i.dropdown{
            flex-shrink: 0;
            cursor: pointer;
            transform: rotate(90deg);
            transition: .2s;
            float:right;
        }
    }

    &.withDesc i{
        transform: rotate(0) !important;
        transition: .2s;
    }

    .description{
        &>div{
            margin: .6rem;
        }
        h2{
            font-size: .8rem;
            color: rgb(222, 222, 222);
        }
    }
}

</style>
