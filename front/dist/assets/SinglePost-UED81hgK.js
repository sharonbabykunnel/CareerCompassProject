import{c,j as e}from"./index-BfulgVQ3.js";import{r as i,j as k,L as w}from"./vendor-DoS0LqYF.js";import{j as P}from"./index-BmBSCerI.js";import{a as x}from"./adminInterceptor-IvxRshrR.js";import{S as f}from"./popup-CMwNQmR-.js";import{S as U}from"./share-2-C-SiDAsF.js";import"./chart-Bxe9v4kL.js";/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=c("MessageCircle",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=c("ThumbsUp",[["path",{d:"M7 10v12",key:"1qc93n"}],["path",{d:"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",key:"emmmcr"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=c("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=c("UserCheck",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["polyline",{points:"16 11 18 13 22 9",key:"1pwet4"}]]);/**
 * @license lucide-react v0.411.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=c("UserX",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"17",x2:"22",y1:"8",y2:"13",key:"3nzzx3"}],["line",{x1:"22",x2:"17",y1:"8",y2:"13",key:"1swrse"}]]),D=({onBlockPost:S})=>{var p;const[t,b]=i.useState(null),n=k(),[d,m]=i.useState(),[s,y]=i.useState(null);i.useEffect(()=>{var a,o;m((o=(a=n==null?void 0:n.state)==null?void 0:a.post)==null?void 0:o.isBlocked),(async()=>{const l=await x.get(`/post/get/${n.state.post.uid}`);l.data&&(b(l.data[0].user),y(l.data[0]))})()},[]);const u=async()=>{await x.post(`/post/block/${s.uid}`),m(!0),f("Post Blocked")},N=async()=>{await x.post(`/post/unblock/${s.uid}`),m(!1),f("Post UnBlocked")},v=()=>{const{text:r,images:a,video:o}=s.content,l=[...a||[],...o||[]];return e.jsxs("div",{className:"mb-4",children:[r&&e.jsx("p",{className:"text-gray-700 mb-2",children:r}),l.length>0&&e.jsx(P.Carousel,{showThumbs:!1,children:l.map((h,j)=>e.jsx("div",{children:a&&a.includes(h)?e.jsx("img",{src:h,alt:`Content ${j+1}`,className:"w-1/2 object-cover"}):e.jsx("video",{src:h,controls:!0,className:"w-1/2  object-cover"})},j))})]})};return e.jsx("div",{className:"bg-white shadow-lg h-[80vh] rounded-lg overflow-scroll scrollbar-hide",children:s&&t&&e.jsxs(e.Fragment,{children:[e.jsx("div",{children:e.jsxs("div",{className:"flex items-center m-4 mb-0 gap-2",children:[e.jsx(w,{to:"/admin/posts",children:e.jsx("img",{className:"w-8",src:"https://cdn-icons-png.flaticon.com/128/3114/3114883.png"})}),e.jsx("div",{children:"Go back"})]})}),e.jsxs("div",{className:"p-4 pt-0 shadow h-full  ",children:[e.jsxs("div",{className:"flex items-center justify-between m-4",children:[e.jsxs("div",{className:"flex items-center gap-4 relative",children:[e.jsx("img",{src:(t==null?void 0:t.profilePhoto)||"https://cdn-icons-png.flaticon.com/128/3059/3059518.png",alt:"",className:"w-10 h-10 rounded-full"}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-xl",children:t==null?void 0:t.name}),e.jsx("p",{className:" text-xs",children:t==null?void 0:t.position})]})]}),e.jsx("div",{children:e.jsx("span",{className:"text-sm text-gray-500",children:new Date(s.createdAt).toLocaleString()})})]}),v(),e.jsxs("div",{className:"flex justify-between items-center mb-4",children:[e.jsxs("div",{className:"flex space-x-4",children:[e.jsxs("span",{className:"flex items-center",children:[e.jsx(B,{className:"w-5 h-5 mr-1"})," ",s.likes.length]}),e.jsxs("span",{className:"flex items-center",children:[e.jsx(A,{className:"w-5 h-5 mr-1"})," ",s.comments.length]}),e.jsxs("span",{className:"flex items-center",children:[e.jsx(U,{className:"w-5 h-5 mr-1"})," ",s.shares.length]})]}),e.jsxs("span",{className:"text-sm text-gray-500",children:["Visibility: ",s.visibility]})]}),s.tags.length>0&&e.jsxs("div",{className:"mb-4",children:[e.jsx("h3",{className:"font-semibold mb-2",children:"Tags:"}),e.jsx("div",{className:"flex flex-wrap",children:s.tags.map((r,a)=>e.jsx("span",{className:"bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2",children:r},a))})]}),Array.isArray(s==null?void 0:s.reported)&&((p=s==null?void 0:s.reported)==null?void 0:p.length)>0&&e.jsxs("div",{className:"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4",role:"alert",children:[e.jsxs("div",{className:"flex",children:[e.jsx(g,{className:"h-5 w-5 mr-2"}),e.jsx("strong",{className:"font-bold",children:"Post Reported"})]}),e.jsxs("span",{className:"block sm:inline",children:["This post has been reported ",s.reported.length," times."]})]}),!d&&(s==null?void 0:s.reported)&&s.reported.length>0&&e.jsxs("button",{onClick:u,className:"bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center",children:[e.jsx(M,{className:"w-5 h-5 mr-2"}),"Block Post"]}),d&&e.jsxs("div",{className:"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4",role:"alert",children:[e.jsxs("div",{className:"flex",children:[e.jsx(g,{className:"h-5 w-5 mr-2"}),e.jsx("strong",{className:"font-bold",children:"Post Blocked"})]}),e.jsx("span",{className:"block sm:inline",children:"This post has been blocked due to reports."})]}),d&&(s==null?void 0:s.reported)&&s.reported.length>0&&e.jsxs("button",{onClick:N,className:"bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 my-4 rounded w-full flex items-center justify-center",children:[e.jsx(C,{className:"w-5 h-5 mr-2"}),"Unblock Post"]})]})]})})};export{D as default};
