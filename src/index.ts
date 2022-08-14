import {EHttpMethod} from './constants/http-constant'
import * as httpController from './controller/http-controller'

export interface Env {}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        return await requestHandler(request, env, ctx)
    },
}

async function requestHandler(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    try {
        let result: string = ''
        switch (request.method) {
            case EHttpMethod.GET: {
                const userId: number = Number(request.url.split('user/')[1])
                result = JSON.stringify(await httpController.getUserByUserId(userId))
                break
            }
            case EHttpMethod.POST: {
                const requestBody = JSON.parse(await request.text())
                const userId: number = await httpController.postUser(requestBody)
                result = JSON.stringify({user_id: userId})
                break
            }
            case EHttpMethod.PATCH: {
                const userId: number = Number(request.url.split('user/')[1])
                const requestBody = JSON.parse(await request.text())
                await httpController.updateUser(userId, requestBody)
                break
            }
            case EHttpMethod.DELETE: {
                const userId: number = Number(request.url.split('user/')[1])
                await httpController.deleteUser(userId)
                break
            }
            default: {
                break
            }
        }
        return new Response(result)
    } catch (err) {
        return new Response((err as Error).message, {status: 500})
    }
}
