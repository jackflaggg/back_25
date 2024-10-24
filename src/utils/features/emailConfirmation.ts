import {randomUUID} from "node:crypto";
import {emailInfo} from "../../models/user/ouput/output-type-users";
import {add} from "date-fns/add";
import {UUID} from "crypto";

//const conf = randomUUID()
// TODO: УЗнать почему при получении данных меняется код confirmation
export const emailConfirmation = (
    confirmationCode: UUID | null = randomUUID(),
    expirationDate: Date | null = add(new Date(), {hours: 1, minutes: 30}),
    isConfirmed: boolean = false
): emailInfo  => {
    return {
        confirmationCode,
        expirationDate,
        isConfirmed
    }
}