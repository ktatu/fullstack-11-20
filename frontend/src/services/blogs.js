import axios from "axios"
const baseUrl = "/api/blogs"

let userToken = null

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async (blogData) => {
    console.log("blog data ", blogData)

    const config = {
        headers: { Authorization: userToken }
    }

    const res = await axios.post(baseUrl, blogData, config)

    console.log("palautettu blogi createn johdosta ", res.data)
    return res.data
}

const remove = async (blogId) => {
    const config = {
        headers: { Authorization: userToken }
    }

    await axios.delete(baseUrl + "/" + blogId, config)
}

const update = async (blog) => {
    const config = {
        headers: { Authorization: userToken }
    }

    const res = await axios.put(baseUrl + "/" + blog.id, blog, config)

    return res.data
}

const setToken = token => {
    userToken = `bearer ${token}`
}

export default { getAll, create, setToken, remove, update }