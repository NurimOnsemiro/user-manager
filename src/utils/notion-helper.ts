import { INotionProperty, INotionResultRecord } from "../@types/notion-type"
import { IUser } from "../@types/user-type"
import { ENotionDataType } from "../constants/notion-constant"

export function makeNotionFilterNumberEqual(propName: string, value: number){
    return {
        property: propName,
        number: {
            equals: value
        }
    }
}

export function makeUserDataTemplate(): IUser{
    return {
        user_name: '',
        user_id: 0,
        user_coin: 0,
        user_level: 0,
        user_experience: 0
    }
}

export function extractNotionUserData(resData: INotionResultRecord): IUser{
    const userData: IUser = makeUserDataTemplate()

    for(const [key, value] of Object.entries(resData.properties)){
        const property = value as INotionProperty
        if(property.type === ENotionDataType.NUMBER){
            userData[key] = property.number ?? 0
        } else if(property.type === ENotionDataType.TITLE){
            userData[key] = property.title?.[0].text.content
        }
    }
    return userData
}