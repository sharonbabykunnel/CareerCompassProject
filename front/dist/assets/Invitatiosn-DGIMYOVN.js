import{c as g,o as v,a as b,r as o,u as N,B as r,X as y,j as t,h as l}from"./index-D_QFsu5T.js";import{C as w}from"./clock-BHs5Sil7.js";const k=({})=>{const u=g(),{socket:d}=v();b();const[m,i]=o.useState([]),[h,C]=o.useState(""),p=N(e=>e.presisted.user);o.useEffect(()=>{(async()=>{const s=await l.get("/connection/invitations/"+p.uid);i(s.data)})(),d.on("newRequest",s=>{i(a=>[s,...a]),r("New Connection Invitation"),u(y(s))})},[]);const x=async e=>{try{const s=await l.patch("/connection/acceptRequest/"+e._id,{some:"value"},{headers:{"Content-Type":"application/json"}});if(s.data){const a={...s.data,otherUser:[p]};d.emit("acceptRequest",e.requester[0].uid,a),i(n=>n.filter(f=>f._id!=e._id)),r(s.data.message)}}catch(s){r.error(s.message)}},j=async e=>{try{(await l.patch("/connection/rejectRequest/"+e,{},{headers:{"Content-Type":"application/json"}})).data&&(i(a=>a.filter(n=>n._id!=e)),r("Invitation Rejected"))}catch(s){r(s.message)}},c=m.reduce((e,s)=>(s.requester[0].name.toLowerCase().includes(h.toLowerCase())?e.unshift(s):e.push(s),e),[]);return t.jsxs("div",{className:" p-4",children:[t.jsxs("div",{className:"flex justify-between items-center mb-4",children:[t.jsx("h1",{className:"text-2xl font-bold",children:"Invitations"}),t.jsx("div",{className:"text-purple-600 cursor-pointer",children:"Sort by newly added"})]}),t.jsx("div",{className:"space-y-4",children:c==null?void 0:c.map(e=>t.jsxs("div",{className:"flex items-center justify-between bg-white p-4 rounded-lg shadow",children:[t.jsxs("div",{className:"flex items-center",children:[t.jsx("img",{src:e.requester[0].profilePhoto||"https://cdn-icons-png.flaticon.com/128/3059/3059518.png",alt:e.name,className:"w-16 h-16 rounded-full mr-4"}),t.jsxs("div",{children:[t.jsx("h2",{className:"font-bold",children:e.requester[0].name}),t.jsx("p",{className:"text-sm text-gray-600",children:e.skills}),t.jsxs("div",{className:"flex items-center text-xs text-gray-500 mt-1",children:[t.jsx(w,{size:12,className:"mr-1"}),t.jsxs("span",{children:["Connected ",e.connectedTime]})]})]})]}),t.jsx("button",{className:"px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded-full hover:bg-purple-100 transition-colors",onClick:()=>x(e),children:"Accept"}),t.jsx("button",{className:"px-4 py-2 bg-purple-600  border border-purple-600 rounded-full hover:bg-purple-100 transition-colors",onClick:()=>j(e._id),children:"Reject"})]},e._id))})]})};export{k as default};