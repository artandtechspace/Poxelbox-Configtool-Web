<!--
  Loader from https://cssloaders.github.io/
-->

<script setup lang="ts">

</script>

<script lang="ts">
export default {}
</script>

<template>
  <span class="loader"></span>

</template>

<style scoped lang="scss">
.loader {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 

</style>
