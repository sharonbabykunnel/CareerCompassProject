import api from "../axios/userInterceptor"
import { Failed } from "../helpers/popup";

const defaultHeaders = {
  "Content-Type": "application/json",
  withCredentials: true,
};

export const postExperience = async (user,values) => {
    try {
        const res = await api.post(
          `/profile/experience/${user}`,
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
        const res = await api.get(`/profile/experience/${user}`, {}, {
            headers:defaultHeaders
        })
        return res
    } catch (error) {
        Failed(error.response ? error.response.message : error.message);
    }
}

export const deleteExperience = async (id) => {
    try {
        const res = await api.delete(`/profile/experience/${id}`)
        return res
    } catch (error) {
        Failed(error.response ? error.response.message : error.message)
    }
}

export const editExperience = async (id,user,values) => {
    try {
        values.user = user
        const res = await api.put(`/profile/experience/${id}`, values , {
            headers:defaultHeaders
        })
        return res;
    } catch (error) {
        Failed(error.response ? error.response.message : error.message);
    }
}