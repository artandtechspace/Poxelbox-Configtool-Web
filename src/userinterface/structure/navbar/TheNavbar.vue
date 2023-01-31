<script setup lang="ts">
import { fetchRemoteData, pushData } from '@/remote/RemoteCommunication';
import { useStore } from '@/userinterface/Store';
import Loader from '@/userinterface/utils/Loader.vue';
import { mapStores } from 'pinia';

const store = useStore();

</script>

<script lang="ts">

export default {
    methods: {
        // Event: When the load-data retry button get's clicked
        async onRetryLoadDataClicked() {

            // Prepares for the fetch request
            this.baseStore.data = undefined;
            this.baseStore.isFetching = true;
            this.baseStore.popup.isOpen = false;
            
            // Tries to fetch the remote data
            var data = await fetchRemoteData();

            // Checks if the request failed or if the data is invalid
            if(data === false){
                // Opens the error popup
                this.baseStore.popup = {
                    isOpen: true,
                    text: "Es gab einen Fehler beim Abfragen der Daten. Klicke rechts auf 'Aktualisieren' um die Abfrage neu zu starten.",
                    title: "Fehler beim Abfragen der Daten"
                }
            }else{
                // Updates the data
                this.baseStore.data = data;
            }

            // Ensures the loading screen stays on for at least
            // a short while to ensure the user sees that something is happening
            setTimeout(()=>this.baseStore.isFetching = false, 500);
        },


        // Event: When the save-button is clicked
        async onSaveDataClicked(){

            // Prepares for the fetch request
            this.baseStore.isPushing = true;
            this.baseStore.popup.isOpen = false;

            // Tries push the data
            var hasWorked = await pushData();

            if(hasWorked){
                // Removes the saved data
                this.baseStore.data = undefined;

                // Shows the info
                this.baseStore.popup = {
                    isOpen: true,
                    text: "Der Raspberry-Pi wird nun das Programm neustarten um die Änderungen anzuwenden.",
                    title: "Daten wurden erfolgreich gespeichert."
                }
            }else{
                this.baseStore.popup = {
                    isOpen: true,
                    text: "Es gab einen Fehler beim Speichern der Daten. Klicke rechts auf 'Speichern' um die Abfrage neu zu starten.",
                    title: "Fehler beim Speichern der Daten"
                }
            }

            // Ensures the loading screen stays on for at least
            // a short while to ensure the user sees that something is happening
            setTimeout(()=>this.baseStore.isPushing = false, 500);
        }
    },
    mounted(){
        this.onRetryLoadDataClicked();
    },
    components: { Loader },
    computed:{
        ...mapStores(useStore),

        isSaveButtonEnabled(){
            return (
                !this.baseStore.isPushing &&
                !this.baseStore.isFetching &&
                this.baseStore.data !== undefined
            ); 
        },

        isRetryButtonEnabled(){
            return (
                !this.baseStore.isPushing &&
                !this.baseStore.isFetching
            );
        }
    }
}
</script>

<template>
    <div class="navbar">
        <div class="btn">
            <input
                @click="onSaveDataClicked"
                type="button" value="Speichern"
                :disabled="isSaveButtonEnabled ? undefined : true"
                />
            <Loader v-if="store.isPushing" />
        </div>

        <div class="btn">
            <input
                @click="onRetryLoadDataClicked"
                type="button" value="Aktualisieren"
                :disabled="isRetryButtonEnabled ? undefined : true"
                />
            <Loader v-if="store.isFetching" />
        </div>
    </div>
</template>

<style scoped lang="scss">

.navbar{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    direction: rtl;
    overflow: hidden;

    .btn{
        direction: ltr;
        border: 2px solid gray;
        border-radius: 5px;
        padding: .4rem .8rem;
        font-size: 1.4rem;
        cursor: pointer;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;

        .loader{
            width: 1.5rem;
            height: 1.5rem;
            margin-left: .4rem; 
        }
    
        &:last-child{
            margin-bottom: 0;
        }
        input{
            width: unset;
            height: unset;
            margin: 0;
            cursor: pointer;
            &[disabled]{
                color: gray;
            }
        }
    }
}

</style>
