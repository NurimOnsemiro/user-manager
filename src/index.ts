import { IUser } from "./@types/user-type";
import { getUser, postUser } from "./routes/user";

export interface Env {}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		return await requestHandler(request, env, ctx);
	},
};

async function requestHandler(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
	//const requestBody: IUser = JSON.parse(await request.text());
	let result: string = ''
	switch(request.method){
		case 'GET':{
			const userId: number = Number(request.url.split('user/')[1])
			result = JSON.stringify(await getUser(userId))
			break
		}
		case 'POST': {
			//await postUser(requestBody)
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
	
	return new Response(result);
}