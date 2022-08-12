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
            case 'GET': {
                const userId: number = Number(request.url.split('user/')[1])
                result = JSON.stringify(await httpController.getUserByUserId(userId))
                break
            }
            case 'POST': {
                const requestBody = JSON.parse(await request.text())
                await httpController.postUser(requestBody)
                break
            }
            case 'PUT': {
                break
            }
            case 'DELETE': {
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
