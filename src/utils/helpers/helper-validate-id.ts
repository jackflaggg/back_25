import {ObjectId} from "mongodb";

export const validateId  = (id: string): boolean => {
    return ObjectId.isValid(id);
}