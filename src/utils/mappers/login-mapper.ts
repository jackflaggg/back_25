import {WithId} from "mongodb";
import {UserDbType} from "../../models/db/db.models";

export const loginUserMapper = (user: WithId<UserDbType>) => {
    return {
        email: user.email,
        login: user.login,
        userId: user.id
    }
}