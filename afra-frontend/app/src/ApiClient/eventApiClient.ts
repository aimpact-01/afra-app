
import axios from 'axios'


export const eventApiClient = axios.create({
    baseURL: `https://ceefde25v6-vpce-00885819822df6078.execute-api.us-east-1.amazonaws.com/api/`
})

