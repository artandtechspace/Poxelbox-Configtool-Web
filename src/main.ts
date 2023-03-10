import { createApp } from 'vue/dist/vue.esm-bundler';
import App from '@/userinterface/App.vue'
import { createPinia } from 'pinia';

// Css imports
import '@/assets/styles/main.scss'

function start(){
    try{
        // Creates the app
        const pinia = createPinia();
        createApp(App).use(pinia).mount('#app');

        // TODO: Start animation
        console.log("Setup done");
    }catch(e){
        // TODO: Update error handling
        console.log("Error ",e);
        alert(e);
    }
}

start();