import{u as m,r as i,j as r,h as n}from"./index-BaErjgBV.js";import{C as u}from"./Content-DsE6kW5r.js";import{S as l}from"./popup-BXYOKbYg.js";import"./SearchBar-BEjhs9iZ.js";import"./search-GTD8mMS3.js";import"./ellipsis-Dfsq_Rzp.js";import"./x-BfwtZw6T.js";const y=()=>{const o=m(e=>e.presisted.user),[s,a]=i.useState([]);if(i.useEffect(()=>{(async()=>{const t=await n.get(`/post/rePosted/get/${o.uid}`);a(t.data)})()},[]),s.length===0)return r.jsx("div",{className:" col-start-2 col-end-4 mt-4 p-4 h-[30vh] rounded-xl flex justify-center items-center bg-white",children:r.jsx("p",{children:"No Posts yet"})});const c=async e=>{(await n.delete(`/post/rePosted/remove/${o.uid}/${e}`)).data&&(a(d=>d.filter(p=>p.uid!==e)),l("Post removed from reposts"))};return r.jsx("div",{children:Array.isArray(s)&&(s==null?void 0:s.map((e,t)=>r.jsx(u,{removeRepost:c,post:e,user:e.user[0],index:t,currentUserId:o.uid},e._id)))})};export{y as default};