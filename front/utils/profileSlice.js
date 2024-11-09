import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    education: [],
    resume: [],
    posts: [],
    experiences: [],
    projects: [],
    isLoading: false, // Add this line
  },
  reducers: {
    updateEducationSuccess: (state, action) => {
      state.education = action.payload;
    },
    removeEducation: (state, action) => {
      state.education = state.education.filter(
        (edu) => edu._id !== action.payload
      );
    },
    addUserEducation: (state, action) => {
      state.education.unshift(action.payload);
    },
    updateEducation: (state, action) => {
      state.education = state.education.map((edu) => {
        if (edu._id != action.payload._id) return edu
        return action.payload
      })
    },
    updateExperienceSuccess: (state, action) => {
      state.experiences = action.payload;
    },
    pushExperienceSuccess: (state, action) => {
      state.experiences.unshift(action.payload);
    },
    removeExperienceSuccess: (state, action) => {
      state.experiences = state.experiences.filter(
        (exp) => exp._id !== action.payload
      );
    },
    updateExperience: (state, action) => {
      state.experiences = state.experiences.map((exp) => {
        if (exp._id !== action.payload._id) return exp;
        return action.payload;
      });
    },
    updateProjectSuccess: (state, action) => {
      state.projects = action.payload;
    },
    updateUserResume: (state, action) => {
      state.resume.push(action.payload);
    },
    removeUserResume: (state, action) => {
      state.resume = state.resume.filter((res) => res._id !== action.payload);
    },
    setExperiencesLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  updateEducationSuccess,
  removeEducation,
  addUserEducation,
  updateEducation,
  updateExperienceSuccess,
  updateExperience,
  updateProjectSuccess,
  updateUserResume,
  removeUserResume,
  removeExperienceSuccess,
  pushExperienceSuccess,
  setExperiencesLoading,
} = profileSlice.actions;

export default profileSlice.reducer;
