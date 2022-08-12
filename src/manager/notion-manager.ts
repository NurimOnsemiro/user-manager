import {INotionFilter, INotionResponse, INotionSort} from '../@types/notion-type'
import {EHttpMethod} from '../constants/http-constant'
import {ERecordSort, NOTION_DB_API, NOTION_PAGE_API} from '../constants/notion-constant'
import {
    extractNotionData,
    makeNotionFilterNumberEqual,
    makeNotionFilterTextEqual,
    makeNotionRequestData,
    makeNotionSortNumber,
} from '../utils/notion-helper'

async function sendNotionRequest<T>(uri: string, requestData: T): Promise<INotionResponse> {
    const result = await fetch(uri, requestData)
    return JSON.parse(await result.text())
}

export async function getRecordByNumberColumn<T>(columnName: string, value: number) {
    const filter = makeNotionFilterNumberEqual(columnName, value)
    return await getRecord<T>({filter})
}

export async function getRecordByTextColumn<T>(columnName: string, value: string) {
    const filter = makeNotionFilterTextEqual(columnName, value)
    return await getRecord<T>({filter})
}

export async function getHighestRecordId<T>() {
    const sorts = makeNotionSortNumber('user_id', ERecordSort.DESC)
    return await getRecord<T>({sorts: [sorts]})
}

export async function postRecord(record: any) {
    const reqData = makeNotionRequestData(EHttpMethod.POST, {
        ...record,
    })
    await sendNotionRequest(NOTION_PAGE_API, reqData)
}

interface IGetRecordOptions {
    filter?: INotionFilter
    sorts?: INotionSort[]
}

async function getRecord<T>(recordOptions: IGetRecordOptions) {
    const {filter, sorts} = recordOptions
    const reqData = makeNotionRequestData(EHttpMethod.POST, {
        filter: filter as INotionFilter,
        sorts: sorts as INotionSort[],
    })
    const resData = await sendNotionRequest(NOTION_DB_API, reqData)
    const results: T[] = []
    for (const result of resData.results) {
        results.push(extractNotionData(result))
    }
    return results?.[0]
}
