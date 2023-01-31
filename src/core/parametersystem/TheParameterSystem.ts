import { useStore } from "@/userinterface/Store";
import { isValidParameterName } from "./ParameterSystemChecks";
import { ParameterSystemErrorType, type ParameterSystemError, type SystemParameter, type UserParameter } from "./ParameterSystemTypes";
import { Lexer } from "./equasionsolver/internal/Lexer";
import { Parser } from "./equasionsolver/internal/Parser";
import { Solver } from "./equasionsolver/internal/Solver";

// All system-parameter names
export const SystemParams = {
    LED_AMOUNT: "ledAmount"
};

class ParameterSystem {

    // Id counter to internally uniquely identify parameters in one (Program)-instance
    private idCounter = 0;

    // Holds all system-parameters
    private sysparams: SystemParameter[] = [];

    // Store for ui-elements
    private store: any;

    // List with errors (Is refreshed by calling the checkForErrors-method)
    private errorList: ParameterSystemError[] = [];

    /**
     * Initalizes the prameter-system-model
     * This is used to initalize all system-parameters.
     */
    public init(){
        this.store = useStore();

        // Creates the default system parameters
        // TODO: Return led amount once environment is added
        this.createSystemParameter(SystemParams.LED_AMOUNT, ()=> 42);
    }

    /**
     * Creates a system-parameter.
     * This shall only be called inside the init-method
     */
    private createSystemParameter(name: string, getter: ()=>number) : SystemParameter{
        var prm: SystemParameter = {
            name,
            getter
        };

        this.sysparams.push(prm);

        return prm;
    }


    // Updates the internal error-check, which can be read using the getErrorParameters-method
    public checkForErrors(){
        // Clears the error-list
        this.errorList = [];

        // Local set with duplicated names (Prevents duplicated error message for duplicated names xD)
        var duplicatedNames = new Set<number>(); 

        // Checks every user-parameter for any errors
        for(var param of this.getUserParameters() as UserParameter[]){

            // Checks for an invalid value
            if(isNaN(param.value))
                this.errorList.push({
                    type: ParameterSystemErrorType.INVALID_VALUE,
                    instanceId: param.instanceId
                });

            // Checks if the name is invalid
            if(!isValidParameterName(param.name))
                this.errorList.push({
                    instanceId: param.instanceId,
                    type: ParameterSystemErrorType.INVALID_NAME
                })

            // Checks the name against every other parmeter (For duplicated names)
            for(var mdl2 of this.getUserParameters() as UserParameter[]){
                // Ensures no self-checks
                if(param.instanceId === mdl2.instanceId)
                    continue;
                
                // Checks if the name matches
                if(param.name === mdl2.name){
                    duplicatedNames.add(param.instanceId);
                    duplicatedNames.add(mdl2.instanceId);
                }
            }

            // Checks the name against every system-parameter (For duplicated names)
            for(var sysPrm of this.sysparams)
                if(sysPrm.name === param.name){
                    duplicatedNames.add(param.instanceId);
                    break;
                }
         }

         // Appends the duplication error also to the error list
         duplicatedNames.forEach(err=>this.errorList.push({
            instanceId: err,
            type: ParameterSystemErrorType.DUPLICATED_NAME
         }));
    }

    
    // Creates a user-parameter only on the model, the view will not be influenced by this
    public createUserParameter(name: string, value: number) : UserParameter{
        var prm: UserParameter = {
            instanceId: this.idCounter++,
            name: name,
            value: value
        };

        // Pushes the new parameter
        this.getUserParameters().push(prm);

        return prm;
    }

    // Deletes a user parameter based on it's instance-id
    public deleteUserParameter(instanceId: number) {
        // Filters out that parameter
        this.store.__parameter.params = this.getUserParameters().filter((prm: UserParameter)=>prm.instanceId !== instanceId);
    }

    // Returns if a given user-parameter (By id) had an error detected
    public hasParameterError(instanceId: number) : boolean{
        return this.errorList.some(err=>err.instanceId === instanceId);
    }


    // Returns the system parameters
    public getSystemParameters(){
        return this.sysparams;
    }

    public getUserParameters(){
        return this.store.__parameter.params as UserParameter[];
    }

    /**
     * Takes in a name from eigther a system- or userparameter and returns the value of it.
     * 
     * Ensure that no parameter has any errors, otherwise the method could return unexpected/old/ununique values.
     * (Basically refresh the error-check and make sure there are no errors before)
     * 
     */
    public getParameterByName(name: string) : number|undefined{

        // Tries the system-parameters first
        var sysprm = this.sysparams.find(prm=>prm.name===name);

        if(sysprm !== undefined)
            return sysprm.getter();

        // Tries to user-parameters secondly
        var usrprm = this.getUserParameters().find(prm=>prm.name===name);

        if(usrprm !== undefined)
            return usrprm.value;

        // Parameter couldn't be found
        return undefined;
    }
    
    // Equasion-solver utils
    private solver = new Solver();
    private parser = new Parser();
    private lexer = new Lexer();

    /**
     * Performs a calculation based on the given text. Eg. 1 + 3 + 4 and includes the parameter-system
     * @param text the text to parse (Calculate)
     * @returns the calculated number
     * 
     * @throws {string} error if any should show up
     */
    public performCalculation(text: string) : number|string {
        try{
            var tokens = this.lexer.makeTokens(text);
    
            var ast = this.parser.parse(tokens);
    
            return this.solver.solve(ast);
        }catch(e){
            return e as string;
        }
    }
}


export const TheParameterSystem = new ParameterSystem();