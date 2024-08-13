import {usersCollection} from "../../db/db";
import {userMapper} from "../../utils/mappers/user-mapper";
import {ObjectId} from "mongodb";
import {CreateUserOutputModel} from "../../models/user/ouput/CreateViewModelUserOutput";
import {loginUserMapper} from "../../utils/mappers/login-mapper";
import {queryHelperToUser} from "../../utils/helpers/helper-query-get";

export const usersQueryRepository = {
    async getAllUsers(query: any): Promise<any> {
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
            items: AllUsers.map(user => userMapper(user)),
        };
    },
    async getUserById(id: string): Promise<any> {
        const user = await usersCollection.findOne({_id: new ObjectId(id)});
        if (!user) {
            return null;
        }
        return userMapper(user);
    },
    async LoginMapByUser(userId: string) {
        const loginUser = await this.getUserById(userId);
        if (!loginUser) {
            return null;
        }
        return loginUserMapper(loginUser);
    }

}