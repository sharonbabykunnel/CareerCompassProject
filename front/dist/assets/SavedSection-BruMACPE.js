import{u as d,r as a,j as r,h as u}from"./index-DNBWHiOW.js";import{C as p}from"./Content-CQtge4Qx.js";import"./SearchBar-ih9sQ4JT.js";import"./search-D8ZgcwT8.js";import"./popup-DFjubwHb.js";import"./ellipsis-BhpQ4qSj.js";import"./x-wBWLGZiv.js";const S=()=>{const o=d(t=>t.presisted.user),[e,i]=a.useState([]);if(a.useEffect(()=>{(async()=>{const s=await u.get(`/post/savedPost/get/${o.uid}`);i(s.data)})()},[]),e.length===0)return r.jsx("div",{className:" col-start-2 col-end-4 mt-4 p-4 h-[30vh] rounded-xl flex justify-center items-center bg-white",children:r.jsx("p",{children:"No Posts yet"})});const n=t=>{i(s=>s.filter(c=>c._id!==t))};return r.jsx("div",{children:Array.isArray(e)&&(e==null?void 0:e.map((t,s)=>r.jsx(p,{filter:n,post:t,user:t.user[0],index:s,currentUserId:o.uid},t._id)))})};export{S as default};