import type { ImportObject } from "@/schema/DataTypes";

import Ajv from "ajv"
import { Schema } from "../schema/DataSchema";

// JSON-Schema-validator
const validateSchema = new Ajv().compile(Schema)

// Returns if the given element is a valid scham-object
export function validateData(raw: object) : raw is ImportObject {
    return validateSchema(raw) as boolean;
}