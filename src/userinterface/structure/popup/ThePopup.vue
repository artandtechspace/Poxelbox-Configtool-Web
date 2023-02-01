<script setup lang="ts">
import { useStore } from '@/userinterface/Store';
import Icon from '../../utils/Icon.vue';

const store = useStore();

</script>

<script lang="ts">
export default {
    components: { Icon }
}
</script>

<template>
    <div v-if="store.popup.isOpen" class="overlay">
        <div class="popup">
            <Icon classList="close" name="close" @click="store.popup.isOpen = false"/>
            <h1>{{ store.popup.title }}</h1>
            <div class="body">{{ store.popup.text }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">

.overlay{
    position: absolute;
    z-index: 9999;

    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.445);
    display: flex;
    justify-content: center;
    align-items: center;

    .popup{
        background: #373737;
        width: 50%;
        padding: 1rem;
        border-radius: .2rem;
        border: 2px solid white;
        position: relative;

        h1{
            font-weight: normal;
            font-size: 2rem;
            color: white;
            margin-bottom: .5rem;
        }

        div.body{
            font-size: 1.4rem;
        }

        .close{
            position: absolute;
            right: -1.25rem;
            top: -1.25rem;
            cursor: pointer;
            width: 2.5rem;
            height: 2.5rem;
        }
    }

}

</style>
