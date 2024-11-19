import api from './../axios/userInterceptor.js'
import {Failed} from './../helpers/popup.js'

const defaultHeaders = {
  "Content-Type": "application/json",
  withCredentials: true,
};

export const deleteEducation = async (id) => {
  try {
    const res = await api.delete(`/education/${id}`, {
      withCredentials: true,
    });

    return res;
  } catch (err) {
    Failed(err.response ? err.response.data.message : err.message);
  }
};

export const editEducation = async (selectedEducationId,  values) => {
  try {
    let res = await api.patch(
      `/education/${selectedEducationId}`,
      values,
      { headers: defaultHeaders }
    );
    return res;
  } catch (err) {
    Failed(err.response ? err.response.data.message : err.message);
  }
};

export const addEducation = async (userId, values) => {
  try {
    const res = await api.post(
      `/education/${userId}`,
      values,
      { headers: defaultHeaders }
    );
    return res;
  } catch (err) {
    Failed(err.response ? err.response.data.message : err.message);
  }
};

export const getEducation = async (user) => {
  try {
    const res = await api.get(`/education/${user}`, {
      withCredentials: true,
    });
    return res;
  } catch (err) {
    Failed(err.response ? err.response.data.message : err.message);
  }
};


export const uploadResume = async (userId, resumeUrl) => {
  try {
    const res = await api.post(
      `/profile/resume/add/${userId}`,
      { resume: resumeUrl },
      {
        withCredentials: true,
      }
    );

    return res;
  } catch (err) {
    Failed(err.response ? err.response.data.message : err.message);
  }
};

export const deleteUserResume = async (id) => {
    try {
        const res = await api.delete(`/profile/resume/delete/${id}`)
        return res;
    } catch (error) {
        Failed(error.response ? error.response.message : error.message);
    }
}
