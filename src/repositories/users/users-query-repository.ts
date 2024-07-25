import {helperToUser} from "../../middlewares/helper-query-get";
import {usersCollection} from "../../db/db";
import {userMapper} from "../../models/user/mapper/user-mapper";
import {ObjectId} from "mongodb";

export const usersQueryRepository = {
    async getAllUsers(query: any): Promise<any> {
        const {pageNumber, pageSize, sortBy, sortDirection, searchLoginTerm, searchEmailTerm} = helperToUser(query);

        const filter = {
            ...(searchLoginTerm && { login: { $regex: searchLoginTerm, $options: 'i' } }),
            ...(searchEmailTerm && { email: { $regex: searchEmailTerm, $options: 'i' } })
        };

        const AllUsers = await usersCollection
            .find(filter)
            .sort({ [sortBy]: sortDirection })
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
    }
}