
// Support-object to create others
type Brand<K, T> = K & { __brand: T }


export enum ValueTypes {
    FLOAT = "float",
    INT = "int",
    COLOR = "color",
    BOOL = "bool",
    INT_PRESET = "int_preset",
    STR_PRESET = "str_preset"
}

export interface BasicValue<Value>{
    value: Value,
    title?: string,
    type: ValueTypes,
    desc?: string,
    link?: string
}



export type float = Brand<number, "float">;
export type int = Brand<number, "int">;

export interface ColorValue extends BasicValue<number> {};
export interface BoolValue extends BasicValue<boolean> {};
export interface FloatValue extends BasicValue<float> {
    min?: float,
    max?: float
};
export interface IntPresetValue extends BasicValue<int> {
    presets: int[]
};
export interface IntValue extends BasicValue<int> {
    min?: int,
    max?: int
};
export interface StringPresetValue extends BasicValue<string> {
	presets: string[]
};

export interface CategoryObject {[key: string]: BasicValue<any>};

export interface ImportObject {
    [key: string]: CategoryObject
};
