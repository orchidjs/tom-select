var e
e=function(){"use strict"
const e="transitionend",t=e=>{const t=(e=>{let t=e.getAttribute("data-bs-target")
if(!t||"#"===t){let n=e.getAttribute("href")
if(!n||!n.includes("#")&&!n.startsWith("."))return null
n.includes("#")&&!n.startsWith("#")&&(n=`#${n.split("#")[1]}`),t=n&&"#"!==n?n.trim():null}return t})(e)
return t?document.querySelector(t):null},n=e=>!(!e||"object"!=typeof e)&&(void 0!==e.jquery&&(e=e[0]),void 0!==e.nodeType),r=e=>n(e)?e.jquery?e[0]:e:"string"==typeof e&&e.length>0?document.querySelector(e):null,o=e=>{if(!n(e)||0===e.getClientRects().length)return!1
const t="visible"===getComputedStyle(e).getPropertyValue("visibility"),r=e.closest("details:not([open])")
if(!r)return t
if(r!==e){const t=e.closest("summary")
if(t&&t.parentNode!==r)return!1
if(null===t)return!1}return t},i=e=>!e||e.nodeType!==Node.ELEMENT_NODE||!!e.classList.contains("disabled")||(void 0!==e.disabled?e.disabled:e.hasAttribute("disabled")&&"false"!==e.getAttribute("disabled")),s=()=>{},a=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,c=[],l=()=>"rtl"===document.documentElement.dir,u=e=>{var t
t=()=>{const t=a()
if(t){const n=e.NAME,r=t.fn[n]
t.fn[n]=e.jQueryInterface,t.fn[n].Constructor=e,t.fn[n].noConflict=()=>(t.fn[n]=r,e.jQueryInterface)}},"loading"===document.readyState?(c.length||document.addEventListener("DOMContentLoaded",(()=>{for(const e of c)e()})),c.push(t)):t()},f=e=>{"function"==typeof e&&e()},d=(t,n,r=!0)=>{if(!r)return void f(t)
const o=(e=>{if(!e)return 0
let{transitionDuration:t,transitionDelay:n}=window.getComputedStyle(e)
const r=Number.parseFloat(t),o=Number.parseFloat(n)
return r||o?(t=t.split(",")[0],n=n.split(",")[0],1e3*(Number.parseFloat(t)+Number.parseFloat(n))):0})(n)+5
let i=!1
const s=({target:r})=>{r===n&&(i=!0,n.removeEventListener(e,s),f(t))}
n.addEventListener(e,s),setTimeout((()=>{i||n.dispatchEvent(new Event(e))}),o)},p=(e,t,n,r)=>{const o=e.length
let i=e.indexOf(t)
return-1===i?!n&&r?e[o-1]:e[0]:(i+=n?1:-1,r&&(i=(i+o)%o),e[Math.max(0,Math.min(i,o-1))])},h=/[^.]*(?=\..*)\.|.*/,m=/\..*/,g=/::\d+$/,v={}
let b=1
const y={mouseenter:"mouseover",mouseleave:"mouseout"},w=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"])
function _(e,t){return t&&`${t}::${b++}`||e.uidEvent||b++}function x(e){const t=_(e)
return e.uidEvent=t,v[t]=v[t]||{},v[t]}function O(e,t,n=null){return Object.values(e).find((e=>e.callable===t&&e.delegationSelector===n))}function E(e,t,n){const r="string"==typeof t,o=r?n:t||n
let i=D(e)
return w.has(i)||(i=e),[r,o,i]}function A(e,t,n,r,o){if("string"!=typeof t||!e)return
let[i,s,a]=E(t,n,r)
if(t in y){const e=e=>function(t){if(!t.relatedTarget||t.relatedTarget!==t.delegateTarget&&!t.delegateTarget.contains(t.relatedTarget))return e.call(this,t)}
s=e(s)}const c=x(e),l=c[a]||(c[a]={}),u=O(l,s,i?n:null)
if(u)return void(u.oneOff=u.oneOff&&o)
const f=_(s,t.replace(h,"")),d=i?function(e,t,n){return function r(o){const i=e.querySelectorAll(t)
for(let{target:s}=o;s&&s!==this;s=s.parentNode)for(const a of i)if(a===s)return S(o,{delegateTarget:s}),r.oneOff&&L.off(e,o.type,t,n),n.apply(s,[o])}}(e,n,s):function(e,t){return function n(r){return S(r,{delegateTarget:e}),n.oneOff&&L.off(e,r.type,t),t.apply(e,[r])}}(e,s)
d.delegationSelector=i?n:null,d.callable=s,d.oneOff=o,d.uidEvent=f,l[f]=d,e.addEventListener(a,d,i)}function j(e,t,n,r,o){const i=O(t[n],r,o)
i&&(e.removeEventListener(n,i,Boolean(o)),delete t[n][i.uidEvent])}function C(e,t,n,r){const o=t[n]||{}
for(const i of Object.keys(o))if(i.includes(r)){const r=o[i]
j(e,t,n,r.callable,r.delegationSelector)}}function D(e){return e=e.replace(m,""),y[e]||e}const L={on(e,t,n,r){A(e,t,n,r,!1)},one(e,t,n,r){A(e,t,n,r,!0)},off(e,t,n,r){if("string"!=typeof t||!e)return
const[o,i,s]=E(t,n,r),a=s!==t,c=x(e),l=c[s]||{},u=t.startsWith(".")
if(void 0===i){if(u)for(const n of Object.keys(c))C(e,c,n,t.slice(1))
for(const n of Object.keys(l)){const r=n.replace(g,"")
if(!a||t.includes(r)){const t=l[n]
j(e,c,s,t.callable,t.delegationSelector)}}}else{if(!Object.keys(l).length)return
j(e,c,s,i,o?n:null)}},trigger(e,t,n){if("string"!=typeof t||!e)return null
const r=a()
let o=null,i=!0,s=!0,c=!1
t!==D(t)&&r&&(o=r.Event(t,n),r(e).trigger(o),i=!o.isPropagationStopped(),s=!o.isImmediatePropagationStopped(),c=o.isDefaultPrevented())
let l=new Event(t,{bubbles:i,cancelable:!0})
return l=S(l,n),c&&l.preventDefault(),s&&e.dispatchEvent(l),l.defaultPrevented&&o&&o.preventDefault(),l}}
function S(e,t){for(const[n,r]of Object.entries(t||{}))try{e[n]=r}catch{Object.defineProperty(e,n,{configurable:!0,get:()=>r})}return e}const k={find:(e,t=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(t,e)),findOne:(e,t=document.documentElement)=>Element.prototype.querySelector.call(t,e),children:(e,t)=>[].concat(...e.children).filter((e=>e.matches(t))),parents(e,t){const n=[]
let r=e.parentNode.closest(t)
for(;r;)n.push(r),r=r.parentNode.closest(t)
return n},prev(e,t){let n=e.previousElementSibling
for(;n;){if(n.matches(t))return[n]
n=n.previousElementSibling}return[]},next(e,t){let n=e.nextElementSibling
for(;n;){if(n.matches(t))return[n]
n=n.nextElementSibling}return[]},focusableChildren(e){const t=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map((e=>`${e}:not([tabindex^="-"])`)).join(",")
return this.find(t,e).filter((e=>!i(e)&&o(e)))}},T=new Map
var N={set(e,t,n){T.has(e)||T.set(e,new Map)
const r=T.get(e)
r.has(t)||0===r.size?r.set(t,n):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`)},get:(e,t)=>T.has(e)&&T.get(e).get(t)||null,remove(e,t){if(!T.has(e))return
const n=T.get(e)
n.delete(t),0===n.size&&T.delete(e)}}
function I(e){if("true"===e)return!0
if("false"===e)return!1
if(e===Number(e).toString())return Number(e)
if(""===e||"null"===e)return null
if("string"!=typeof e)return e
try{return JSON.parse(decodeURIComponent(e))}catch{return e}}function P(e){return e.replace(/[A-Z]/g,(e=>`-${e.toLowerCase()}`))}const $={setDataAttribute(e,t,n){e.setAttribute(`data-bs-${P(t)}`,n)},removeDataAttribute(e,t){e.removeAttribute(`data-bs-${P(t)}`)},getDataAttributes(e){if(!e)return{}
const t={},n=Object.keys(e.dataset).filter((e=>e.startsWith("bs")&&!e.startsWith("bsConfig")))
for(const r of n){let n=r.replace(/^bs/,"")
n=n.charAt(0).toLowerCase()+n.slice(1,n.length),t[n]=I(e.dataset[r])}return t},getDataAttribute:(e,t)=>I(e.getAttribute(`data-bs-${P(t)}`))}
class M{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(e){return e=this._mergeConfigObj(e),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}_configAfterMerge(e){return e}_mergeConfigObj(e,t){const r=n(t)?$.getDataAttribute(t,"config"):{}
return{...this.constructor.Default,..."object"==typeof r?r:{},...n(t)?$.getDataAttributes(t):{},..."object"==typeof e?e:{}}}_typeCheckConfig(e,t=this.constructor.DefaultType){for(const o of Object.keys(t)){const i=t[o],s=e[o],a=n(s)?"element":null==(r=s)?`${r}`:Object.prototype.toString.call(r).match(/\s([a-z]+)/i)[1].toLowerCase()
if(!new RegExp(i).test(a))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${o}" provided type "${a}" but expected type "${i}".`)}var r}}class q extends M{constructor(e,t){super(),(e=r(e))&&(this._element=e,this._config=this._getConfig(t),N.set(this._element,this.constructor.DATA_KEY,this))}dispose(){N.remove(this._element,this.constructor.DATA_KEY),L.off(this._element,this.constructor.EVENT_KEY)
for(const e of Object.getOwnPropertyNames(this))this[e]=null}_queueCallback(e,t,n=!0){d(e,t,n)}_getConfig(e){return e=this._mergeConfigObj(e,this._element),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}static getInstance(e){return N.get(r(e),this.DATA_KEY)}static getOrCreateInstance(e,t={}){return this.getInstance(e)||new this(e,"object"==typeof t?t:null)}static get VERSION(){return"5.2.3"}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(e){return`${e}${this.EVENT_KEY}`}}const B=".bs.tab",W=`hide${B}`,R=`hidden${B}`,H=`show${B}`,V=`shown${B}`,K=`click${B}`,Y=`keydown${B}`,U=`load${B}`,z="ArrowLeft",F="ArrowRight",Q="ArrowUp",J="ArrowDown",X="active",G="fade",Z="show",ee=":not(.dropdown-toggle)",te='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',ne=`.nav-link${ee}, .list-group-item${ee}, [role="tab"]${ee}, ${te}`,re=`.${X}[data-bs-toggle="tab"], .${X}[data-bs-toggle="pill"], .${X}[data-bs-toggle="list"]`
class oe extends q{constructor(e){super(e),this._parent=this._element.closest('.list-group, .nav, [role="tablist"]'),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),L.on(this._element,Y,(e=>this._keydown(e))))}static get NAME(){return"tab"}show(){const e=this._element
if(this._elemIsActive(e))return
const t=this._getActiveElem(),n=t?L.trigger(t,W,{relatedTarget:e}):null
L.trigger(e,H,{relatedTarget:t}).defaultPrevented||n&&n.defaultPrevented||(this._deactivate(t,e),this._activate(e,t))}_activate(e,n){e&&(e.classList.add(X),this._activate(t(e)),this._queueCallback((()=>{"tab"===e.getAttribute("role")?(e.removeAttribute("tabindex"),e.setAttribute("aria-selected",!0),this._toggleDropDown(e,!0),L.trigger(e,V,{relatedTarget:n})):e.classList.add(Z)}),e,e.classList.contains(G)))}_deactivate(e,n){e&&(e.classList.remove(X),e.blur(),this._deactivate(t(e)),this._queueCallback((()=>{"tab"===e.getAttribute("role")?(e.setAttribute("aria-selected",!1),e.setAttribute("tabindex","-1"),this._toggleDropDown(e,!1),L.trigger(e,R,{relatedTarget:n})):e.classList.remove(Z)}),e,e.classList.contains(G)))}_keydown(e){if(![z,F,Q,J].includes(e.key))return
e.stopPropagation(),e.preventDefault()
const t=[F,J].includes(e.key),n=p(this._getChildren().filter((e=>!i(e))),e.target,t,!0)
n&&(n.focus({preventScroll:!0}),oe.getOrCreateInstance(n).show())}_getChildren(){return k.find(ne,this._parent)}_getActiveElem(){return this._getChildren().find((e=>this._elemIsActive(e)))||null}_setInitialAttributes(e,t){this._setAttributeIfNotExists(e,"role","tablist")
for(const e of t)this._setInitialAttributesOnChild(e)}_setInitialAttributesOnChild(e){e=this._getInnerElement(e)
const t=this._elemIsActive(e),n=this._getOuterElement(e)
e.setAttribute("aria-selected",t),n!==e&&this._setAttributeIfNotExists(n,"role","presentation"),t||e.setAttribute("tabindex","-1"),this._setAttributeIfNotExists(e,"role","tab"),this._setInitialAttributesOnTargetPanel(e)}_setInitialAttributesOnTargetPanel(e){const n=t(e)
n&&(this._setAttributeIfNotExists(n,"role","tabpanel"),e.id&&this._setAttributeIfNotExists(n,"aria-labelledby",`#${e.id}`))}_toggleDropDown(e,t){const n=this._getOuterElement(e)
if(!n.classList.contains("dropdown"))return
const r=(e,r)=>{const o=k.findOne(e,n)
o&&o.classList.toggle(r,t)}
r(".dropdown-toggle",X),r(".dropdown-menu",Z),n.setAttribute("aria-expanded",t)}_setAttributeIfNotExists(e,t,n){e.hasAttribute(t)||e.setAttribute(t,n)}_elemIsActive(e){return e.classList.contains(X)}_getInnerElement(e){return e.matches(ne)?e:k.findOne(ne,e)}_getOuterElement(e){return e.closest(".nav-item, .list-group-item")||e}static jQueryInterface(e){return this.each((function(){const t=oe.getOrCreateInstance(this)
if("string"==typeof e){if(void 0===t[e]||e.startsWith("_")||"constructor"===e)throw new TypeError(`No method named "${e}"`)
t[e]()}}))}}L.on(document,K,te,(function(e){["A","AREA"].includes(this.tagName)&&e.preventDefault(),i(this)||oe.getOrCreateInstance(this).show()})),L.on(window,U,(()=>{for(const e of k.find(re))oe.getOrCreateInstance(e)})),u(oe)
var ie="top",se="bottom",ae="right",ce="left",le="auto",ue=[ie,se,ae,ce],fe="start",de="end",pe="clippingParents",he="viewport",me="popper",ge="reference",ve=ue.reduce((function(e,t){return e.concat([t+"-"+fe,t+"-"+de])}),[]),be=[].concat(ue,[le]).reduce((function(e,t){return e.concat([t,t+"-"+fe,t+"-"+de])}),[]),ye="beforeRead",we="read",_e="afterRead",xe="beforeMain",Oe="main",Ee="afterMain",Ae="beforeWrite",je="write",Ce="afterWrite",De=[ye,we,_e,xe,Oe,Ee,Ae,je,Ce]
function Le(e){return e?(e.nodeName||"").toLowerCase():null}function Se(e){if(null==e)return window
if("[object Window]"!==e.toString()){var t=e.ownerDocument
return t&&t.defaultView||window}return e}function ke(e){return e instanceof Se(e).Element||e instanceof Element}function Te(e){return e instanceof Se(e).HTMLElement||e instanceof HTMLElement}function Ne(e){return"undefined"!=typeof ShadowRoot&&(e instanceof Se(e).ShadowRoot||e instanceof ShadowRoot)}var Ie={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state
Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},r=t.attributes[e]||{},o=t.elements[e]
Te(o)&&Le(o)&&(Object.assign(o.style,n),Object.keys(r).forEach((function(e){var t=r[e]
!1===t?o.removeAttribute(e):o.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}}
return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var r=t.elements[e],o=t.attributes[e]||{},i=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{})
Te(r)&&Le(r)&&(Object.assign(r.style,i),Object.keys(o).forEach((function(e){r.removeAttribute(e)})))}))}},requires:["computeStyles"]}
function Pe(e){return e.split("-")[0]}var $e=Math.max,Me=Math.min,qe=Math.round
function Be(){var e=navigator.userAgentData
return null!=e&&e.brands?e.brands.map((function(e){return e.brand+"/"+e.version})).join(" "):navigator.userAgent}function We(){return!/^((?!chrome|android).)*safari/i.test(Be())}function Re(e,t,n){void 0===t&&(t=!1),void 0===n&&(n=!1)
var r=e.getBoundingClientRect(),o=1,i=1
t&&Te(e)&&(o=e.offsetWidth>0&&qe(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&qe(r.height)/e.offsetHeight||1)
var s=(ke(e)?Se(e):window).visualViewport,a=!We()&&n,c=(r.left+(a&&s?s.offsetLeft:0))/o,l=(r.top+(a&&s?s.offsetTop:0))/i,u=r.width/o,f=r.height/i
return{width:u,height:f,top:l,right:c+u,bottom:l+f,left:c,x:c,y:l}}function He(e){var t=Re(e),n=e.offsetWidth,r=e.offsetHeight
return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Ve(e,t){var n=t.getRootNode&&t.getRootNode()
if(e.contains(t))return!0
if(n&&Ne(n)){var r=t
do{if(r&&e.isSameNode(r))return!0
r=r.parentNode||r.host}while(r)}return!1}function Ke(e){return Se(e).getComputedStyle(e)}function Ye(e){return["table","td","th"].indexOf(Le(e))>=0}function Ue(e){return((ke(e)?e.ownerDocument:e.document)||window.document).documentElement}function ze(e){return"html"===Le(e)?e:e.assignedSlot||e.parentNode||(Ne(e)?e.host:null)||Ue(e)}function Fe(e){return Te(e)&&"fixed"!==Ke(e).position?e.offsetParent:null}function Qe(e){for(var t=Se(e),n=Fe(e);n&&Ye(n)&&"static"===Ke(n).position;)n=Fe(n)
return n&&("html"===Le(n)||"body"===Le(n)&&"static"===Ke(n).position)?t:n||function(e){var t=/firefox/i.test(Be())
if(/Trident/i.test(Be())&&Te(e)&&"fixed"===Ke(e).position)return null
var n=ze(e)
for(Ne(n)&&(n=n.host);Te(n)&&["html","body"].indexOf(Le(n))<0;){var r=Ke(n)
if("none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||-1!==["transform","perspective"].indexOf(r.willChange)||t&&"filter"===r.willChange||t&&r.filter&&"none"!==r.filter)return n
n=n.parentNode}return null}(e)||t}function Je(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function Xe(e,t,n){return $e(e,Me(t,n))}function Ge(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function Ze(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}var et={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,s=n.modifiersData.popperOffsets,a=Pe(n.placement),c=Je(a),l=[ce,ae].indexOf(a)>=0?"height":"width"
if(i&&s){var u=function(e,t){return Ge("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:Ze(e,ue))}(o.padding,n),f=He(i),d="y"===c?ie:ce,p="y"===c?se:ae,h=n.rects.reference[l]+n.rects.reference[c]-s[c]-n.rects.popper[l],m=s[c]-n.rects.reference[c],g=Qe(i),v=g?"y"===c?g.clientHeight||0:g.clientWidth||0:0,b=h/2-m/2,y=u[d],w=v-f[l]-u[p],_=v/2-f[l]/2+b,x=Xe(y,_,w),O=c
n.modifiersData[r]=((t={})[O]=x,t.centerOffset=x-_,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n
null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&Ve(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]}
function tt(e){return e.split("-")[1]}var nt={top:"auto",right:"auto",bottom:"auto",left:"auto"}
function rt(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,s=e.offsets,a=e.position,c=e.gpuAcceleration,l=e.adaptive,u=e.roundOffsets,f=e.isFixed,d=s.x,p=void 0===d?0:d,h=s.y,m=void 0===h?0:h,g="function"==typeof u?u({x:p,y:m}):{x:p,y:m}
p=g.x,m=g.y
var v=s.hasOwnProperty("x"),b=s.hasOwnProperty("y"),y=ce,w=ie,_=window
if(l){var x=Qe(n),O="clientHeight",E="clientWidth"
x===Se(n)&&"static"!==Ke(x=Ue(n)).position&&"absolute"===a&&(O="scrollHeight",E="scrollWidth"),(o===ie||(o===ce||o===ae)&&i===de)&&(w=se,m-=(f&&x===_&&_.visualViewport?_.visualViewport.height:x[O])-r.height,m*=c?1:-1),o!==ce&&(o!==ie&&o!==se||i!==de)||(y=ae,p-=(f&&x===_&&_.visualViewport?_.visualViewport.width:x[E])-r.width,p*=c?1:-1)}var A,j=Object.assign({position:a},l&&nt),C=!0===u?function(e){var t=e.x,n=e.y,r=window.devicePixelRatio||1
return{x:qe(t*r)/r||0,y:qe(n*r)/r||0}}({x:p,y:m}):{x:p,y:m}
return p=C.x,m=C.y,c?Object.assign({},j,((A={})[w]=b?"0":"",A[y]=v?"0":"",A.transform=(_.devicePixelRatio||1)<=1?"translate("+p+"px, "+m+"px)":"translate3d("+p+"px, "+m+"px, 0)",A)):Object.assign({},j,((t={})[w]=b?m+"px":"",t[y]=v?p+"px":"",t.transform="",t))}var ot={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,s=void 0===i||i,a=n.roundOffsets,c=void 0===a||a,l={placement:Pe(t.placement),variation:tt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:"fixed"===t.options.strategy}
null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,rt(Object.assign({},l,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:c})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,rt(Object.assign({},l,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},it={passive:!0},st={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=void 0===o||o,s=r.resize,a=void 0===s||s,c=Se(t.elements.popper),l=[].concat(t.scrollParents.reference,t.scrollParents.popper)
return i&&l.forEach((function(e){e.addEventListener("scroll",n.update,it)})),a&&c.addEventListener("resize",n.update,it),function(){i&&l.forEach((function(e){e.removeEventListener("scroll",n.update,it)})),a&&c.removeEventListener("resize",n.update,it)}},data:{}},at={left:"right",right:"left",bottom:"top",top:"bottom"}
function ct(e){return e.replace(/left|right|bottom|top/g,(function(e){return at[e]}))}var lt={start:"end",end:"start"}
function ut(e){return e.replace(/start|end/g,(function(e){return lt[e]}))}function ft(e){var t=Se(e)
return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function dt(e){return Re(Ue(e)).left+ft(e).scrollLeft}function pt(e){var t=Ke(e),n=t.overflow,r=t.overflowX,o=t.overflowY
return/auto|scroll|overlay|hidden/.test(n+o+r)}function ht(e){return["html","body","#document"].indexOf(Le(e))>=0?e.ownerDocument.body:Te(e)&&pt(e)?e:ht(ze(e))}function mt(e,t){var n
void 0===t&&(t=[])
var r=ht(e),o=r===(null==(n=e.ownerDocument)?void 0:n.body),i=Se(r),s=o?[i].concat(i.visualViewport||[],pt(r)?r:[]):r,a=t.concat(s)
return o?a:a.concat(mt(ze(s)))}function gt(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function vt(e,t,n){return t===he?gt(function(e,t){var n=Se(e),r=Ue(e),o=n.visualViewport,i=r.clientWidth,s=r.clientHeight,a=0,c=0
if(o){i=o.width,s=o.height
var l=We();(l||!l&&"fixed"===t)&&(a=o.offsetLeft,c=o.offsetTop)}return{width:i,height:s,x:a+dt(e),y:c}}(e,n)):ke(t)?function(e,t){var n=Re(e,!1,"fixed"===t)
return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}(t,n):gt(function(e){var t,n=Ue(e),r=ft(e),o=null==(t=e.ownerDocument)?void 0:t.body,i=$e(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=$e(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),a=-r.scrollLeft+dt(e),c=-r.scrollTop
return"rtl"===Ke(o||n).direction&&(a+=$e(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:s,x:a,y:c}}(Ue(e)))}function bt(e,t,n,r){var o="clippingParents"===t?function(e){var t=mt(ze(e)),n=["absolute","fixed"].indexOf(Ke(e).position)>=0&&Te(e)?Qe(e):e
return ke(n)?t.filter((function(e){return ke(e)&&Ve(e,n)&&"body"!==Le(e)})):[]}(e):[].concat(t),i=[].concat(o,[n]),s=i[0],a=i.reduce((function(t,n){var o=vt(e,n,r)
return t.top=$e(o.top,t.top),t.right=Me(o.right,t.right),t.bottom=Me(o.bottom,t.bottom),t.left=$e(o.left,t.left),t}),vt(e,s,r))
return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function yt(e){var t,n=e.reference,r=e.element,o=e.placement,i=o?Pe(o):null,s=o?tt(o):null,a=n.x+n.width/2-r.width/2,c=n.y+n.height/2-r.height/2
switch(i){case ie:t={x:a,y:n.y-r.height}
break
case se:t={x:a,y:n.y+n.height}
break
case ae:t={x:n.x+n.width,y:c}
break
case ce:t={x:n.x-r.width,y:c}
break
default:t={x:n.x,y:n.y}}var l=i?Je(i):null
if(null!=l){var u="y"===l?"height":"width"
switch(s){case fe:t[l]=t[l]-(n[u]/2-r[u]/2)
break
case de:t[l]=t[l]+(n[u]/2-r[u]/2)}}return t}function wt(e,t){void 0===t&&(t={})
var n=t,r=n.placement,o=void 0===r?e.placement:r,i=n.strategy,s=void 0===i?e.strategy:i,a=n.boundary,c=void 0===a?pe:a,l=n.rootBoundary,u=void 0===l?he:l,f=n.elementContext,d=void 0===f?me:f,p=n.altBoundary,h=void 0!==p&&p,m=n.padding,g=void 0===m?0:m,v=Ge("number"!=typeof g?g:Ze(g,ue)),b=d===me?ge:me,y=e.rects.popper,w=e.elements[h?b:d],_=bt(ke(w)?w:w.contextElement||Ue(e.elements.popper),c,u,s),x=Re(e.elements.reference),O=yt({reference:x,element:y,strategy:"absolute",placement:o}),E=gt(Object.assign({},y,O)),A=d===me?E:x,j={top:_.top-A.top+v.top,bottom:A.bottom-_.bottom+v.bottom,left:_.left-A.left+v.left,right:A.right-_.right+v.right},C=e.modifiersData.offset
if(d===me&&C){var D=C[o]
Object.keys(j).forEach((function(e){var t=[ae,se].indexOf(e)>=0?1:-1,n=[ie,se].indexOf(e)>=0?"y":"x"
j[e]+=D[n]*t}))}return j}function _t(e,t){void 0===t&&(t={})
var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,s=n.padding,a=n.flipVariations,c=n.allowedAutoPlacements,l=void 0===c?be:c,u=tt(r),f=u?a?ve:ve.filter((function(e){return tt(e)===u})):ue,d=f.filter((function(e){return l.indexOf(e)>=0}))
0===d.length&&(d=f)
var p=d.reduce((function(t,n){return t[n]=wt(e,{placement:n,boundary:o,rootBoundary:i,padding:s})[Pe(n)],t}),{})
return Object.keys(p).sort((function(e,t){return p[e]-p[t]}))}var xt={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name
if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=void 0===o||o,s=n.altAxis,a=void 0===s||s,c=n.fallbackPlacements,l=n.padding,u=n.boundary,f=n.rootBoundary,d=n.altBoundary,p=n.flipVariations,h=void 0===p||p,m=n.allowedAutoPlacements,g=t.options.placement,v=Pe(g),b=c||(v!==g&&h?function(e){if(Pe(e)===le)return[]
var t=ct(e)
return[ut(e),t,ut(t)]}(g):[ct(g)]),y=[g].concat(b).reduce((function(e,n){return e.concat(Pe(n)===le?_t(t,{placement:n,boundary:u,rootBoundary:f,padding:l,flipVariations:h,allowedAutoPlacements:m}):n)}),[]),w=t.rects.reference,_=t.rects.popper,x=new Map,O=!0,E=y[0],A=0;A<y.length;A++){var j=y[A],C=Pe(j),D=tt(j)===fe,L=[ie,se].indexOf(C)>=0,S=L?"width":"height",k=wt(t,{placement:j,boundary:u,rootBoundary:f,altBoundary:d,padding:l}),T=L?D?ae:ce:D?se:ie
w[S]>_[S]&&(T=ct(T))
var N=ct(T),I=[]
if(i&&I.push(k[C]<=0),a&&I.push(k[T]<=0,k[N]<=0),I.every((function(e){return e}))){E=j,O=!1
break}x.set(j,I)}if(O)for(var P=function(e){var t=y.find((function(t){var n=x.get(t)
if(n)return n.slice(0,e).every((function(e){return e}))}))
if(t)return E=t,"break"},$=h?3:1;$>0&&"break"!==P($);$--);t.placement!==E&&(t.modifiersData[r]._skip=!0,t.placement=E,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}}
function Ot(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Et(e){return[ie,ae,se,ce].some((function(t){return e[t]>=0}))}var At={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,s=wt(t,{elementContext:"reference"}),a=wt(t,{altBoundary:!0}),c=Ot(s,r),l=Ot(a,o,i),u=Et(c),f=Et(l)
t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:l,isReferenceHidden:u,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":f})}},jt={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=void 0===o?[0,0]:o,s=be.reduce((function(e,n){return e[n]=function(e,t,n){var r=Pe(e),o=[ce,ie].indexOf(r)>=0?-1:1,i="function"==typeof n?n(Object.assign({},t,{placement:e})):n,s=i[0],a=i[1]
return s=s||0,a=(a||0)*o,[ce,ae].indexOf(r)>=0?{x:a,y:s}:{x:s,y:a}}(n,t.rects,i),e}),{}),a=s[t.placement],c=a.x,l=a.y
null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=l),t.modifiersData[r]=s}},Ct={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name
t.modifiersData[n]=yt({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},Dt={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=void 0===o||o,s=n.altAxis,a=void 0!==s&&s,c=n.boundary,l=n.rootBoundary,u=n.altBoundary,f=n.padding,d=n.tether,p=void 0===d||d,h=n.tetherOffset,m=void 0===h?0:h,g=wt(t,{boundary:c,rootBoundary:l,padding:f,altBoundary:u}),v=Pe(t.placement),b=tt(t.placement),y=!b,w=Je(v),_="x"===w?"y":"x",x=t.modifiersData.popperOffsets,O=t.rects.reference,E=t.rects.popper,A="function"==typeof m?m(Object.assign({},t.rects,{placement:t.placement})):m,j="number"==typeof A?{mainAxis:A,altAxis:A}:Object.assign({mainAxis:0,altAxis:0},A),C=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,D={x:0,y:0}
if(x){if(i){var L,S="y"===w?ie:ce,k="y"===w?se:ae,T="y"===w?"height":"width",N=x[w],I=N+g[S],P=N-g[k],$=p?-E[T]/2:0,M=b===fe?O[T]:E[T],q=b===fe?-E[T]:-O[T],B=t.elements.arrow,W=p&&B?He(B):{width:0,height:0},R=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},H=R[S],V=R[k],K=Xe(0,O[T],W[T]),Y=y?O[T]/2-$-K-H-j.mainAxis:M-K-H-j.mainAxis,U=y?-O[T]/2+$+K+V+j.mainAxis:q+K+V+j.mainAxis,z=t.elements.arrow&&Qe(t.elements.arrow),F=z?"y"===w?z.clientTop||0:z.clientLeft||0:0,Q=null!=(L=null==C?void 0:C[w])?L:0,J=N+U-Q,X=Xe(p?Me(I,N+Y-Q-F):I,N,p?$e(P,J):P)
x[w]=X,D[w]=X-N}if(a){var G,Z="x"===w?ie:ce,ee="x"===w?se:ae,te=x[_],ne="y"===_?"height":"width",re=te+g[Z],oe=te-g[ee],le=-1!==[ie,ce].indexOf(v),ue=null!=(G=null==C?void 0:C[_])?G:0,de=le?re:te-O[ne]-E[ne]-ue+j.altAxis,pe=le?te+O[ne]+E[ne]-ue-j.altAxis:oe,he=p&&le?function(e,t,n){var r=Xe(e,t,n)
return r>n?n:r}(de,te,pe):Xe(p?de:re,te,p?pe:oe)
x[_]=he,D[_]=he-te}t.modifiersData[r]=D}},requiresIfExists:["offset"]}
function Lt(e,t,n){void 0===n&&(n=!1)
var r,o,i=Te(t),s=Te(t)&&function(e){var t=e.getBoundingClientRect(),n=qe(t.width)/e.offsetWidth||1,r=qe(t.height)/e.offsetHeight||1
return 1!==n||1!==r}(t),a=Ue(t),c=Re(e,s,n),l={scrollLeft:0,scrollTop:0},u={x:0,y:0}
return(i||!i&&!n)&&(("body"!==Le(t)||pt(a))&&(l=(r=t)!==Se(r)&&Te(r)?{scrollLeft:(o=r).scrollLeft,scrollTop:o.scrollTop}:ft(r)),Te(t)?((u=Re(t,!0)).x+=t.clientLeft,u.y+=t.clientTop):a&&(u.x=dt(a))),{x:c.left+l.scrollLeft-u.x,y:c.top+l.scrollTop-u.y,width:c.width,height:c.height}}function St(e){var t=new Map,n=new Set,r=[]
function o(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e)
r&&o(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||o(e)})),r}var kt={placement:"bottom",modifiers:[],strategy:"absolute"}
function Tt(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n]
return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function Nt(e){void 0===e&&(e={})
var t=e,n=t.defaultModifiers,r=void 0===n?[]:n,o=t.defaultOptions,i=void 0===o?kt:o
return function(e,t,n){void 0===n&&(n=i)
var o,s,a={placement:"bottom",orderedModifiers:[],options:Object.assign({},kt,i),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},c=[],l=!1,u={state:a,setOptions:function(n){var o="function"==typeof n?n(a.options):n
f(),a.options=Object.assign({},i,a.options,o),a.scrollParents={reference:ke(e)?mt(e):e.contextElement?mt(e.contextElement):[],popper:mt(t)}
var s,l,d=function(e){var t=St(e)
return De.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}((s=[].concat(r,a.options.modifiers),l=s.reduce((function(e,t){var n=e[t.name]
return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{}),Object.keys(l).map((function(e){return l[e]}))))
return a.orderedModifiers=d.filter((function(e){return e.enabled})),a.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,o=e.effect
if("function"==typeof o){var i=o({state:a,name:t,instance:u,options:r}),s=function(){}
c.push(i||s)}})),u.update()},forceUpdate:function(){if(!l){var e=a.elements,t=e.reference,n=e.popper
if(Tt(t,n)){a.rects={reference:Lt(t,Qe(n),"fixed"===a.options.strategy),popper:He(n)},a.reset=!1,a.placement=a.options.placement,a.orderedModifiers.forEach((function(e){return a.modifiersData[e.name]=Object.assign({},e.data)}))
for(var r=0;r<a.orderedModifiers.length;r++)if(!0!==a.reset){var o=a.orderedModifiers[r],i=o.fn,s=o.options,c=void 0===s?{}:s,f=o.name
"function"==typeof i&&(a=i({state:a,options:c,name:f,instance:u})||a)}else a.reset=!1,r=-1}}},update:(o=function(){return new Promise((function(e){u.forceUpdate(),e(a)}))},function(){return s||(s=new Promise((function(e){Promise.resolve().then((function(){s=void 0,e(o())}))}))),s}),destroy:function(){f(),l=!0}}
if(!Tt(e,t))return u
function f(){c.forEach((function(e){return e()})),c=[]}return u.setOptions(n).then((function(e){!l&&n.onFirstUpdate&&n.onFirstUpdate(e)})),u}}var It=Nt(),Pt=Nt({defaultModifiers:[st,Ct,ot,Ie]}),$t=Nt({defaultModifiers:[st,Ct,ot,Ie,jt,xt,Dt,et,At]}),Mt=Object.freeze({__proto__:null,popperGenerator:Nt,detectOverflow:wt,createPopperBase:It,createPopper:$t,createPopperLite:Pt,top:ie,bottom:se,right:ae,left:ce,auto:le,basePlacements:ue,start:fe,end:de,clippingParents:pe,viewport:he,popper:me,reference:ge,variationPlacements:ve,placements:be,beforeRead:ye,read:we,afterRead:_e,beforeMain:xe,main:Oe,afterMain:Ee,beforeWrite:Ae,write:je,afterWrite:Ce,modifierPhases:De,applyStyles:Ie,arrow:et,computeStyles:ot,eventListeners:st,flip:xt,hide:At,offset:jt,popperOffsets:Ct,preventOverflow:Dt})
const qt="dropdown",Bt=".bs.dropdown",Wt=".data-api",Rt="ArrowUp",Ht="ArrowDown",Vt=`hide${Bt}`,Kt=`hidden${Bt}`,Yt=`show${Bt}`,Ut=`shown${Bt}`,zt=`click${Bt}${Wt}`,Ft=`keydown${Bt}${Wt}`,Qt=`keyup${Bt}${Wt}`,Jt="show",Xt='[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',Gt=`${Xt}.${Jt}`,Zt=".dropdown-menu",en=l()?"top-end":"top-start",tn=l()?"top-start":"top-end",nn=l()?"bottom-end":"bottom-start",rn=l()?"bottom-start":"bottom-end",on=l()?"left-start":"right-start",sn=l()?"right-start":"left-start",an={autoClose:!0,boundary:"clippingParents",display:"dynamic",offset:[0,2],popperConfig:null,reference:"toggle"},cn={autoClose:"(boolean|string)",boundary:"(string|element)",display:"string",offset:"(array|string|function)",popperConfig:"(null|object|function)",reference:"(string|element|object)"}
class ln extends q{constructor(e,t){super(e,t),this._popper=null,this._parent=this._element.parentNode,this._menu=k.next(this._element,Zt)[0]||k.prev(this._element,Zt)[0]||k.findOne(Zt,this._parent),this._inNavbar=this._detectNavbar()}static get Default(){return an}static get DefaultType(){return cn}static get NAME(){return qt}toggle(){return this._isShown()?this.hide():this.show()}show(){if(i(this._element)||this._isShown())return
const e={relatedTarget:this._element}
if(!L.trigger(this._element,Yt,e).defaultPrevented){if(this._createPopper(),"ontouchstart"in document.documentElement&&!this._parent.closest(".navbar-nav"))for(const e of[].concat(...document.body.children))L.on(e,"mouseover",s)
this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add(Jt),this._element.classList.add(Jt),L.trigger(this._element,Ut,e)}}hide(){if(i(this._element)||!this._isShown())return
const e={relatedTarget:this._element}
this._completeHide(e)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(e){if(!L.trigger(this._element,Vt,e).defaultPrevented){if("ontouchstart"in document.documentElement)for(const e of[].concat(...document.body.children))L.off(e,"mouseover",s)
this._popper&&this._popper.destroy(),this._menu.classList.remove(Jt),this._element.classList.remove(Jt),this._element.setAttribute("aria-expanded","false"),$.removeDataAttribute(this._menu,"popper"),L.trigger(this._element,Kt,e)}}_getConfig(e){if("object"==typeof(e=super._getConfig(e)).reference&&!n(e.reference)&&"function"!=typeof e.reference.getBoundingClientRect)throw new TypeError(`${qt.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`)
return e}_createPopper(){if(void 0===Mt)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)")
let e=this._element
"parent"===this._config.reference?e=this._parent:n(this._config.reference)?e=r(this._config.reference):"object"==typeof this._config.reference&&(e=this._config.reference)
const t=this._getPopperConfig()
this._popper=$t(e,this._menu,t)}_isShown(){return this._menu.classList.contains(Jt)}_getPlacement(){const e=this._parent
if(e.classList.contains("dropend"))return on
if(e.classList.contains("dropstart"))return sn
if(e.classList.contains("dropup-center"))return"top"
if(e.classList.contains("dropdown-center"))return"bottom"
const t="end"===getComputedStyle(this._menu).getPropertyValue("--bs-position").trim()
return e.classList.contains("dropup")?t?tn:en:t?rn:nn}_detectNavbar(){return null!==this._element.closest(".navbar")}_getOffset(){const{offset:e}=this._config
return"string"==typeof e?e.split(",").map((e=>Number.parseInt(e,10))):"function"==typeof e?t=>e(t,this._element):e}_getPopperConfig(){const e={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]}
return(this._inNavbar||"static"===this._config.display)&&($.setDataAttribute(this._menu,"popper","static"),e.modifiers=[{name:"applyStyles",enabled:!1}]),{...e,..."function"==typeof this._config.popperConfig?this._config.popperConfig(e):this._config.popperConfig}}_selectMenuItem({key:e,target:t}){const n=k.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",this._menu).filter((e=>o(e)))
n.length&&p(n,t,e===Ht,!n.includes(t)).focus()}static jQueryInterface(e){return this.each((function(){const t=ln.getOrCreateInstance(this,e)
if("string"==typeof e){if(void 0===t[e])throw new TypeError(`No method named "${e}"`)
t[e]()}}))}static clearMenus(e){if(2===e.button||"keyup"===e.type&&"Tab"!==e.key)return
const t=k.find(Gt)
for(const n of t){const t=ln.getInstance(n)
if(!t||!1===t._config.autoClose)continue
const r=e.composedPath(),o=r.includes(t._menu)
if(r.includes(t._element)||"inside"===t._config.autoClose&&!o||"outside"===t._config.autoClose&&o)continue
if(t._menu.contains(e.target)&&("keyup"===e.type&&"Tab"===e.key||/input|select|option|textarea|form/i.test(e.target.tagName)))continue
const i={relatedTarget:t._element}
"click"===e.type&&(i.clickEvent=e),t._completeHide(i)}}static dataApiKeydownHandler(e){const t=/input|textarea/i.test(e.target.tagName),n="Escape"===e.key,r=[Rt,Ht].includes(e.key)
if(!r&&!n)return
if(t&&!n)return
e.preventDefault()
const o=this.matches(Xt)?this:k.prev(this,Xt)[0]||k.next(this,Xt)[0]||k.findOne(Xt,e.delegateTarget.parentNode),i=ln.getOrCreateInstance(o)
if(r)return e.stopPropagation(),i.show(),void i._selectMenuItem(e)
i._isShown()&&(e.stopPropagation(),i.hide(),o.focus())}}L.on(document,Ft,Xt,ln.dataApiKeydownHandler),L.on(document,Ft,Zt,ln.dataApiKeydownHandler),L.on(document,zt,ln.clearMenus),L.on(document,Qt,ln.clearMenus),L.on(document,zt,Xt,(function(e){e.preventDefault(),ln.getOrCreateInstance(this).toggle()})),u(ln),document.addEventListener("DOMContentLoaded",(function(){if(document.getElementById("prism-css").media="all",document.getElementById("toggle-offcanvas").addEventListener("click",(function(){document.body.classList.toggle("offcanvas-open")})),0!=document.querySelectorAll(".demo").length&&!document.getElementById("select-theme")){var e=window.themes||["bootstrap5","bootstrap4","default"],t={bootstrap5:"Bootstrap 5",bootstrap4:"Bootstrap 4",default:"Default"},n=localStorage.getItem("theme");-1==e.indexOf(n)&&(n="bootstrap5")
var r=document.createElement("input")
r.classList.add("theme-selector-input")
var o=document.getElementById("main-container")
document.querySelectorAll(".demo-mini").length||(o.insertBefore(r,o.firstChild),new TomSelect(r,{maxItems:1,controlInput:"<input>",plugins:["no_backspace_delete"],options:e.map((n=>-1!=e.indexOf(n)&&{text:t[n],value:n})),items:[n],render:{item:(e,t)=>"<div>Theme: "+t(e.text)+"</div>"},onChange:e=>{i(e)}})),i(n),document.addEventListener("click",(e=>{var t=e.target.closest(".opensandbox")
if(t){var n,r=t.closest(".demo")
function l(e){var t=r.querySelector(e)
return t&&t.textContent||""}var o=`<div class="p-4">${r.querySelector("textarea").value||""}</div>`,i=l("style"),s=l("script"),a=[`https://cdn.jsdelivr.net/npm/tom-select@2.2.2/dist/css/tom-select.${localStorage.getItem("theme")||"bootstrap4"}.min.css`,"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"]
"bootstrap4"==localStorage.getItem("theme")?a.push("https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/css/bootstrap.min.css"):a.push("https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css")
var c=["https://cdn.jsdelivr.net/npm/tom-select@2.2.2/dist/js/tom-select.complete.min.js"]
r.classList.contains("demo-jquery")&&(c.push("https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js"),c.push("https://cdn.jsdelivr.net/npm/jquery-ui-dist@1.12.1/jquery-ui.js")),n={html:o,js:s,css:i,js_external:c.join(";"),css_external:a.join(";")},r.querySelector(".codepen").value=JSON.stringify(n),r.querySelector(".jsfiddle-html").value=o,r.querySelector(".jsfiddle-js").value=s,r.querySelector(".jsfiddle-css").value=i,r.querySelector(".jsfiddle-resources").value=c.join(",")+","+a.join(","),setTimeout((()=>{t.nextElementSibling.submit()}),50)}}))}function i(t){if(-1!=e.indexOf(t)){localStorage.setItem("theme",t)
var n=document.getElementById("select-theme")
n&&n.parentNode.removeChild(n),(n=document.createElement("link")).id="select-theme",n.setAttribute("rel","stylesheet"),n.setAttribute("href","/css/tom-select."+t+".css"),document.getElementsByTagName("head")[0].appendChild(n)}}}))},"function"==typeof define&&define.amd?define(e):e()
//# sourceMappingURL=index.bundle.js.map
