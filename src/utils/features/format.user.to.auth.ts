import {ObjectId} from "mongodb";

export const isValidObjectIdToVerifyToken = (id: string): boolean => {
    return ObjectId.isValid(id)
}