import{l as g,u as b,j as s,e as c,d}from"./index-BfulgVQ3.js";import{u as y,r}from"./vendor-DoS0LqYF.js";import{F as N}from"./popup-CMwNQmR-.js";import{_ as v}from"./lodash-CtiV8GMO.js";import{S as w}from"./search-BEqc-Ren.js";import{C as S}from"./clock-C-AuAquU.js";import"./chart-Bxe9v4kL.js";const D=({})=>{const{socket:i}=g();y();const[l,o]=r.useState([]),[C,n]=r.useState(""),a=b(e=>e.presisted.user);r.useEffect(()=>{(async()=>{try{const t=await c.get("/connection/mutuals/"+a.uid);o(t.data)}catch(t){d.error(t.message)}})()},[]);const u=async e=>{try{const t=await c.post("/connection/buildConnection",{uid:e.uid,user:a.uid});if(t.data){const h={...t.data,requester:[a]};i.emit("sendRequest",e.uid,h),o(f=>f.filter(j=>j.user._id!=e._id)),d("Request Sended")}}catch{N("Allready sended a request")}},m=async e=>{const t=await c.get(`/connection/mutuals/${a.uid}?value=${e}`);o(t.data)},p=r.useMemo(()=>v.debounce(m,3e3),[]),x=e=>{n(e.target.value),p(e.target.value)};return s.jsxs("div",{className:" p-4",children:[s.jsxs("div",{className:"flex justify-between items-center mb-4",children:[s.jsx("h1",{className:"text-2xl font-bold",children:"Mutuals"}),s.jsx("div",{className:"text-purple-600 cursor-pointer",children:"Sort by newly added"})]}),s.jsxs("div",{className:"relative mb-6",children:[s.jsx("input",{type:"text",placeholder:"Search",className:"w-full p-2 pl-10 border border-purple-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600",onChange:x}),s.jsx(w,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",size:20})]}),s.jsx("div",{className:"space-y-4",children:l==null?void 0:l.map(e=>s.jsxs("div",{className:"flex items-center justify-between bg-white p-4 rounded-lg shadow",children:[s.jsxs("div",{className:"flex items-center",children:[s.jsx("img",{src:e.user.profilePhoto||"https://cdn-icons-png.flaticon.com/128/3059/3059518.png",alt:e.name,className:"w-16 h-16 rounded-full mr-4"}),s.jsxs("div",{children:[s.jsx("h2",{className:"font-bold",children:e.user.name}),s.jsx("p",{className:"text-sm text-gray-600",children:e.skills}),s.jsxs("div",{className:"flex items-center text-xs text-gray-500 mt-1",children:[s.jsx(S,{size:12,className:"mr-1"}),s.jsxs("span",{children:["Connected ",e.connectedTime]})]})]})]}),s.jsx("button",{className:"px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded-full hover:bg-purple-100 transition-colors",onClick:()=>u(e.user),children:"Request"})]},e.user.uid))})]})};export{D as default};
