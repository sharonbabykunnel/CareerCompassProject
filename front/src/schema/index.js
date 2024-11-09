import * as Yup from "yup";

const trimmedString = Yup.string().trim();

export const educationSchema = Yup.object({
  course: trimmedString.required("Course name is required"),
  institution: trimmedString.required("Institution name is required"),
  grade: trimmedString.required("Grade is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date must be after start date"),
});

export const experienceSchema = Yup.object().shape({
  position: trimmedString.required("Job title is required"),
  company: trimmedString.required("Company name is required"),
  city: trimmedString.required("Company location is required"),
  startDate: Yup.date().required("Start date is required"),
  currentJob: Yup.boolean(),
  endDate: Yup.date()
    .nullable()
    .test(
      "end-date-test",
      "End date must be after start date",
      function (value) {
        const { currentJob, startDate } = this.parent;
        if (currentJob) return true;
        if (!value)
          return this.createError({ message: "End date is required" });
        return (
          value > startDate ||
          this.createError({ message: "End date must be after start date" })
        );
      }
    ),
});

export const userSchema = Yup.object().shape({
  name: trimmedString.required("Name is required"),
  number: Yup.number()
    .required("Number is required")
    .min(10, "Phone number must have 10 number"),
  email: trimmedString
    .email("Invalid email address")
    .required("Email is required"),
});

export const jobPostSchema = Yup.object().shape({
  title: trimmedString
    .required("Job title is required")
    .min(3, "Job title must be at least 3 characters")
    .max(100, "Job title must not exceed 100 characters"),

  company: trimmedString
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must not exceed 100 characters"),

  location: trimmedString
    .required("Location is required")
    .max(100, "Location must not exceed 100 characters"),

  experience: Yup.number()
    .required("Experience is required")
    .positive("Experience must be a positive number")
    .integer("Experience must be a whole number")
    .max(50, "Experience must not exceed 50 years"),

  workplaceType: trimmedString
    .required("Workplace type is required")
    .oneOf(["On-site", "Hybrid", "Remote"], "Invalid workplace type"),

  jobType: trimmedString
    .required("Job type is required")
    .oneOf(
      ["Full-time", "Part-time", "Internship", "Contract", "Other"],
      "Invalid job type"
    ),

  immidiate: Yup.boolean(),

  experienceLevel: trimmedString
    .required("Experience level is required")
    .oneOf(
      ["Entry-level", "Mid-level", "Senior", "Executive"],
      "Invalid experience level"
  ),
    
  industry: Yup.string().required("Choose any from this"),

  skills: Yup.array()
    .of(trimmedString)
    .min(1, "At least one skill is required")
    .max(10, "Maximum 10 skills are allowed"),

  deadline: Yup.date().min(new Date(), "Deadline must be in the future"),

  description: trimmedString
    .required("Job description is required")
    .min(50, "Description must be at least 50 characters")
    .max(5000, "Description must not exceed 5000 characters"),

  salarymin: Yup.number().positive("Minimum salary must be a positive number"),

  salarymax: Yup.number()
    .positive("Maximum salary must be a positive number")
    .moreThan(
      Yup.ref("salarymin"),
      "Maximum salary must be greater than minimum salary"
    ),

  selected: Yup.array().of(
    Yup.object().shape({
      skill: trimmedString.required("Skill is required"),
      number: Yup.number()
        .required("Years of experience is required")
        .positive("Years of experience must be a positive number")
        .integer("Years of experience must be a whole number"),
      mustHave: Yup.boolean(),
    })
  ),
});
