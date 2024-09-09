import {ObjectId} from "mongodb";

export const validateId  = (id: string) => {
    return ObjectId.isValid(id);
}