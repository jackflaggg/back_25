import {createString} from "../../../helpers-e2e/datatests";


export const inCreateUser = () => ({
    login: createString(10),
    password: createString(10),
    email: 'testUser@email.com'
})
