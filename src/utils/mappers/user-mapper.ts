import {OutUserById} from "../../models/user/ouput/output.type.users";
import {WithId} from "mongodb";
import {UserDbType} from "../../models/db/db.models";

export const userMapperToOutput = (user: WithId<UserDbType>)=> ({
        id: user._id.toString(),
        login: user.login,
        email: user.email,
        createdAt: user.createdAt,
})

export const loginUserMapper = (user: OutUserById) => ({
        email: user.email,
        login: user.login,
        userId: user.id
})