import{u as M,j as e,M as O,d as I}from"./index-BCbUohwl.js";import{u as J}from"./formik.esm-3aPXhBBH.js";import{r as c,j as P}from"./vendor-DoS0LqYF.js";import{E as A}from"./ExperienceForm-85YLA7Ez.js";import{j as R}from"./index-D7NHgj2b.js";import{i as D}from"./job-DGFET02G.js";import{S as q}from"./SelectOption-FtL2YINL.js";import{S as z}from"./popup-FwQMcnFR.js";import{X as H}from"./x-rcQFbWU7.js";import{A as V}from"./arrow-big-left-VUEpZP4d.js";import"./chart-Bxe9v4kL.js";import"./hoist-non-react-statics.cjs-CJLGEjre.js";import"./plus-bR0wRJq7.js";import"./index.esm-CGx7XWO2.js";const te=()=>{var f;const[g,m]=c.useState(!1),[x,u]=c.useState(!0),[h,j]=c.useState(""),[v,y]=c.useState([{},{},{}]),k=M(s=>s.presisted.user),p=P(),n=(f=p==null?void 0:p.state)==null?void 0:f.job,w=async()=>{(await N()).title||m(!0)},b=()=>{m(!1)};c.useEffect(()=>{n&&(d({title:n.title,description:n.description,location:n.location,company:n.company,experience:n.experience,workplaceType:n.workplaceType,immidiate:n.immidiate,experienceLevel:n.experience,skills:n.skills,industry:n.industry,deadline:n.deadline}),m(!0))},[]);const{handleChange:t,handleBlur:i,values:a,errors:l,touched:r,handleSubmit:C,setValues:d,validateForm:N}=J({initialValues:{title:"",company:"",location:"",experience:1,workplaceType:"On-site",jobType:"Full-time",immidiate:!1,experienceLevel:"Entry-level",skills:[],industry:"",deadline:"",description:""},validationSchema:R,onSubmit:async(s,o)=>{try{const L=await I.post(`/job/post/${k.uid}`,{...s,selected:v});z("Posted"),o.resetForm(),b(),u(!0),y([{},{},{}])}catch{}finally{}}}),S=s=>{s.target.select()},T=()=>{d({...a,skills:[...a.skills,h]}),j("")},E=s=>{d({...a,skills:a.skills.filter(o=>o!==s)})},B=()=>{u(!0)},F=async()=>{const s=await N();!s.company&&!s.deadline&&!s.description&&!s.experience&&!s.location&&!s.title&&u(!1)};return e.jsxs("div",{className:"h-[80vh]",children:[e.jsxs("div",{className:"flex flex-col items-center p-6",children:[e.jsx("img",{src:"https://firebasestorage.googleapis.com/v0/b/careercompass-a9b5b.appspot.com/o/logo.png?alt=media&token=bc8fb861-d4b9-441d-8621-17b1e89a8628",alt:"Company Logo",className:"w-[40vw] mb-6"}),e.jsx("h1",{className:"text-2xl  mb-4",children:"Post a Job in a Minute"}),e.jsxs("div",{className:"w-full max-w-md",children:[e.jsx("label",{htmlFor:"job-title",className:"block text-sm  text-gray-700 mb-2",children:"Job Title"}),e.jsx("input",{type:"text",id:"job-title",value:a.title,onChange:s=>d({...a,title:s.target.value}),className:"w-full p-2  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"}),l.title&&e.jsx("div",{className:"text-red-500 text-sm",children:l.title}),e.jsx("button",{className:"bg-blue-500 text-white mt-6 py-2 w-full rounded-md hover:bg-blue-600 transition",onClick:w,children:"Create Now"})]})]}),e.jsx(O,{isOpen:g,className:"fixed inset-0 flex items-center justify-center z-50 ",overlayClassName:"fixed inset-0 bg-black bg-opacity-75",children:e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg   w-[50vw] mx-auto h-[90vh]",children:[e.jsxs("div",{className:"flex justify-between mb-4",children:[e.jsx("h2",{className:"text-2xl font-semibold",children:"Job description"}),x?e.jsx(H,{onClick:b}):e.jsx(V,{onClick:B})]}),e.jsxs("form",{onSubmit:C,className:"flex flex-col h-[80vh] justify-between",children:[e.jsx("div",{className:"overflow-y-auto scrollbar-hide",children:e.jsx("div",{className:"grid grid-cols-2 gap-4",children:x?e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsx("label",{className:"block mb-2",children:"Job Title"}),e.jsx("input",{type:"text",name:"title",value:a.title,onChange:t,onBlur:i,className:"w-full p-2 border rounded"}),l.title&&r.title&&e.jsx("div",{className:"text-red-500 text-sm",children:l.title})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block mb-2",children:"Company"}),e.jsx("input",{type:"text",name:"company",value:a.company,onChange:t,onBlur:i,className:"w-full p-2 border rounded"}),l.company&&e.jsx("div",{className:"text-red-500 text-sm",children:l.company})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block mb-2",children:"Experience"}),e.jsx("input",{type:"number",name:"experience",value:a.experience,onChange:t,onBlur:i,className:"w-full p-2 border rounded"}),l.experience&&r.experience&&e.jsx("div",{className:"text-red-500 text-sm",children:l.experience})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block mb-2",children:"Location"}),e.jsx("input",{type:"text",name:"location",value:a.location,onChange:t,onBlur:i,className:"w-full p-2 border rounded"}),l.location&&e.jsx("div",{className:"text-red-500 text-sm",children:l.location})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block mb-2",children:"Workplace type"}),e.jsxs("select",{name:"workplaceType",value:a.workplaceType,onChange:t,onBlur:i,className:"w-full p-2 border rounded",children:[e.jsx("option",{value:"On-site",label:"On-site"}),e.jsx("option",{value:"Hybrid",label:"Hybrid"}),e.jsx("option",{value:"Remote",label:"Remote"})]}),l.workplaceType&&r.workplaceType&&e.jsx("div",{className:"text-red-500 text-sm",children:l.workplaceType})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block mb-2",children:"Experience level"}),e.jsxs("select",{name:"experienceLevel",value:a.experienceLevel,onChange:t,onBlur:i,className:"w-full p-2 border rounded",children:[e.jsx("option",{value:"Entry-level",label:"Entry-level"}),e.jsx("option",{value:"Mid-level",label:"Mid-level"}),e.jsx("option",{value:"Senior",label:"Senior"}),e.jsx("option",{value:"Executive",label:"Executive"})]}),l.experienceLevel&&r.experienceLevel&&e.jsx("div",{className:"text-red-500 text-sm",children:l.experienceLevel})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block mb-2",children:"Job type"}),e.jsxs("select",{name:"jobType",value:a.jobType,onChange:t,onBlur:i,className:"w-full p-2 border rounded",children:[e.jsx("option",{value:"Full-time",label:"Full-time"}),e.jsx("option",{value:"Part-time",label:"Part-time"}),e.jsx("option",{value:"Internship",label:"Internship"}),e.jsx("option",{value:"Contract",label:"Contract"}),e.jsx("option",{value:"Other",label:"Other"})]}),l.jobType&&r.jobType&&e.jsx("div",{className:"text-red-500 text-sm",children:l.jobType})]}),e.jsxs("div",{className:"flex",children:[e.jsx("label",{className:" m-2",children:"Is an urgant hiring"}),e.jsx("input",{type:"checkbox",name:"isOngoing",value:a.immidiate,onChange:t,onBlur:i,className:"w-8  border  rounded"}),l.immidiate&&r.immidiate&&e.jsx("div",{className:"text-red-500 text-sm",children:l.immidiate})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block mb-2",children:"Min salary"}),e.jsx("input",{type:"number",name:"salarymin",value:a.salarymin,onChange:t,onBlur:i,className:"w-full p-2 border rounded"}),l.salarymin&&r.salarymin&&e.jsx("div",{className:"text-red-500 text-sm",children:l.salarymin})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block mb-2",children:"Max salary"}),e.jsx("input",{type:"number",name:"salarymax",value:a.salarymax,onChange:t,onBlur:i,className:"w-full p-2 border rounded"}),l.salarymax&&r.salarymax&&e.jsx("div",{className:"text-red-500 text-sm",children:l.salarymax})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block mb-2",children:"Application Deadline"}),e.jsx("input",{type:"date",name:"deadline",value:a.deadline.split("T")[0],onChange:t,onBlur:i,className:"w-full p-2 border rounded"}),l.deadline&&r.deadline&&e.jsx("div",{className:"text-red-500 text-sm",children:l.deadline})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block mb-2",children:"Industry"}),e.jsx("select",{name:"industry",value:a.industry,onChange:t,onBlur:i,className:"w-full p-2 border rounded",children:D.map((s,o)=>e.jsx(q,{value:s.value,label:s.label},o))}),l.industry&&e.jsx("div",{className:"text-red-500 text-sm",children:l.industry})]}),e.jsxs("div",{className:" col-span-2",children:[e.jsx("label",{className:"block mb-2",children:"Discription"}),e.jsx("textarea",{onClick:S,type:"text",placeholder:`Tips: Provide a summary of the role, what success in the position looks like, and how this role fits into the organization overall. Responsibilities\r
[Be specific when describing each of the responsibilities. Use gender-neutral, inclusive language.]\r
\r
Example: Determine and develop user requirements for systems in production, to ensure maximum usability\r
\r
Qualifications\r
\r
[Some qualifications you may want to include are Skills, Education, Experience, or Certifications.]\r
\r
Example: Excellent verbal and written communication skills`,name:"description",value:a.description,onChange:t,onBlur:i,className:"w-full p-2 border rounded",rows:"8"}),l.description&&e.jsx("div",{className:"text-red-500 text-sm",children:l.description})]})]}):e.jsxs("div",{className:"col-span-2",children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block mb-2",children:"Skills (max 10)"}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("input",{type:"text",value:h,onChange:s=>j(s.target.value),className:"w-full p-2 border rounded",placeholder:"Enter a skill"}),e.jsx("button",{type:"button",onClick:T,disabled:a.skills.length>=10,className:"ml-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300",children:"Add"})]}),e.jsx("div",{className:"mt-2 flex flex-wrap",children:a.skills.map((s,o)=>e.jsxs("span",{className:"bg-gray-200 px-2 py-1 rounded m-1 flex items-center",children:[s,e.jsx("button",{type:"button",onClick:()=>E(s),className:"ml-2 text-red-500",children:"×"})]},o))}),l.skills&&r.skills&&e.jsx("div",{className:"text-red-500 text-sm",children:l.skills})]}),e.jsx(A,{selected:v,setSelected:y,skills:a.skills})]})})}),e.jsxs("div",{className:"flex m-6 justify-end space-x-2 ",children:[e.jsx("div",{onClick:b,className:"text-gray-500 hover:text-gray-900",children:"Cancel"}),x?e.jsx("div",{onClick:F,className:"text-blue-500 hover:text-blue-900",children:"Next"}):e.jsx("button",{type:"submit",className:"text-blue-500 hover:text-blue-900",children:"Save"})]})]})]})})]})};export{te as default};