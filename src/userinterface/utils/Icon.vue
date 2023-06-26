<script setup lang="ts">

</script>

<script lang="ts">

export default {
    props: {
        name: {
            required: true,
            type: String
        },
        
        classList: {
            default: "",
            type: String
        }
    },

    emits: ["click"]
}

</script>

<template>
<i @click="$emit('click')" :class="'ic-'+name+' '+classList"></i>
</template>

<style scoped lang="scss">

i{
    width: 1.5rem;
    height: 1.5rem;
    display: inline-block;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
}

.ic-dropdown{ background: url("@/assets/icons/Dropdown.png"); }
.ic-close{ background: url("@/assets/icons/Close.png"); }
.ic-face{ background: url("@/assets/icons/Face.svg"); }
.ic-info{ background: url("@/assets/icons/Info.svg"); }
</style>
