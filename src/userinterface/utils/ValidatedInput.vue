
<!-- Simple an input, which is strongly validated -->

<script lang="ts">

export default {

    data(){return {
        invalid: false,
        value: undefined as string|number|undefined
    }},

    props: {
        placeholder: String,
        type: String,
        id: String,
        min: Number,
        max: Number,
        classList: String,
        maxlength: Number,
        step: Number,

        modelValue: [String, Number]
    },

    mounted(){
        this.value = this.modelValue;
    },

    emits: ["update:modelValue", "change"],

    methods: {
        // Event: When an input is done
        onInput(evt: Event){
            var inp = evt.target as HTMLInputElement;

            // Updates the invalid value
            this.invalid = !inp.validity.valid || (inp.type === "number" && isNaN(inp.valueAsNumber));

            // Updates the normal value
            this.value = inp.value;

            // Forwards the event if it's valid
            if(this.invalid) return;
            this.$emit('update:modelValue', inp.value);
        }
    },

    computed:{
        getClasses(){
            return [
                this.classList,
                (this.invalid ? "invalid" : "")
            ].join(" ");
        }
    },
}

</script>

<template>
<input
    :class="getClasses" :maxlength="maxlength" :placeholder="placeholder"
    :min="min" :max="max"
    :id="id" :type="type"
    @input="onInput"
    @change="$emit('change')"
    :value="value"
    :step="step"
    />
</template>

<style lang="scss" scoped>
input.invalid{
    color: red;
}
</style>