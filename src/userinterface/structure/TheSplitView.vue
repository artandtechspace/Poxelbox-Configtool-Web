<script setup lang="ts">
import Split from 'split.js'
import { getRef } from "@/util/VueUtils";   

</script>

<script lang="ts">

export default {
    mounted(){

        // Creates the splitter
        var splitter = Split([getRef<HTMLDivElement>(this,"Left"), getRef<HTMLDivElement>(this,"Right")],{
            sizes: [90,10],
            minSize: [450,200]
        });

        // Inserts a child into the gutter to increase the grabable area
        (splitter as any).pairs[0].gutter.appendChild(document.createElement("div"));
    }
}
</script>

<template>
<div class="split">
    <div ref="Left" class="left">
        <slot name="left" />

    </div>
    <div ref="Right">
        <slot name="right" />
    </div>
</div>
</template>

<style scoped lang="scss">

    .left{
        display: flex;
        flex-direction: column;
    }

    .split{

        width: 100%;
        height: 100%;

    }
</style>
