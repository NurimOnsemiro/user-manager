import {default as config} from '../../config/live.json'

export default (configKey: 'notion') => {
    return config[configKey]
}
