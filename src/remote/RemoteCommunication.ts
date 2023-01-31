import type { CategoryObject, ImportObject } from "@/schema/DataTypes";
import { useStore } from "@/userinterface/Store";
import { validateData } from "./Validation";


function getExportedData(){
    // Gets the currently loaded data
    const data: ImportObject = useStore().data!;

    // Converts it into an object that is accepted by the poxelbox-server

    // Object with the categorys that shall be updated
    var newCategorys : any = {};

    // Maps all object into the new format
    for(var catName in data){
        const category : CategoryObject = data[catName];

        // List/Object with all items and their corresponding values
        var itemList : any = {};

        for(var itmName in category){
            const itm = category[itmName];

            itemList[itmName] = itm.value;
        }
        newCategorys[catName] = itemList;
    }

    return newCategorys;
}

// Pushes the saved data to the remote server
export async function pushData(){
    try{
        console.log("Sending ",JSON.stringify(getExportedData()));
        // Fetches the data from the remote system
        await fetch("http://localhost:5555/api/push-view",{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            mode: 'cors',

            body: JSON.stringify(getExportedData())
        });

        return true;
    }catch(e){
        console.log(e);
        return false;
    }
   
}

// Fetches the remote data and updates the ui accordingly
export async function fetchRemoteData() : Promise<false|ImportObject>{
    try {

        // Fetches the data from the remote system
        var data = await (await fetch("http://localhost:5555/api/get-view")).json();

        // Ensures the data is valid
        if (!validateData(data)) {
            console.log("Data was invalid ", data);
            return false;
        }

        return data;
    } catch (e) {
        console.log(e);
        return false;
    }
}