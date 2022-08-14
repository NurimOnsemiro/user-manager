import {IUser} from '../@types/user-type'
import * as notionManager from '../manager/notion-manager'
import {makeNotionPatchUserData, makeNotionPostUserData} from '../utils/notion-helper'

export async function postUser(user: IUser) {
    const userName = user.user_name!
    console.log(userName)
    // Step 1. DB에 user_name이 존재하는지 확인
    {
        const userInfo = await notionManager.getRecordByTextColumn<IUser>('user_name', userName)
        console.log(userInfo)
        if (userInfo !== undefined) {
            throw new Error('user_name already exists')
        }
        console.log('[PASS] user_name does not exist', userName)
    }

    // Step 2. DB에서 가장 높은 user_id를 가져옴
    const highestUserInfo: IUser = await notionManager.getHighestRecordId()
    const userId = (highestUserInfo.user_id ?? 0) + 1
    console.log('[PASS] new user_id', userId)

    // Step 3. user_name과 user_id로 DB에 새로운 user를 추가
    const newUser = makeNotionPostUserData(userName, userId)
    console.log('[PASS] new userInfo', JSON.stringify(newUser))
    await notionManager.postRecord(newUser)
}

export async function getUserByUserId(userId: number): Promise<IUser> {
    const result = await notionManager.getRecordByNumberColumn<IUser>('user_id', userId)
    return result
}

export async function getPageIdByRecordId(userId: number) {
    console.log(`user_id : ${userId}`)
    const ret = await notionManager.getRecordByNumberColumn<IUser>('user_id', userId)
    if (ret == undefined) {
        throw new Error('user_id does not exists')
    }
    return ret.page_id
}

export async function updateUser(userInfo: IUser): Promise<void> {
    // Step 1. DB에 user_name이 존재하는지 확인
    const pageId = await getPageIdByRecordId(userInfo.user_id!)

    // Step 2. 사용자 정보 수정
    const patchUser = makeNotionPatchUserData(userInfo)
    console.log('[PASS] patch userInfo', JSON.stringify(patchUser))
    await notionManager.patchRecord(pageId, patchUser)
}

export async function deleteUser(userId: number): Promise<void> {
    // Step 1. 레코드 페이지 ID 조회
    const pageId = await getPageIdByRecordId(userId)
    // Step 2. 사용자 정보
    const deleteUser = makeNotionPatchUserData({user_id: userId})
    deleteUser.archived = true
    console.log('[PASS] delete userInfo', JSON.stringify(deleteUser))
    await notionManager.patchRecord(pageId, deleteUser)
}
