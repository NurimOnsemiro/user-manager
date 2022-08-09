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
        }
    ]
}