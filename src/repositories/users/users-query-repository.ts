import {usersCollection} from "../../db/db";
import {loginUserMapper, userMapperToOutput} from "../../utils/mappers/user-mapper";
import {ObjectId} from "mongodb";
import {queryHelperToUser} from "../../utils/helpers/helper-query-get";
import {InQueryUserModel} from "../../models/user/helper-query-user/helper-user";

export const usersQueryRepository = {
    async getAllUsers(query: InQueryUserModel): Promise<any> {
        const {pageNumber, pageSize, sortBy, sortDirection, searchLoginTerm, searchEmailTerm} = queryHelperToUser(query);

        const filter = {
            $or: [
                searchLoginTerm ? { login: { $regex: searchLoginTerm, $options: 'i' }} : {},
                searchEmailTerm ? { email: { $regex: searchEmailTerm, $options: 'i' }} : {}
            ]
        };

        const AllUsers = await usersCollection
            .find(filter)
            .sort({[sortBy]: sortDirection} )
            .skip((Number(pageNumber) - 1) * Number(pageSize))
            .limit(Number(pageSize))
            .toArray();

        const totalCountsUsers = await usersCollection.countDocuments(filter);

        const pagesCount = Math.ceil(totalCountsUsers / Number(pageSize));

        return {
            pagesCount: +pagesCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: +totalCountsUsers,
            items: AllUsers.map(user => userMapperToOutput(user)),
        };
    },

    async getUserById(id: string): Promise<any> {

        if (!ObjectId.isValid(id)) {
            console.log('Ошибка: Неверный формат ObjectId', id);
            return null;
        }

        const user = await usersCollection.findOne({_id: new ObjectId(id)});
        if (!user) {
            return null;
        }
        return userMapperToOutput(user);
    },

    async LoginMapByUser(userId: string) {
        console.log('ID пользователя при входе:', userId);
        console.log('ID валидация:', ObjectId.isValid(userId));
        const loginUser = await this.getUserById(userId);
        if (!loginUser) {
            return null;
        }
        return loginUserMapper(loginUser);
    }
}