import{u as g,j as e,d as c}from"./index-BCbUohwl.js";import{r as n,u as j,L as f}from"./vendor-DoS0LqYF.js";import{C as b}from"./clock-BRkJgm9H.js";import{E as v}from"./ellipsis-DxtzLwnZ.js";import"./chart-Bxe9v4kL.js";const E=()=>{const d=g(t=>t.presisted.user),[a,r]=n.useState([]),[m,l]=n.useState(-1),o=n.useRef(),x=j();n.useEffect(()=>{(async()=>{const i=await c.get(`/job/getPostedJobs/${d.uid}`);r(i.data)})();const s=i=>{o.current&&!o.current.contains(i.target)&&l(-1)};return document.addEventListener("mousedown",s),()=>document.removeEventListener("mousedown",s)},[]);const h=t=>{l(t)},u=async t=>{await c.delete(`/job/delete/${t}`),r(s=>s.filter(i=>i._id!==t))},p=(t,s)=>{x(`/job/view-application/${s}`,{state:{job:a[t]}})};return a.length<1?e.jsx("div",{className:"p-4 max-w-4xl mx-auto",children:e.jsx("div",{className:"flex justify-between mb-6",children:e.jsxs("h1",{className:"text-3xl font-bold text-gray-800",children:["No Job posted yet ,",e.jsx(f,{to:"/job/create-job",children:"post one in a minute"})]})})}):e.jsxs("div",{className:"p-6",children:[e.jsx("div",{className:"flex justify-between items-center mb-4",children:e.jsxs("h1",{className:"text-2xl font-bold",children:["Posted jobs(",a.length,")"]})}),e.jsx("div",{className:"space-y-4",children:a==null?void 0:a.map((t,s)=>e.jsxs("div",{className:"flex  justify-between bg-white p-4 rounded-lg shadow",children:[e.jsx("div",{className:"flex items-center",onClick:()=>p(s,t._id),children:e.jsxs("div",{children:[e.jsx("h2",{className:"font-bold",children:t.title}),e.jsx("p",{className:"text-sm text-gray-600",children:t.company}),e.jsx("div",{className:"flex items-center text-xs text-gray-500 mt-1",children:e.jsxs("span",{children:["Location: ",t.location]})}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(b,{size:12,className:"mr-1"}),e.jsxs("span",{children:["Created at ",new Date(t.createdAt).toLocaleDateString([],{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})]})]})]})}),e.jsx("div",{className:"flex ",children:e.jsx(v,{onClick:()=>h(s)})}),m===s&&e.jsx("div",{ref:o,className:"absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5",children:e.jsx("div",{className:"py-1",role:"menu","aria-orientation":"vertical","aria-labelledby":"options-menu",children:e.jsx(e.Fragment,{children:e.jsx("button",{onClick:()=>u(t._id),className:"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left",role:"menuitem",children:"Delete Post"})})})})]},t._id))})]})};export{E as default};