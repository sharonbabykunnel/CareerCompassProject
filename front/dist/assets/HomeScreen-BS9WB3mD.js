import{j as e,u as D,a as T,M as _,e as I,B as z,h as A,s as q,d as O}from"./index-BfulgVQ3.js";import{r as h,u as B}from"./vendor-DoS0LqYF.js";import{H as W}from"./Header_user-DlSEnNXi.js";import{u as Y}from"./useUploadFile-CVp1E-MT.js";import{$ as K}from"./module-DdcInekB.js";import{C as G}from"./Content-CAC3yp4U.js";import{u as J,a as X,Q as Z,b as ee}from"./useInfiniteQuery-TRtL14UB.js";import"./chart-Bxe9v4kL.js";import"./share-2-C-SiDAsF.js";import"./briefcase-business-DVpVTjzf.js";import"./index.esm2017-DWcddl5D.js";import"./firebase-BNWmzrjJ.js";import"./SearchBar-DsAbXLr3.js";import"./search-BEqc-Ren.js";import"./popup-CMwNQmR-.js";import"./ellipsis-Ctiazg5u.js";import"./x-D2pczkxf.js";const se=({onClose:t,openImage:s,openVideo:l,setValue:r,value:g,submit:o})=>{const b=()=>{t(),s()},v=()=>{t(),l()};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10",children:e.jsxs("div",{className:"bg-white p-6 rounded-xl max-h-96 h-full w-full max-w-3xl",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("h2",{className:"text-xl font-bold mb-4",children:"Create a Post"}),e.jsx("img",{onClick:t,className:"w-4 h-4",src:"https://cdn-icons-png.flaticon.com/128/2976/2976286.png",alt:""})]}),e.jsx("div",{className:"flex w-full h-60  rounded mb-4 border-b",children:e.jsx("textarea",{value:g,onChange:n=>r(n),placeholder:"What's on your mind?",className:"w-full h-full p-2 resize-none border-none outline-none",style:{boxShadow:"none"}})}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("div",{className:"flex gap-10",children:[e.jsx("img",{className:"w-10 h-10",src:"https://cdn-icons-png.flaticon.com/128/739/739249.png",alt:"",onClick:b}),e.jsx("img",{className:"w-10 h-10",src:"https://cdn-icons-png.flaticon.com/512/1294/1294269.png",alt:"",onClick:v}),e.jsx("img",{className:"w-10 h-10",src:"https://cdn-icons-png.flaticon.com/128/748/748113.png",alt:""})]}),e.jsx("button",{onClick:()=>o(),className:"bg-blue-500 text-white px-4 py-2 rounded",children:"Post"})]})]})})},R=({setValue:t})=>e.jsxs("div",{children:[e.jsx("h1",{className:"m-4",children:"Select Files to begin"}),e.jsxs("label",{className:"bg-blue-500 text-white px-4 py-2 rounded cursor-pointer",children:["Upload From Computer",e.jsx("input",{type:"file",className:"hidden",onChange:s=>t(s),multiple:!0})]})]}),te=({url:t,index:s})=>e.jsx("div",{className:"flex flex-col items-center justify-center w-[60%]",children:e.jsx("img",{src:t,alt:"Selected Image",className:"max-h-96 max-w-96 object-contain"})},s),re=({setValue:t,value:s,setImage:l})=>{const[r,g]=h.useState(1),o=h.useMemo(()=>s.map(n=>URL.createObjectURL(n))),b=h.useMemo(()=>o.map((n,w)=>e.jsx("div",{className:"relative",children:e.jsx("img",{src:n,className:`object-contain ${r===w+1?"border border-green-600 max-h-24 max-w-24":"m-1 max-h-20 max-w-20"}`,onClick:()=>g(w+1)})},n))),v=n=>{l(w=>w.filter((C,m)=>m!=n-1)),n>1&&g(n-1)};return e.jsxs("div",{className:"flex flex-grow overflow-hidden w-full",children:[e.jsx("div",{className:"border-r flex-grow flex items-center justify-center flex-wrap gap-2 overflow-auto w-[60%] ",children:o==null?void 0:o.map((n,w)=>e.jsx(te,{url:n},n))}),e.jsxs("div",{className:"p-4 flex flex-col justify-between border w-1/3",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex justify-between w-full",children:[e.jsx("h1",{children:`${r}/${s==null?void 0:s.length}`}),e.jsxs("label",{className:"bg-blue-500 text-white px-4 py-2 rounded cursor-pointer",children:["Upload More",e.jsx("input",{type:"file",className:"hidden",onChange:n=>t(n),multiple:!0})]})]}),e.jsx("div",{className:"grid grid-cols-2 gap-4 mt-4",children:b})]}),e.jsx("div",{className:"",children:e.jsx("img",{src:"https://cdn-icons-png.flaticon.com/128/484/484662.png",alt:"Delete",className:"w-5 cursor-pointer ",onClick:()=>v(r)})})]})]})},ae=({onClose:t,next:s,setValue:l,value:r,setImage:g})=>{const o=()=>{s(),t()};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10",children:e.jsxs("div",{className:"bg-white p-3 rounded-xl max-h-[80%] h-full w-full max-w-3xl flex flex-col overflow-hidden",children:[e.jsxs("div",{className:"flex justify-between text-2xl border-b items-center",children:[e.jsx("h1",{children:"Editor"}),e.jsx("img",{src:"https://cdn-icons-png.flaticon.com/128/2976/2976286.png",alt:"",className:"w-5",onClick:t})]}),e.jsx("div",{className:"flex-grow flex items-center justify-center flex-col gap-4 overflow-auto",children:(r==null?void 0:r.length)>0?e.jsx(re,{setValue:l,value:r,setImage:g}):e.jsx(R,{setValue:b=>l(b)})}),e.jsx("div",{className:"flex justify-end border-t pt-3",children:e.jsx("button",{onClick:o,className:"bg-blue-500 text-white px-4 py-2 rounded",children:"Next"})})]})})},U=({url:t,name:s,toggleFunction:l})=>e.jsxs("div",{className:"flex",children:[e.jsx("img",{src:t,alt:s,onClick:l}),e.jsx("span",{className:"pl-3",children:s})]}),le=({src:t,type:s,controls:l=!0,autoplay:r=!0,loop:g=!1,muted:o=!0})=>e.jsx("div",{children:e.jsx("video",{src:t,controls:l,autoPlay:r,loop:g,muted:o,style:{width:"100%",height:"auto"},children:"Your browser does not support the video tag."})}),ne=({onClose:t,value:s,setValue:l,setVideo:r,next:g})=>{const[o,b]=h.useState(1),v=m=>{r(S=>S.filter(($,V)=>V!==m-1)),m>1&&b(m-1)},n=h.useMemo(()=>s?s==null?void 0:s.map(m=>URL.createObjectURL(m)):[],[s]),w=h.useMemo(()=>n.map((m,S)=>e.jsx("div",{className:"relative",children:e.jsx("video",{src:m,className:`object-contain ${o===S+1?"border border-green-600 max-h-24 max-w-24":"m-1 max-h-20 max-w-20"}`,onClick:()=>b(S+1)})},m)),[n,o]),C=()=>{g(),t()};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10",children:e.jsxs("div",{className:"bg-white p-3 rounded-xl max-h-[80%] h-full w-full max-w-3xl flex flex-col overflow-hidden",children:[e.jsxs("div",{className:"flex justify-between text-2xl border-b items-center",children:[e.jsx("h1",{children:"Editor"}),e.jsx("img",{src:"https://cdn-icons-png.flaticon.com/128/2976/2976286.png",alt:"",className:"w-5",onClick:t})]}),e.jsx("div",{className:"flex-grow flex items-center justify-center flex-col gap-4 overflow-auto",children:(s==null?void 0:s.length)>0?e.jsxs("div",{className:"flex flex-grow overflow-hidden w-full",children:[e.jsx("div",{className:"border-r flex-grow flex items-center justify-center flex-wrap gap-2 overflow-auto w-[60%] ",children:n==null?void 0:n.map((m,S)=>e.jsx(le,{src:m,type:"video/mp4"},m))}),e.jsxs("div",{className:"p-4 flex flex-col  border w-1/3  justify-between",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex justify-between w-full",children:[e.jsx("h1",{children:`${o}/${s==null?void 0:s.length}`}),e.jsxs("label",{className:"bg-blue-500 text-white px-4 py-2 rounded cursor-pointer",children:["Upload More",e.jsx("input",{type:"file",className:"hidden",onChange:m=>l(m),multiple:!0})]})]}),e.jsx("div",{className:"grid grid-cols-2 gap-4 mt-4",children:w})]}),e.jsx("div",{className:"",children:e.jsx("img",{src:"https://cdn-icons-png.flaticon.com/128/484/484662.png",alt:"Delete",className:"w-5 cursor-pointer ",onClick:()=>v(o)})})]})]}):e.jsx(R,{setValue:m=>l(m)})}),e.jsx("div",{className:"flex justify-end border-t pt-3",children:e.jsx("button",{onClick:C,className:"bg-blue-500 text-white px-4 py-2 rounded",children:"Next"})})]})})},ie=({user:t,updateQuerryCache:s})=>{const l=D(N=>N.post),r=T(),[g,o]=h.useState(!1),[b,v]=h.useState(!1),[n,w]=h.useState(!1),[C,m]=h.useState(!1),[S,$]=h.useState(0),[V,a]=h.useState(""),[i,c]=h.useState([]),[d,u]=h.useState([]),{uploadFiles:j}=Y(),p=()=>{o(!g)},x=()=>{w(!n)},y=()=>{m(!C)},f=N=>{const Q=N.target.files;c(P=>[...P,...Q])},k=N=>{const Q=N.target.files;u(P=>[...P,...Q])},M=N=>{a(N.target.value)},E=async()=>{try{v(!0),o(!1);const N=await j(d,"vieo",$),Q=await j(i,"image",$),P=new FormData;P.append("text",V),Q==null||Q.forEach((F,ue)=>{P.append("image",F)}),N==null||N.forEach(F=>{P.append("video",F)});const L=await I.post(`${z}/addPost`,P,{headers:{"Content-Type":"multipart-form-data"}});if(L){if(l)r(A({...L.data}));else{r(q({...L.data}));const F={...L.data.post,files:[...L.data.post.content.images,...L.data.post.content.video],user:t};s(F)}a(""),c([]),u([]),o(!1),u(!1),w(!1)}}catch(N){O.error(N.message)}finally{v(!1)}};return e.jsxs("div",{className:"bg-white flex flex-col rounded-xl",children:[e.jsxs("div",{className:"flex px-4",children:[e.jsx("img",{src:t.profilePhoto||"https://cdn-icons-png.flaticon.com/128/3059/3059518.png",className:"w-10 h-10 rounded-full m-4",alt:""}),e.jsx("div",{className:"flex items-center border rounded-3xl w-[90%] m-4 px-4",onClick:p,children:e.jsx("span",{children:"Create a Post"})})]}),e.jsxs("div",{className:"flex justify-around m-2 h-6",children:[e.jsx(U,{url:"https://cdn-icons-png.flaticon.com/128/739/739249.png",name:"Image",toggleFunction:x}),e.jsx(U,{url:"https://cdn-icons-png.flaticon.com/128/2991/2991195.png",name:"Video",toggleFunction:y})]}),g&&e.jsx(se,{onClose:p,openImage:x,openVideo:y,setValue:M,value:V,submit:E}),n&&e.jsx(ae,{onClose:x,next:p,setValue:f,setImage:c,value:i}),C&&e.jsx(ne,{onClose:y,value:d,next:p,setVideo:u,setValue:k}),e.jsx(_,{isOpen:b,className:"fixed inset-0 flex items-center justify-center z-50 mt-[80px]",overlayClassName:"fixed inset-0 bg-black bg-opacity-75",children:e.jsxs("div",{className:" flex-col p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto h-[80vh] overflow-auto flex justify-center items-center scrollbar-hide",children:[e.jsx(K,{}),e.jsx("p",{className:"text-white",children:"Uploading..."})]})})]})},ce=()=>{var V;const t=D(a=>a.presisted.user);h.useEffect(()=>{const a=()=>{const i=document.body.scrollHeight,c=window.scrollY,d=window.innerHeight;c+d>=i&&m()};return m(),document.addEventListener("scroll",a),()=>document.removeEventListener("scroll",a)},[]);const s=async({pageParam:a=0})=>(await I.get(`/post/getpost/${t.uid}/${a}`)).data,l=J(),r=a=>{l.setQueryData(["post"],i=>i?{...i,pages:[[a,...i.pages[0]],...i.pages.slice(1)]}:{pages:[[a]],pageParams:[0]})},g=(a,i)=>{l.setQueryData(["post"],c=>({...c,pages:c.pages.map((d,u)=>u!==a?d:d.filter((j,p)=>p!==i))}))},o=(a,i,c,d)=>{l.setQueryData(["post"],u=>({...u,pages:u.pages.map((j,p)=>p!==a?j:j.map((x,y)=>y!==i?x:{...x,comments:x.comments.map((f,k)=>c!=k?f:{...f,likes:f.likes.includes(d)?f.likes.filter(E=>E!==d):[...f.likes,d]})}))}))},b=(a,i,c,d)=>{l.setQueryData(["post"],u=>({...u,pages:u.pages.map((j,p)=>p===a?j.map((x,y)=>{if(y===i){let f;return d?f=x.likes.filter(k=>k!=c):f=[...x.likes,c],{...x,likes:f}}else return x}):j)}))},v=(a,i,c,d)=>{l.setQueryData(["post"],u=>({...u,pages:u.pages.map((j,p)=>p!==a?j:j.map((x,y)=>{if(y!==i)return x;let f;return c?f=x.saved.filter(k=>k!=d):f=[...x.saved,d],{...x,saved:f}}))}))},n=(a,i,c)=>{l.setQueryData(["post"],d=>({...d,pages:d.pages.map((u,j)=>j!=a?u:u.map((p,x)=>x!==i?p:{...p,comments:p.comments?[...c,...p==null?void 0:p.comments]:[...c]}))}))},w=({pindex:a,index:i,currComment:c,cindex:d})=>{l.setQueryData(["post"],u=>({...u,pages:u.pages.map((j,p)=>p!=a?j:j.map((x,y)=>y!=i?x:{...x,comments:x.comments.map((f,k)=>k!=d?f:{...f,replies:[c,...f==null?void 0:f.replies]})}))}))},{data:C,fetchNextPage:m,hasNextPage:S,isFetchingNextPage:$}=X({queryKey:["post"],queryFn:s,getNextPageParam:(a,i)=>a.length>0?i.length:void 0});return e.jsxs("div",{className:" col-start-2 col-end-4  m-10 rounded-xl  ",children:[e.jsx(ie,{user:t,updateQuerryCache:r}),(V=C==null?void 0:C.pages)==null?void 0:V.map((a,i)=>a==null?void 0:a.map((c,d)=>e.jsx(G,{post:c,user:c.user,userDetails:t,currentUserId:t.uid,index:d,pindex:i,updateQuerryLike:b,updateQueryComment:n,updateQuerrySave:v,updateCommentReplay:w,updatePostList:g,updatePostCommentLike:o},c==null?void 0:c._id))),$&&e.jsx("div",{children:"loading"})]})},H=({btnName:t,navigateTo:s})=>{const l=B(),r=()=>{l(s)};return e.jsx("div",{onClick:r,children:e.jsx("button",{className:"bg-blue-500 text-white py-2 px-4  w-96",children:t})})},oe=({count:t})=>{const[s,l]=h.useState([]);h.useEffect(()=>{l(t/10)},[]);let r;switch(parseInt(s)){case 3:r="30%";break;case 4:r="40%";break;case 5:r="50%";break;case 6:r="60%";break;case 7:r="70%";break;case 8:r="80%";break;case 9:r="90%";break;default:r="100%";break}return e.jsx("div",{className:"bg-white p-2 rounded-lg shadow-md mb-6 flex flex-col items-center",children:e.jsxs("div",{className:"w-full",children:[e.jsx("span",{className:"text-sm text-gray-600",children:"Profile status"}),e.jsx("div",{className:"bg-gray-300 h-2 rounded-full mt-1",children:e.jsx("div",{className:"bg-blue-600 h-full rounded-full",style:{width:r}})})]})})},de=()=>{B();const[t,s]=h.useState(0),{profilePhoto:l,name:r,coverPhoto:g,position:o,about:b,uid:v}=D(n=>n.presisted.user);return h.useEffect(()=>{(async()=>{const w=await I.get(`/user/get/porfileData/${v}`);s(w.data[0].fieldCount-5)})()},[]),e.jsxs("div",{className:" m-4 rounded-xl h-auto overflow-hidden -md",children:[e.jsxs("div",{className:"relative h-32",children:[e.jsx("img",{src:g||"https://via.placeholder.com/800x200.png?text=Cover+Photo",alt:"Cover",className:"w-full h-full object-cover"}),e.jsx("div",{className:"absolute inset-0 bg-black opacity-20"})]}),e.jsxs("div",{className:"relative px-4 pb-4 bg-white rounded-b-3xl",children:[e.jsx("img",{src:l||"https://cdn-icons-png.flaticon.com/128/3059/3059518.png",className:"absolute -top-16 left-4 w-32 h-32 rounded-full border-4 bg-white border-white shadow-lg",alt:"Profile"}),e.jsxs("div",{className:"pt-20",children:[e.jsx("h1",{className:"text-xl font-semibold",children:r}),e.jsx("p",{className:"text-sm text-gray-600 mt-1",children:o}),e.jsx("p",{className:"text-sm text-gray-500 mt-2",children:b})]}),e.jsx(oe,{count:t}),e.jsxs("div",{className:"  flex flex-col rounded items-center",children:[e.jsx(H,{btnName:"View Profile",navigateTo:"/profile/post"}),e.jsx(H,{btnName:"Applied jobs",navigateTo:"/job/applied-jobs"})]})]})]})},xe=new Z,me=()=>e.jsxs("div",{className:"bg-lite_user w-full h-[90vh] grid grid-cols-3 gap-3  ",children:[e.jsx(de,{}),e.jsx("div",{className:"col-span-2 h-full overflow-scroll scrollbar-hide",children:e.jsx(ee,{client:xe,children:e.jsx(ce,{})})})]}),$e=()=>e.jsxs("div",{children:[e.jsx(W,{}),e.jsx(me,{})]});export{$e as default};
