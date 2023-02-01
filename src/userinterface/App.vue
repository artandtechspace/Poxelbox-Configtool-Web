<script setup lang="ts">
import { useStore } from './Store';
import TheSplitView from "./structure/TheSplitView.vue";
import TheList from "./structure/list/TheList.vue";
import TheHeader from "./structure/header/TheHeader.vue";
import TheNavbar from './structure/navbar/TheNavbar.vue';
import Loader from './utils/Loader.vue';
import ThePopup from './structure/popup/ThePopup.vue';
import Icon from './utils/Icon.vue';
import TheAdvancedHeader from './structure/header/TheAdvancedHeader.vue';

const store = useStore();

</script>

<script lang="ts">

export default {
    methods: {



    },
    mounted() {
    },
    components: { TheSplitView, TheList, TheHeader, TheNavbar, Loader, ThePopup, Icon, TheAdvancedHeader }

}

</script>

<template>
    <ThePopup />

    <TheSplitView>
        <template #left>
            <div class="header-shadow">
                <TheHeader/>
                <TheAdvancedHeader v-if="store.isAdvancedMode"/>
            </div>
            <div class="container">
                <TheList v-if="store.data !== undefined" />
                <div class="nodata" v-else>
                    <p>Dies sind nicht die Daten nach denen du suchst...</p>
                    <Icon name="face"/>
                </div>
            </div>
        </template>
        <template #right>
            <TheNavbar />
        </template>
    </TheSplitView>
</template>

<style lang="scss">

#app{
    display: flex;
    flex-direction: column;

    .container{
        overflow: auto;
        height: 100%;
        width: 100%;
    }

    .nodata{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        flex-direction: column;
        color:rgb(101, 101, 101);
        font-size: 1.4rem;
        i{
            width: 5rem;
            height: 5rem;
        }
    }

    .header-shadow{
        box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.491);
    }

}
</style>
