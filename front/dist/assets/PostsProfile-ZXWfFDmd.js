import{a as n,u as a,d as c,j as o,s as p}from"./index-tHbs8s1P.js";import{j as u,r as d}from"./vendor-DoS0LqYF.js";import{C as m}from"./Content-B8MXqCIt.js";import"./chart-Bxe9v4kL.js";import"./SearchBar-DyPVO7OF.js";import"./search-C6GrREbn.js";import"./popup-CoJ1F_Xs.js";import"./ellipsis-7unHT2Ye.js";import"./x-CraZlvt7.js";const w=()=>{u();const i=n(),s=a(t=>t.presisted.post.posts)||[],r=a(t=>t.presisted.user);return d.useEffect(()=>{const t=async()=>{try{const e=await c.get("/getAllPost",{uid:r.uid});i(p(e.data))}catch(e){throw e}};return t(),()=>{c.interceptors.request.eject(t)}},[i]),s.length===0?o.jsx("div",{className:" col-start-2 col-end-4 mt-4 p-4 h-[30vh] rounded-xl flex justify-center items-center bg-white",children:o.jsx("p",{children:"No Posts yet"})}):o.jsx("div",{children:Array.isArray(s)&&(s==null?void 0:s.map((t,e)=>o.jsx(m,{userDetails:r,post:t,user:r,index:e,currentUserId:r.uid},t._id)))})};export{w as default};