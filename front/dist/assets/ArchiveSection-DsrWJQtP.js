import{u as n,r as o,j as s,h as c}from"./index-BaErjgBV.js";import{C as d}from"./Content-DsE6kW5r.js";import"./SearchBar-BEjhs9iZ.js";import"./search-GTD8mMS3.js";import"./popup-BXYOKbYg.js";import"./ellipsis-Dfsq_Rzp.js";import"./x-BfwtZw6T.js";const j=()=>{const i=n(e=>e.presisted.user),[t,a]=o.useState([]);return o.useEffect(()=>{(async()=>{const r=await c.get(`/post/archive/get/${i.uid}`);a(r.data)})()},[]),t.length===0?s.jsx("div",{className:" col-start-2 col-end-4 mt-4 p-4 h-[30vh] rounded-xl flex justify-center items-center bg-white",children:s.jsx("p",{children:"No Posts yet"})}):s.jsx("div",{children:Array.isArray(t)&&(t==null?void 0:t.map((e,r)=>s.jsx(d,{post:e,user:e.user[0],index:r,currentUserId:i.uid},e._id)))})};export{j as default};