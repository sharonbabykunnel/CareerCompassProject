import{j as s,a as o,b as r,O as d,c as m,r as p,d as h}from"./index-BXhJPcLJ.js";import"./index.esm2017-BS_sI9wt.js";import"./firebase-B1n_VfNi.js";import"./module-CiCOhmAX.js";import{a as u}from"./adminInterceptor-Ut5hqYuP.js";import"./url-C7Fa9dY1.js";const b=({src:e,name:t,navigateSideMenu:a})=>s.jsxs("div",{className:"flex sm:ml-6   w-10 h-10 p-2 m-2 ",onClick:a,children:[s.jsx("img",{src:e,alt:""}),s.jsx("div",{className:"pl-8 sm:hidden md:block ",children:s.jsx("span",{children:t})})]}),x=[{src:"https://cdn-icons-png.flaticon.com/128/2549/2549900.png",name:"Home",path:"/admin"},{src:"https://cdn-icons-png.flaticon.com/128/9775/9775307.png",name:"Users",path:"/admin/users"},{src:"https://cdn-icons-png.flaticon.com/128/11167/11167608.png",name:"Posts",path:"/admin/posts"},{src:"https://cdn-icons-png.flaticon.com/128/2910/2910810.png",name:"Jobs",path:"/admin/jobs"}],g=()=>{const e=o(),t=r();return s.jsxs("div",{className:"grid grid-cols-5  bg-admin_lite h-[90%]",children:[s.jsx("div",{className:"col-span-1 bg-white justify-between flex flex-col m-10 rounded",children:x.map(a=>s.jsx(b,{src:a.src,name:a.name,navigateSideMenu:()=>e(`${a.path}`),isSelected:t.pathname===a.path},a.name))}),s.jsx("div",{className:"col-span-4 bg-white m-10 rounded",children:s.jsx(d,{})})]})},j=()=>{const e=o(),t=m(),[a,n]=p.useState(!1),c=()=>{n(!a)},i=async()=>{try{await u.post("/auth/logout"),t(h()),e("/admin/login")}catch(l){throw l}};return s.jsxs("div",{className:"flex justify-between items-center p-4 px-10 bg-admin_lite",children:[s.jsx("div",{children:s.jsx("img",{src:"https://firebasestorage.googleapis.com/v0/b/careercompass-a9b5b.appspot.com/o/logo3.png?alt=media&token=863e9e4c-817a-4dc6-b93d-61351120d4ad",alt:"Logo",className:"h-10 w-auto"})}),s.jsxs("div",{children:[s.jsx("div",{className:"relative w-10 h-[34px] mx-auto",children:s.jsxs("label",{onClick:c,className:"block w-full h-full cursor-pointer",children:[s.jsx("div",{className:`absolute left-0 right-0 h-1 bg-[#7b52b9] rounded-[2px] opacity-100 transition-[bottom,transform] duration-[350ms] ease-[cubic-bezier(.5,-0.35,.35,1.5)] 
                        ${a?"rotate-[-135deg] delay-0 bottom-[calc(50%-2px)]":"bottom-[calc(50%+13px)] delay-[210ms]"}`}),s.jsx("div",{className:`absolute left-0 right-0 h-1 bg-[#7b52b9] rounded-[2px] opacity-100 transition-[opacity,transform] duration-[350ms] ease-[cubic-bezier(.5,-0.35,.35,1.5)] top-[calc(50%-2px)]
                        ${a?"opacity-0 rotate-[-135deg] delay-[105ms]":"delay-[105ms]"}`}),s.jsx("div",{className:`absolute left-0 right-0 h-1 bg-[#7b52b9] rounded-[2px] opacity-100 transition-[top,transform] duration-[350ms] ease-[cubic-bezier(.5,-0.35,.35,1.5)] 
                        ${a?"rotate-[-225deg] top-[calc(50%-2px)] delay-[210ms]":"top-[calc(50%+13px)] delay-0"}`})]})}),a&&s.jsx("button",{onClick:i,className:" m-4 absolute",children:"logout"})]})]})},k=()=>s.jsxs("div",{className:"bg-admin_lite h-screen",children:[s.jsx(j,{}),s.jsx(g,{})]});export{k as default};
