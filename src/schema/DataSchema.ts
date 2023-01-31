
function getBasicValues(typeName: string) {
    return {
        "type": { "type": "string", "pattern": typeName },
        "desc": { "type": "string" },
        "title": { "type": "string" }
    }
}

const Requirements = ["type", "value"];

export const Schema = {
    "type": "object",
    "patternProperties": {
        "[a-zA-Z0-9_]+": {
            "type": "object",
            "patternProperties": {
                "[a-zA-Z0-9_]+": {
					"anyOf": [
						// Bool
						{
							"type": "object",
							"properties":{
                                ...getBasicValues("bool"),
								"value": { "type": "boolean" },
							},
							"required": Requirements
						},
						// Color
						{
							"type": "object",
							"properties":{
                                ...getBasicValues("color"),
								"value": { "type": "integer" }
							},
							"required": Requirements
						},
						// Float
						{
							"type": "object",
							"properties":{
                                ...getBasicValues("float"),
								"value": { "type": "number" },
                                "min": { "type": "number" },
                                "max": { "type": "number" },
							},
							"required": Requirements
						},
						// Integer
						{
							"type": "object",
							"properties":{
                                ...getBasicValues("int"),
								"value": { "type": "integer" },
                                "min": { "type": "integer" },
                                "max": { "type": "integer" },
							},
							"required": Requirements
						},
						// Int-Preset
						{
							"type": "object",
							"properties":{
                                ...getBasicValues("int_preset"),
								"value": { "type": "integer" },
                                "presets": {
                                    "type": "array",
                                    "items":{
                                        "type": "integer"
                                    }
                                }
							},
							"required": [...Requirements,"presets"]
						},
						// String-Preset
						{
							"type": "object",
							"properties":{
                                ...getBasicValues("str_preset"),
								"value": { "type": "string" },
                                "presets": {
                                    "type": "array",
                                    "items":{
                                        "type": "string"
                                    }
                                }
							},
							"required": [...Requirements,"presets"]
						},
					]
                },
                "additionalProperties": false
            }
        }
    }
}