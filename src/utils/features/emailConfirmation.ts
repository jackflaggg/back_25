import {randomUUID} from "node:crypto";
import {emailInfo} from "../../models/user/ouput/output-type-users";
import {add} from "date-fns/add";

export const emailConfirmation = () :emailInfo  => {
    return {
        confirmationCode: randomUUID(),
        expirationDate: add(new Date(), {
            hours: 1,
            minutes: 30
        }).toISOString(),
        isConfirmed: false }
}