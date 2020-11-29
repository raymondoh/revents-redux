import {delay} from '../utils/asyncDelay'
import {sampleData} from './sampleData'


export function fetchSampleData() {
    return delay(5000)
    .then(() => {
        return Promise.resolve(sampleData)
    })
}