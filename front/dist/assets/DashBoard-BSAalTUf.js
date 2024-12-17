const __vite__fileDeps=["./Chart-CtjKW1L2.js","./index-DWYqhuEo.js","./vendor-DoS0LqYF.js","./chart-Bxe9v4kL.js","./index-C74bnFT2.css"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{c as b,_ as U,j as s}from"./index-DWYqhuEo.js";import{r}from"./vendor-DoS0LqYF.js";import{a as x}from"./adminInterceptor-Dij8AGrB.js";import{I as g}from"./image-BxU7cKpP.js";import{B as f}from"./briefcase-business-D16usYSC.js";import"./chart-Bxe9v4kL.js";import"./url-C7Fa9dY1.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=b("UsersRound",[["path",{d:"M18 21a8 8 0 0 0-16 0",key:"3ypg7q"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3",key:"10s06x"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=b("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]),J=r.lazy(()=>U(()=>import("./Chart-CtjKW1L2.js"),__vite__mapDeps([0,1,2,3,4]),import.meta.url)),C=()=>{const[y,n]=r.useState(0),[w,l]=r.useState([]),[k,c]=r.useState(),[e,i]=r.useState(""),[N,d]=r.useState(0);r.useEffect(()=>{j()},[]);const j=async()=>{const t=await x.get("/charts/users");l(t.data),i("Users"),c(Math.round(h(t.data))),d(u(t.data)),n(m(t.data))},m=t=>t.reduce((o,a)=>o+a.count,0),u=t=>{const o=new Date().getMonth()+1;return t.filter(a=>a.month===o).reduce((a,p)=>a+p.count,0)},h=t=>t.reduce((a,p)=>a+p.count,0)/t.length,M=async()=>{const t=await x.get("/charts/posts");l(t.data),c(Math.round(h(t.data))),i("Posts"),d(u(t.data)),n(m(t.data))},_=async()=>{const t=await x.get("/charts/jobs");l(t.data),c(Math.round(h(t.data))),i("Jobs"),d(u(t.data)),n(m(t.data))};return s.jsxs("div",{className:"grid grid-flow-row grid-rows-7 grid-cols-6 h-[80vh] gap-4",children:[s.jsxs("div",{className:"bg-admin_lite md:col-span-2 md:row-span-3 m-6 rounded sm:col-span-3 sm:row-span-2",children:[s.jsxs("div",{className:"flex justify-between m-4",children:[s.jsx("h1",{className:"text-xl",children:e}),e==="Users"?s.jsx(v,{}):e==="Posts"&&s.jsx(g,{})]}),s.jsxs("div",{className:"flex flex-col justify-center items-center ",children:[s.jsx("h1",{children:y}),s.jsxs("h2",{children:[k," per month"]})]})]}),s.jsx("div",{className:"bg-admin_lite md:col-span-4 md:row-span-6 m-4 rounded sm:col-span-6 sm:row-span-4",children:s.jsx(J,{data:w})}),s.jsxs("div",{className:"bg-admin_lite md:col-span-2 md:row-span-3 m-6 rounded sm:col-span-3 sm:row-span-2 sm:col-start-4 sm:row-start-1",children:[s.jsxs("div",{className:"flex justify-between m-4",children:[s.jsxs("h1",{className:"text-xl",children:[e," this month"]}),e==="Users"?s.jsx(v,{}):e==="Posts"?s.jsx(g,{}):e==="Jobs"&&s.jsx(f,{})]}),s.jsxs("div",{className:"flex flex-col justify-center items-center ",children:[s.jsx("h1",{}),s.jsx("h2",{children:N})]})]}),s.jsxs("div",{className:"flex m-6 mt-0  col-start-1 col-end-8 justify-around gap-4 items-center px-4 py-1 bg-admin_lite rounded-[15px] ring-1 ring-white",children:[s.jsxs("div",{className:`relative group ${e==="Users"&&"bg-user"} hover:cursor-pointer  p-2 rounded-full transition-all duration-500`,children:[s.jsx(P,{onClick:j}),s.jsx("div",{className:"absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-max px-2 py-1 text-white bg-black rounded-md opacity-0 scale-50 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100",children:"user"})]}),s.jsxs("div",{className:`relative group hover:cursor-pointer ${e==="Posts"&&"bg-user"} hover:bg-slate-800 p-2 rounded-full transition-all duration-500`,children:[s.jsx(g,{onClick:M}),s.jsx("div",{class:"absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-max px-2 py-1 text-white bg-black rounded-md opacity-0 transform scale-50 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100",children:"Posts"})]}),s.jsxs("div",{className:`relative group hover:cursor-pointer ${e==="Jobs"&&"bg-user"} hover:bg-slate-800 p-2 rounded-full transition-all duration-500`,children:[s.jsx(f,{onClick:_}),s.jsx("div",{class:"absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-max px-2 py-1 text-white bg-black rounded-md opacity-0 transform scale-50 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100",children:"Jobs"})]})]})]})};export{C as default};
