import api from "../axios/userInterceptor"
import { Failed } from "../helpers/popup";

const defaultHeaders = {
  "Content-Type": "application/json",
  withCredentials: true,
};

export const postExperience = async (user,values) => {
    try {
        const res = await api.post(
          `/profile/experience/post/${user}`,
          values,
            { headers: defaultHeaders }
        );
        return res
    } catch (error) {
        Failed(error.response ? error.response.message : error.message);
    }

}

export const getExperience = async (user) => {
    try {
        const res = await api.get(`/profile/experience/get/${user}`, {}, {
            headers:defaultHeaders
        })
        return res
    } catch (error) {
        Failed(error.response ? error.response.message : error.message);
    }
}

export const deleteExperience = async (id) => {
    try {
        const res = await api.delete(`/profile/experience/delete/${id}`)
        return res
    } catch (error) {
        Failed(error.response ? error.response.message : error.message)
    }
}

export const editExperience = async (id,user,values) => {
    try {
        values.user = user
        const res = await api.put(`/profile/experience/update/${id}`, values , {
            headers:defaultHeaders
        })
        return res;
    } catch (error) {
        Failed(error.response ? error.response.message : error.message);
    }
}