import {INotionFilter, INotionProperty, INotionResultRecord, INotionSort, INotionUserData} from '../@types/notion-type'
import {IUser} from '../@types/user-type'
import {EHttpMethod} from '../constants/http-constant'
import {ENotionDataType, ERecordSort, NOTION_CONFIG} from '../constants/notion-constant'

export function makeNotionFilterNumberEqual(propName: string, value: number): INotionFilter {
    return {
        property: propName,
        number: {
            equals: value,
        },
    }
}

export function makeNotionFilterTextEqual(propName: string, value: string): INotionFilter {
    return {
        property: propName,
        text: {
            equals: value,
        },
    }
}

export function makeNotionSortNumber(propName: string, direction: ERecordSort): INotionSort {
    return {
        property: propName,
        direction,
    }
}

export function makeUserDataTemplate(): IUser {
    return {
        user_name: '',
        user_id: 0,
        user_coin: 0,
        user_level: 0,
        user_experience: 0,
    }
}

export function makeNotionRequestData(method: EHttpMethod, body: object) {
    return {
        method: method,
        headers: {
            Authorization: `Bearer ${NOTION_CONFIG.private_token}`,
            'Notion-Version': '2021-05-11',
            'Content-Type': 'application/json',
        },
        body: method !== EHttpMethod.GET ? JSON.stringify(body) : undefined,
    }
}

/**
 * 신규 사용자 등록 데이터 생성
 *
 * @param userName 사용자 이름
 * @param userId 사용자 식별자
 * @returns 신규 등록 사용자 정보
 */
export function makeNotionPostUserData(userName: string, userId: number): INotionUserData {
    const userData = makeNotionUserDataTemplate()
    userData.parent = {
        type: 'database_id',
        database_id: NOTION_CONFIG.database_id,
    }
    userData.properties.user_name!.title[0].text.content = userName
    userData.properties.user_id.number = userId
    return userData
}

/**
 * 사용자 정보 수정
 *
 * @param userInfo 사용자 정보
 * @returns 수정된 사용자 정보
 */
export function makeNotionPatchUserData(userInfo: IUser) {
    const userData = makeNotionUserDataTemplate()
    userData.properties.user_id.number = userInfo.user_id!
    if (userInfo.user_name) {
        userData.properties.user_name!.title[0].text.content = userInfo.user_name
    } else {
        userData.properties.user_name = undefined
    }

    if (userInfo.user_coin) {
        userData.properties.user_coin!.number = userInfo.user_coin
    } else {
        userData.properties.user_coin = undefined
    }

    if (userInfo.user_level) {
        userData.properties.user_level!.number = userInfo.user_level
    } else {
        userData.properties.user_level = undefined
    }

    if (userInfo.user_experience) {
        userData.properties.user_experience!.number = userInfo.user_experience
    } else {
        userData.properties.user_experience = undefined
    }

    return userData
}

function makeNotionUserDataTemplate(): INotionUserData {
    return {
        properties: {
            user_name: {
                title: [
                    {
                        text: {
                            content: '',
                        },
                    },
                ],
            },
            user_coin: {
                number: 0,
            },
            user_level: {
                number: 1,
            },
            user_experience: {
                number: 0,
            },
            user_id: {
                number: 0,
            },
        },
    }
}

export function extractNotionData(resData: INotionResultRecord): any {
    const userData: any = {
        page_id: resData.id,
    }
    for (const [key, value] of Object.entries(resData.properties)) {
        const property = value as INotionProperty
        if (property.type === ENotionDataType.NUMBER) {
            userData[key] = property.number ?? 0
        } else if (property.type === ENotionDataType.TITLE) {
            userData[key] = property.title?.[0].text.content
        }
    }
    return userData
}

// export function extractNotionUserData(resData: INotionResultRecord): IUser {
//     const userData: IUser = makeUserDataTemplate()

//     for (const [key, value] of Object.entries(resData.properties)) {
//         const property = value as INotionProperty
//         if (property.type === ENotionDataType.NUMBER) {
//             userData[key] = property.number ?? 0
//         } else if (property.type === ENotionDataType.TITLE) {
//             userData[key] = property.title?.[0].text.content
//         }
//     }
//     return userData
// }
