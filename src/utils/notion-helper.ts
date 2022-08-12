import {INotionFilter, INotionProperty, INotionResultRecord, INotionSort} from '../@types/notion-type'
import {IUser} from '../@types/user-type'
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

export function makeNotionRequestData(method: string, body: object) {
    return {
        method: method,
        headers: {
            Authorization: `Bearer ${NOTION_CONFIG.private_token}`,
            'Notion-Version': '2021-05-11',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }
}

export function makeNotionPostUserData(userName: string, userId: number) {
    return {
        parent: {
            type: 'database_id',
            database_id: NOTION_CONFIG.database_id,
        },
        properties: {
            user_name: {
                title: [
                    {
                        text: {
                            content: userName,
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
                number: userId,
            },
        },
    }
}

export function extractNotionData(resData: INotionResultRecord) {
    const userData: any = {}
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
