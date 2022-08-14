import {IUser} from '../@types/user-type'
import * as userService from '../service/user-service'

export async function postUser(user: IUser) {
    return await userService.postUser(user)
}

export async function getUserByUserId(userId: number): Promise<IUser> {
    return await userService.getUserByUserId(userId)
}

export async function updateUser(userId: number, userInfo: IUser): Promise<void> {
    userInfo.user_id = userId
    return await userService.updateUser(userInfo)
}

export async function deleteUser(userId: number): Promise<void> {
    return await userService.deleteUser(userId)
}
