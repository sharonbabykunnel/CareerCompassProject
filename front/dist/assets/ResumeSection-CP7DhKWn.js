import{r as o,u as n,c as R,j as e,Y as N,S as m,F as y,Z as v}from"./index-D_QFsu5T.js";import{a as S}from"./module-BGlolXFu.js";import{u as F,a as w}from"./educationService-u5hmw5z4.js";import{u as U}from"./useUploadFile-kpyq9Z_o.js";import{X as C}from"./x-DoUUZ_jp.js";import{F as E}from"./file-text-CQcgYchu.js";import{T as k}from"./trash-BmPxz2lJ.js";import"./index.esm2017-DhEr8kJa.js";import"./firebase-CrR4kOw2.js";const z=()=>{const[d,c]=o.useState(!1),[l,t]=o.useState(null),[$,u]=o.useState(0),a=n(s=>s.presisted.profile.resume),p=n(s=>s.presisted.user.uid),i=R(),{uploadFile:f}=U(),h=async s=>{const r=s.target.files[0];r&&t(r)},x=async()=>{try{c(!0);const s=await f(l,"resume",u),g=(await F(p,s.resume)).data;i(N(g)),m("Resume updated successfully"),t(null)}catch(s){console.error("Error updating resume:",s),y("Upload failed")}finally{c(!1)}},b=()=>{t(null)},j=async s=>{await w(s)&&(i(v(s)),m("Resume Deleted Successfully"))};return e.jsxs("div",{className:"p-6 bg-gray-100 rounded-lg shadow-md mt-4",children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4",children:"Resume"}),d?e.jsx("div",{className:"w-full h-full flex items-center justify-center",children:e.jsx(S,{visible:!0,height:"80",width:"80",color:"#3333ff",ariaLabel:"three-dots-loading"})}):e.jsx("div",{children:e.jsxs("div",{className:"flex items-center mb-4",children:[l?e.jsx("button",{onClick:x,className:"bg-blue-500 hover:bg-blue-600 ml-0 text-white py-2 px-4 rounded-lg",children:"Upload Resume"}):e.jsxs(e.Fragment,{children:[e.jsx("input",{type:"file",id:"resume",name:"resume",accept:".pdf,.doc,.docx",onChange:h,className:"hidden"}),e.jsx("label",{htmlFor:"resume",className:"cursor-pointer bg-blue-500 hover:bg-blue-600 ml-0 text-white py-2 px-4 rounded-lg",children:"Choose Resume"})]}),l&&e.jsxs("span",{className:"ml-4 border flex items-center p-2 rounded",children:["Selected File: ",l.name,e.jsx(C,{onClick:b,className:"ml-2 cursor-pointer"})]})]})}),a&&a.length>0?e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Uploaded Resumes:"}),e.jsx("ul",{className:"space-y-2",children:a.map((s,r)=>e.jsxs("li",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex",children:[e.jsx(E,{className:"mr-2"}),e.jsx("a",{href:s.resume,target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:underline",children:s.name||`Resume ${r+1}`})]}),e.jsx(k,{onClick:()=>j(s._id)})]},s._id))})]}):e.jsx("div",{children:"No Resumes"})]})};export{z as default};
