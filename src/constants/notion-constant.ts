import config from '../utils/config-helper'

export const enum ENotionDataType {
    NUMBER = 'number',
    TITLE = 'title',
    STRING = 'string',
}

export const enum EUserColumn {
    USER_ID = 'user_id',
    USER_NAME = 'user_name',
    USER_COIN = 'user_coin',
    USER_LEVEL = 'user_level',
    USER_EXPERIENCE = 'user_experience',
}

export const NOTION_CONFIG = config('notion')

export const NOTION_DB_API = `https://api.notion.com/v1/databases/${config('notion').database_id}/query`
export const NOTION_PAGE_API = `https://api.notion.com/v1/pages`

export const enum ERecordSort {
    ASC = 'ascending',
    DESC = 'descending',
}
