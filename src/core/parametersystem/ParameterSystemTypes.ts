// User-Parameter with name, value and some other properties
export type UserParameter = {
    // Numeric value of the parameter (Can be NAN if an valid value has been set)
    value: number,

    // This name can be duplicated over multiple parameters but that will be displayed as an error to the user
    name: string,

    // Unique id for every user parameter for this instance of the program.
    // THIS CAN BE DIFFERENT WHEN RELOADING THE PARAMETER
    instanceId: number
}

// System-Parameter with name and internal getter to dynamically update the value whenever rendered 
export type SystemParameter = {
    // Unique name of the parameter
    name: string,

    // Internal getter for the value
    getter: ()=>number
}


export enum ParameterSystemErrorType {
    DUPLICATED_NAME,
    INVALID_VALUE,
    INVALID_NAME
}


export type ParameterSystemError = {
    instanceId: number,
    type: ParameterSystemErrorType
}