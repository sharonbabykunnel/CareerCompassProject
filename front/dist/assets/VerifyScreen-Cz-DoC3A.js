import{a as ue,j as _,b as fe,B as le,e as re,i as he}from"./index-BfulgVQ3.js";import{r as w,g as ye,j as me,u as ge}from"./vendor-DoS0LqYF.js";import{P as u}from"./chart-Bxe9v4kL.js";var ve=["sitekey","onChange","theme","type","tabindex","onExpired","onErrored","size","stoken","grecaptcha","badge","hl","isolated"];function W(){return W=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var o=arguments[n];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},W.apply(this,arguments)}function be(e,n){if(e==null)return{};var o={},r=Object.keys(e),t,c;for(c=0;c<r.length;c++)t=r[c],!(n.indexOf(t)>=0)&&(o[t]=e[t]);return o}function C(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function xe(e,n){e.prototype=Object.create(n.prototype),e.prototype.constructor=e,V(e,n)}function V(e,n){return V=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,t){return r.__proto__=t,r},V(e,n)}var T=function(e){xe(n,e);function n(){var r;return r=e.call(this)||this,r.handleExpired=r.handleExpired.bind(C(r)),r.handleErrored=r.handleErrored.bind(C(r)),r.handleChange=r.handleChange.bind(C(r)),r.handleRecaptchaRef=r.handleRecaptchaRef.bind(C(r)),r}var o=n.prototype;return o.getCaptchaFunction=function(t){return this.props.grecaptcha?this.props.grecaptcha.enterprise?this.props.grecaptcha.enterprise[t]:this.props.grecaptcha[t]:null},o.getValue=function(){var t=this.getCaptchaFunction("getResponse");return t&&this._widgetId!==void 0?t(this._widgetId):null},o.getWidgetId=function(){return this.props.grecaptcha&&this._widgetId!==void 0?this._widgetId:null},o.execute=function(){var t=this.getCaptchaFunction("execute");if(t&&this._widgetId!==void 0)return t(this._widgetId);this._executeRequested=!0},o.executeAsync=function(){var t=this;return new Promise(function(c,b){t.executionResolve=c,t.executionReject=b,t.execute()})},o.reset=function(){var t=this.getCaptchaFunction("reset");t&&this._widgetId!==void 0&&t(this._widgetId)},o.forceReset=function(){var t=this.getCaptchaFunction("reset");t&&t()},o.handleExpired=function(){this.props.onExpired?this.props.onExpired():this.handleChange(null)},o.handleErrored=function(){this.props.onErrored&&this.props.onErrored(),this.executionReject&&(this.executionReject(),delete this.executionResolve,delete this.executionReject)},o.handleChange=function(t){this.props.onChange&&this.props.onChange(t),this.executionResolve&&(this.executionResolve(t),delete this.executionReject,delete this.executionResolve)},o.explicitRender=function(){var t=this.getCaptchaFunction("render");if(t&&this._widgetId===void 0){var c=document.createElement("div");this._widgetId=t(c,{sitekey:this.props.sitekey,callback:this.handleChange,theme:this.props.theme,type:this.props.type,tabindex:this.props.tabindex,"expired-callback":this.handleExpired,"error-callback":this.handleErrored,size:this.props.size,stoken:this.props.stoken,hl:this.props.hl,badge:this.props.badge,isolated:this.props.isolated}),this.captcha.appendChild(c)}this._executeRequested&&this.props.grecaptcha&&this._widgetId!==void 0&&(this._executeRequested=!1,this.execute())},o.componentDidMount=function(){this.explicitRender()},o.componentDidUpdate=function(){this.explicitRender()},o.handleRecaptchaRef=function(t){this.captcha=t},o.render=function(){var t=this.props;t.sitekey,t.onChange,t.theme,t.type,t.tabindex,t.onExpired,t.onErrored,t.size,t.stoken,t.grecaptcha,t.badge,t.hl,t.isolated;var c=be(t,ve);return w.createElement("div",W({},c,{ref:this.handleRecaptchaRef}))},n}(w.Component);T.displayName="ReCAPTCHA";T.propTypes={sitekey:u.string.isRequired,onChange:u.func,grecaptcha:u.object,theme:u.oneOf(["dark","light"]),type:u.oneOf(["image","audio"]),tabindex:u.number,onExpired:u.func,onErrored:u.func,size:u.oneOf(["compact","normal","invisible"]),stoken:u.string,hl:u.string,badge:u.oneOf(["bottomright","bottomleft","inline"]),isolated:u.bool};T.defaultProps={onChange:function(){},theme:"light",type:"image",tabindex:0,size:"normal",badge:"bottomright"};var ae={exports:{}},a={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d=typeof Symbol=="function"&&Symbol.for,Y=d?Symbol.for("react.element"):60103,J=d?Symbol.for("react.portal"):60106,N=d?Symbol.for("react.fragment"):60107,I=d?Symbol.for("react.strict_mode"):60108,$=d?Symbol.for("react.profiler"):60114,A=d?Symbol.for("react.provider"):60109,k=d?Symbol.for("react.context"):60110,K=d?Symbol.for("react.async_mode"):60111,D=d?Symbol.for("react.concurrent_mode"):60111,F=d?Symbol.for("react.forward_ref"):60112,U=d?Symbol.for("react.suspense"):60113,Se=d?Symbol.for("react.suspense_list"):60120,M=d?Symbol.for("react.memo"):60115,z=d?Symbol.for("react.lazy"):60116,we=d?Symbol.for("react.block"):60121,_e=d?Symbol.for("react.fundamental"):60117,Re=d?Symbol.for("react.responder"):60118,Oe=d?Symbol.for("react.scope"):60119;function l(e){if(typeof e=="object"&&e!==null){var n=e.$$typeof;switch(n){case Y:switch(e=e.type,e){case K:case D:case N:case $:case I:case U:return e;default:switch(e=e&&e.$$typeof,e){case k:case F:case z:case M:case A:return e;default:return n}}case J:return n}}}function se(e){return l(e)===D}a.AsyncMode=K;a.ConcurrentMode=D;a.ContextConsumer=k;a.ContextProvider=A;a.Element=Y;a.ForwardRef=F;a.Fragment=N;a.Lazy=z;a.Memo=M;a.Portal=J;a.Profiler=$;a.StrictMode=I;a.Suspense=U;a.isAsyncMode=function(e){return se(e)||l(e)===K};a.isConcurrentMode=se;a.isContextConsumer=function(e){return l(e)===k};a.isContextProvider=function(e){return l(e)===A};a.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===Y};a.isForwardRef=function(e){return l(e)===F};a.isFragment=function(e){return l(e)===N};a.isLazy=function(e){return l(e)===z};a.isMemo=function(e){return l(e)===M};a.isPortal=function(e){return l(e)===J};a.isProfiler=function(e){return l(e)===$};a.isStrictMode=function(e){return l(e)===I};a.isSuspense=function(e){return l(e)===U};a.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===N||e===D||e===$||e===I||e===U||e===Se||typeof e=="object"&&e!==null&&(e.$$typeof===z||e.$$typeof===M||e.$$typeof===A||e.$$typeof===k||e.$$typeof===F||e.$$typeof===_e||e.$$typeof===Re||e.$$typeof===Oe||e.$$typeof===we)};a.typeOf=l;ae.exports=a;var Le=ae.exports,Q=Le,je={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},Ee={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Pe={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},ce={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},X={};X[Q.ForwardRef]=Pe;X[Q.Memo]=ce;function ne(e){return Q.isMemo(e)?ce:X[e.$$typeof]||je}var Ce=Object.defineProperty,Te=Object.getOwnPropertyNames,oe=Object.getOwnPropertySymbols,Ne=Object.getOwnPropertyDescriptor,Ie=Object.getPrototypeOf,ie=Object.prototype;function de(e,n,o){if(typeof n!="string"){if(ie){var r=Ie(n);r&&r!==ie&&de(e,r,o)}var t=Te(n);oe&&(t=t.concat(oe(n)));for(var c=ne(e),b=ne(n),x=0;x<t.length;++x){var p=t[x];if(!Ee[p]&&!(o&&o[p])&&!(b&&b[p])&&!(c&&c[p])){var h=Ne(n,p);try{Ce(e,p,h)}catch{}}}}return e}var $e=de;const Ae=ye($e);function q(){return q=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var o=arguments[n];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},q.apply(this,arguments)}function ke(e,n){if(e==null)return{};var o={},r=Object.keys(e),t,c;for(c=0;c<r.length;c++)t=r[c],!(n.indexOf(t)>=0)&&(o[t]=e[t]);return o}function De(e,n){e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.__proto__=n}var S={},Fe=0;function Ue(e,n){return n=n||{},function(r){var t=r.displayName||r.name||"Component",c=function(x){De(p,x);function p(y,s){var i;return i=x.call(this,y,s)||this,i.state={},i.__scriptURL="",i}var h=p.prototype;return h.asyncScriptLoaderGetScriptLoaderID=function(){return this.__scriptLoaderID||(this.__scriptLoaderID="async-script-loader-"+Fe++),this.__scriptLoaderID},h.setupScriptURL=function(){return this.__scriptURL=typeof e=="function"?e():e,this.__scriptURL},h.asyncScriptLoaderHandleLoad=function(s){var i=this;this.setState(s,function(){return i.props.asyncScriptOnLoad&&i.props.asyncScriptOnLoad(i.state)})},h.asyncScriptLoaderTriggerOnScriptLoaded=function(){var s=S[this.__scriptURL];if(!s||!s.loaded)throw new Error("Script is not loaded.");for(var i in s.observers)s.observers[i](s);delete window[n.callbackName]},h.componentDidMount=function(){var s=this,i=this.setupScriptURL(),f=this.asyncScriptLoaderGetScriptLoaderID(),m=n,E=m.globalName,g=m.callbackName,R=m.scriptId;if(E&&typeof window[E]<"u"&&(S[i]={loaded:!0,observers:{}}),S[i]){var O=S[i];if(O&&(O.loaded||O.errored)){this.asyncScriptLoaderHandleLoad(O);return}O.observers[f]=function(v){return s.asyncScriptLoaderHandleLoad(v)};return}var P={};P[f]=function(v){return s.asyncScriptLoaderHandleLoad(v)},S[i]={loaded:!1,observers:P};var L=document.createElement("script");L.src=i,L.async=!0;for(var Z in n.attributes)L.setAttribute(Z,n.attributes[Z]);R&&(L.id=R);var ee=function(j){if(S[i]){var pe=S[i],H=pe.observers;for(var te in H)j(H[te])&&delete H[te]}};g&&typeof window<"u"&&(window[g]=function(){return s.asyncScriptLoaderTriggerOnScriptLoaded()}),L.onload=function(){var v=S[i];v&&(v.loaded=!0,ee(function(j){return g?!1:(j(v),!0)}))},L.onerror=function(){var v=S[i];v&&(v.errored=!0,ee(function(j){return j(v),!0}))},document.body.appendChild(L)},h.componentWillUnmount=function(){var s=this.__scriptURL;if(n.removeOnUnmount===!0)for(var i=document.getElementsByTagName("script"),f=0;f<i.length;f+=1)i[f].src.indexOf(s)>-1&&i[f].parentNode&&i[f].parentNode.removeChild(i[f]);var m=S[s];m&&(delete m.observers[this.asyncScriptLoaderGetScriptLoaderID()],n.removeOnUnmount===!0&&delete S[s])},h.render=function(){var s=n.globalName,i=this.props;i.asyncScriptOnLoad;var f=i.forwardedRef,m=ke(i,["asyncScriptOnLoad","forwardedRef"]);return s&&typeof window<"u"&&(m[s]=typeof window[s]<"u"?window[s]:void 0),m.ref=f,w.createElement(r,m)},p}(w.Component),b=w.forwardRef(function(x,p){return w.createElement(c,q({},x,{forwardedRef:p}))});return b.displayName="AsyncScriptLoader("+t+")",b.propTypes={asyncScriptOnLoad:u.func},Ae(b,r)}}var B="onloadcallback",Me="grecaptcha";function G(){return typeof window<"u"&&window.recaptchaOptions||{}}function ze(){var e=G(),n=e.useRecaptchaNet?"recaptcha.net":"www.google.com";return e.enterprise?"https://"+n+"/recaptcha/enterprise.js?onload="+B+"&render=explicit":"https://"+n+"/recaptcha/api.js?onload="+B+"&render=explicit"}const He=Ue(ze,{callbackName:B,globalName:Me,attributes:G().nonce?{nonce:G().nonce}:{}})(T),Be=()=>{const e=ue(),n=me(),[o,r]=w.useState(""),[t,c]=w.useState(null),[b,x]=w.useState(""),[p,h]=w.useState("border-gray-300"),y=n.state.uid,s=w.useRef(),i=ge(),f=g=>{c(g)},m=async()=>{var g;try{const R=await fe.post(`${le}/resendOTP`,{uid:y});n.state.otp=(g=R.data)==null?void 0:g.otp}catch(R){console.error(R)}},E=async g=>{var R;if(g.preventDefault(),s.current.reset(),o===((R=n.state)==null?void 0:R.otp)){const O=await re.post("/verify",{isVerified:!0,captcha:t,uid:y},{withCredentials:!0});if(localStorage.setItem("accessToken",O.data.accessToken),O.status===200){const P=await re.get("/user",{withCredentials:!0});e(he({...P.data})),i("/home")}}else x("Invalid OTP. Please try again."),h("border-red-500"),setTimeout(()=>{x(""),h("border-gray-300")},5e3)};return _.jsx("div",{style:{backgroundImage:"url(https://firebasestorage.googleapis.com/v0/b/careercompass-a9b5b.appspot.com/o/login.png?alt=media&token=9dd55b7d-3cf1-46e1-8c92-f447e8630b08)"},className:"h-screen bg-cover bg-center flex items-center justify-center",children:_.jsx("div",{className:"bg-user h-[90%] w-[90%] rounded-xl flex items-center justify-center",children:_.jsx("div",{className:"bg-white h-[95%] w-[97%] rounded-xl",children:_.jsxs("div",{className:"flex flex-col flex-shrink items-center mt-10 ",children:[_.jsx("img",{src:"https://firebasestorage.googleapis.com/v0/b/careercompass-a9b5b.appspot.com/o/logo1.png?alt=media&token=9dd55b7d-3cf1-46e1-8c92-f447e8630b08",className:"w-[30%]"}),_.jsx("input",{type:"text",value:o,placeholder:"Enter OTP",className:`border ${p} m-16 p-2 mb-2 w-[50%]`,onChange:g=>r(g.target.value)}),b&&_.jsx("span",{className:"text-red-500 text-sm mb-2",children:b}),_.jsx("span",{onClick:m,className:"ml-[-40%] text-gray-400 w-40m text-xs",children:"Resend OTP"}),_.jsx(He,{sitekey:"6LfL6f8pAAAAAEYFzYQJUXL3k8Qw7xYUvyTJjtd5",onChange:f,className:"m-16",ref:s}),_.jsx("button",{className:"bg-user rounded w-[50%] m-2 p-2 text-white",onClick:E,children:"Verify"})]})})})})};export{Be as default};
