const axios = require('axios')
const baseURL = 'https://como-fazer-e5652.firebaseio.com/'
const auth =  'xQqSunV90NefHEJPSiXzJ3roRMS6Eeie6HInrhGB'

const list = async(key) => {
    console.log('API LIST')
    const content = await axios.get(baseURL + key + '.json?auth=' + auth)
    if(content.data) {
        const objetos = Object.keys(content.data)
                            .map(key => {
                                return {
                                    id: key,
                                    ...content.data[key]
                                }
                            })
    
        return objetos
    }

    return []
}

const apagar = async(key, id) => {
    console.log('API DELETE')
    await axios.delete(baseURL + key + `/${id}.json?auth=${auth}`)
    return true
}

const get = async(key, id) => {
    console.log('API GET')
    const content = await axios.get(`${baseURL}${key}/${id}.json?auth=${auth}`)

        return {
            id: id, 
            ...content.data
        }
}

const update = async(key, id, data) => {
    console.log('API UPDATE')
    await axios.put(`${baseURL}${key}/${id}.json?auth=${auth}`, data)
    return true
}

const create = async(key, data) => {
    console.log("API CREATE")
    await axios.post(`${baseURL}${key}.json?auth=${auth}`, data)
    return true
}

module.exports = { 
    list, get, apagar, update, create
}