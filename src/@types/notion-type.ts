import {ERecordSort} from '../constants/notion-constant'

export interface INotionResponse {
    results: INotionResultRecord[]
}

export interface INotionResultRecord {
    properties: {
        [key: string]: INotionProperty
    }
}

export interface INotionProperty {
    id: string
    type: 'number' | 'string' | 'title'
    number?: number
    title?: [
        {
            text: {
                content: string
            }
        },
    ]
}

export interface INotionSort {
    property: string
    direction: ERecordSort
}

export interface INotionFilterItem {
    equals: string | number
}

export interface INotionFilter {
    property: string
    number?: INotionFilterItem
    text?: INotionFilterItem
}
