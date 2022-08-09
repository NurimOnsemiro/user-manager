import { IUser } from "../@types/user-type";
import { EHttpMethod } from "../constants/http-constant";
import { makeHttpRequestData, sendHttpRequest } from "../utils/http-helper";
import { extractNotionUserData, makeNotionFilterNumberEqual } from "../utils/notion-helper";



export function postUser(user: IUser){
    console.log(user.user_name)
    // Step 1. DB에 user_name이 존재하는지 확인

    // Step 2. 존재하면 에러 반환

    // Step 3. 존재하지 않으면 DB에 추가

    // Step 4. 추가되었으면 성공 반환

    // Step 5. 추가되지 않았으면 에러 반환
}

export async function getUser(userId: number): Promise<IUser>{
    const filter = makeNotionFilterNumberEqual('user_id', userId)
    const reqData = makeHttpRequestData(EHttpMethod.POST, filter)
    const resData = await sendHttpRequest(reqData)
    const results: IUser[] = []
    for(const result of resData.results){
        results.push(extractNotionUserData(result))
    }
    return results?.[0]
}