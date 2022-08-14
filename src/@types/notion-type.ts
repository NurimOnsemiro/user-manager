import {ERecordSort} from '../constants/notion-constant'

export interface INotionResponse {
    results: INotionResultRecord[]
}

export interface INotionResultRecord {
    id: string
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

export interface INotionUserData {
    parent?: {
        type: 'database_id'
        database_id: string
    }
    page_id?: string
    archived?: boolean
    properties: {
        user_name?: {
            title: [
                {
                    text: {
                        content: string
                    }
                },
            ]
        }
        user_coin?: {
            number: number
        }
        user_level?: {
            number: number
        }
        user_experience?: {
            number: number
        }
        user_id: {
            number: number
        }
    }
}
