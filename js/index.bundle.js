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
return-1===i?!n&&r?e[o-1]:e[0]:(i+=n?1:-1,r&&(i=(i+o)%o),e[Math.max(0,Math.min(i,o-1))])},h=/[^.]*(?=\..*)\.|.*/,m=/\..*/,g=/::\d+$/,b={}
let v=1
const y={mouseenter:"mouseover",mouseleave:"mouseout"},w=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"])
function _(e,t){return t&&`${t}::${v++}`||e.uidEvent||v++}function x(e){const t=_(e)
return e.uidEvent=t,b[t]=b[t]||{},b[t]}function O(e,t,n=null){return Object.values(e).find((e=>e.callable===t&&e.delegationSelector===n))}function E(e,t,n){const r="string"==typeof t,o=r?n:t||n
let i=D(e)
return w.has(i)||(i=e),[r,o,i]}function A(e,t,n,r,o){if("string"!=typeof t||!e)return
let[i,s,a]=E(t,n,r)
if(t in y){const e=e=>function(t){if(!t.relatedTarget||t.relatedTarget!==t.delegateTarget&&!t.delegateTarget.contains(t.relatedTarget))return e.call(this,t)}
s=e(s)}const c=x(e),l=c[a]||(c[a]={}),u=O(l,s,i?n:null)
if(u)return void(u.oneOff=u.oneOff&&o)
const f=_(s,t.replace(h,"")),d=i?function(e,t,n){return function r(o){const i=e.querySelectorAll(t)
for(let{target:s}=o;s&&s!==this;s=s.parentNode)for(const a of i)if(a===s)return k(o,{delegateTarget:s}),r.oneOff&&L.off(e,o.type,t,n),n.apply(s,[o])}}(e,n,s):function(e,t){return function n(r){return k(r,{delegateTarget:e}),n.oneOff&&L.off(e,r.type,t),t.apply(e,[r])}}(e,s)
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
return l=k(l,n),c&&l.preventDefault(),s&&e.dispatchEvent(l),l.defaultPrevented&&o&&o.preventDefault(),l}}
function k(e,t){for(const[n,r]of Object.entries(t||{}))try{e[n]=r}catch{Object.defineProperty(e,n,{configurable:!0,get:()=>r})}return e}const S={find:(e,t=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(t,e)),findOne:(e,t=document.documentElement)=>Element.prototype.querySelector.call(t,e),children:(e,t)=>[].concat(...e.children).filter((e=>e.matches(t))),parents(e,t){const n=[]
let r=e.parentNode.closest(t)
for(;r;)n.push(r),r=r.parentNode.closest(t)
return n},prev(e,t){let n=e.previousElementSibling
for(;n;){if(n.matches(t))return[n]
n=n.previousElementSibling}return[]},next(e,t){let n=e.nextElementSibling
for(;n;){if(n.matches(t))return[n]
n=n.nextElementSibling}return[]},focusableChildren(e){const t=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map((e=>`${e}:not([tabindex^="-"])`)).join(",")
return this.find(t,e).filter((e=>!i(e)&&o(e)))}},N=new Map
var T={set(e,t,n){N.has(e)||N.set(e,new Map)
const r=N.get(e)
r.has(t)||0===r.size?r.set(t,n):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`)},get:(e,t)=>N.has(e)&&N.get(e).get(t)||null,remove(e,t){if(!N.has(e))return
const n=N.get(e)
n.delete(t),0===n.size&&N.delete(e)}}
function I(e){if("true"===e)return!0
if("false"===e)return!1
if(e===Number(e).toString())return Number(e)
if(""===e||"null"===e)return null
if("string"!=typeof e)return e
try{return JSON.parse(decodeURIComponent(e))}catch{return e}}function P(e){return e.replace(/[A-Z]/g,(e=>`-${e.toLowerCase()}`))}const M={setDataAttribute(e,t,n){e.setAttribute(`data-bs-${P(t)}`,n)},removeDataAttribute(e,t){e.removeAttribute(`data-bs-${P(t)}`)},getDataAttributes(e){if(!e)return{}
const t={},n=Object.keys(e.dataset).filter((e=>e.startsWith("bs")&&!e.startsWith("bsConfig")))
for(const r of n){let n=r.replace(/^bs/,"")
n=n.charAt(0).toLowerCase()+n.slice(1,n.length),t[n]=I(e.dataset[r])}return t},getDataAttribute:(e,t)=>I(e.getAttribute(`data-bs-${P(t)}`))}
class q extends class{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(e){return e=this._mergeConfigObj(e),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}_configAfterMerge(e){return e}_mergeConfigObj(e,t){const r=n(t)?M.getDataAttribute(t,"config"):{}
return{...this.constructor.Default,..."object"==typeof r?r:{},...n(t)?M.getDataAttributes(t):{},..."object"==typeof e?e:{}}}_typeCheckConfig(e,t=this.constructor.DefaultType){for(const o of Object.keys(t)){const i=t[o],s=e[o],a=n(s)?"element":null==(r=s)?`${r}`:Object.prototype.toString.call(r).match(/\s([a-z]+)/i)[1].toLowerCase()
if(!new RegExp(i).test(a))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${o}" provided type "${a}" but expected type "${i}".`)}var r}}{constructor(e,t){super(),(e=r(e))&&(this._element=e,this._config=this._getConfig(t),T.set(this._element,this.constructor.DATA_KEY,this))}dispose(){T.remove(this._element,this.constructor.DATA_KEY),L.off(this._element,this.constructor.EVENT_KEY)
for(const e of Object.getOwnPropertyNames(this))this[e]=null}_queueCallback(e,t,n=!0){d(e,t,n)}_getConfig(e){return e=this._mergeConfigObj(e,this._element),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}static getInstance(e){return T.get(r(e),this.DATA_KEY)}static getOrCreateInstance(e,t={}){return this.getInstance(e)||new this(e,"object"==typeof t?t:null)}static get VERSION(){return"5.2.0"}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(e){return`${e}${this.EVENT_KEY}`}}const B="ArrowLeft",W="ArrowRight",$="ArrowUp",R="ArrowDown",H="active",V="fade",K="show",Y='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',U=`.nav-link:not(.dropdown-toggle), .list-group-item:not(.dropdown-toggle), [role="tab"]:not(.dropdown-toggle), ${Y}`
class z extends q{constructor(e){super(e),this._parent=this._element.closest('.list-group, .nav, [role="tablist"]'),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),L.on(this._element,"keydown.bs.tab",(e=>this._keydown(e))))}static get NAME(){return"tab"}show(){const e=this._element
if(this._elemIsActive(e))return
const t=this._getActiveElem(),n=t?L.trigger(t,"hide.bs.tab",{relatedTarget:e}):null
L.trigger(e,"show.bs.tab",{relatedTarget:t}).defaultPrevented||n&&n.defaultPrevented||(this._deactivate(t,e),this._activate(e,t))}_activate(e,n){e&&(e.classList.add(H),this._activate(t(e)),this._queueCallback((()=>{"tab"===e.getAttribute("role")?(e.focus(),e.removeAttribute("tabindex"),e.setAttribute("aria-selected",!0),this._toggleDropDown(e,!0),L.trigger(e,"shown.bs.tab",{relatedTarget:n})):e.classList.add(K)}),e,e.classList.contains(V)))}_deactivate(e,n){e&&(e.classList.remove(H),e.blur(),this._deactivate(t(e)),this._queueCallback((()=>{"tab"===e.getAttribute("role")?(e.setAttribute("aria-selected",!1),e.setAttribute("tabindex","-1"),this._toggleDropDown(e,!1),L.trigger(e,"hidden.bs.tab",{relatedTarget:n})):e.classList.remove(K)}),e,e.classList.contains(V)))}_keydown(e){if(![B,W,$,R].includes(e.key))return
e.stopPropagation(),e.preventDefault()
const t=[W,R].includes(e.key),n=p(this._getChildren().filter((e=>!i(e))),e.target,t,!0)
n&&z.getOrCreateInstance(n).show()}_getChildren(){return S.find(U,this._parent)}_getActiveElem(){return this._getChildren().find((e=>this._elemIsActive(e)))||null}_setInitialAttributes(e,t){this._setAttributeIfNotExists(e,"role","tablist")
for(const e of t)this._setInitialAttributesOnChild(e)}_setInitialAttributesOnChild(e){e=this._getInnerElement(e)
const t=this._elemIsActive(e),n=this._getOuterElement(e)
e.setAttribute("aria-selected",t),n!==e&&this._setAttributeIfNotExists(n,"role","presentation"),t||e.setAttribute("tabindex","-1"),this._setAttributeIfNotExists(e,"role","tab"),this._setInitialAttributesOnTargetPanel(e)}_setInitialAttributesOnTargetPanel(e){const n=t(e)
n&&(this._setAttributeIfNotExists(n,"role","tabpanel"),e.id&&this._setAttributeIfNotExists(n,"aria-labelledby",`#${e.id}`))}_toggleDropDown(e,t){const n=this._getOuterElement(e)
if(!n.classList.contains("dropdown"))return
const r=(e,r)=>{const o=S.findOne(e,n)
o&&o.classList.toggle(r,t)}
r(".dropdown-toggle",H),r(".dropdown-menu",K),r(".dropdown-item",H),n.setAttribute("aria-expanded",t)}_setAttributeIfNotExists(e,t,n){e.hasAttribute(t)||e.setAttribute(t,n)}_elemIsActive(e){return e.classList.contains(H)}_getInnerElement(e){return e.matches(U)?e:S.findOne(U,e)}_getOuterElement(e){return e.closest(".nav-item, .list-group-item")||e}static jQueryInterface(e){return this.each((function(){const t=z.getOrCreateInstance(this)
if("string"==typeof e){if(void 0===t[e]||e.startsWith("_")||"constructor"===e)throw new TypeError(`No method named "${e}"`)
t[e]()}}))}}L.on(document,"click.bs.tab",Y,(function(e){["A","AREA"].includes(this.tagName)&&e.preventDefault(),i(this)||z.getOrCreateInstance(this).show()})),L.on(window,"load.bs.tab",(()=>{for(const e of S.find('.active[data-bs-toggle="tab"], .active[data-bs-toggle="pill"], .active[data-bs-toggle="list"]'))z.getOrCreateInstance(e)})),u(z)
var F="top",Q="bottom",J="right",X="left",G="auto",Z=[F,Q,J,X],ee="start",te="end",ne="clippingParents",re="viewport",oe="popper",ie="reference",se=Z.reduce((function(e,t){return e.concat([t+"-"+ee,t+"-"+te])}),[]),ae=[].concat(Z,[G]).reduce((function(e,t){return e.concat([t,t+"-"+ee,t+"-"+te])}),[]),ce="beforeRead",le="read",ue="afterRead",fe="beforeMain",de="main",pe="afterMain",he="beforeWrite",me="write",ge="afterWrite",be=[ce,le,ue,fe,de,pe,he,me,ge]
function ve(e){return e?(e.nodeName||"").toLowerCase():null}function ye(e){if(null==e)return window
if("[object Window]"!==e.toString()){var t=e.ownerDocument
return t&&t.defaultView||window}return e}function we(e){return e instanceof ye(e).Element||e instanceof Element}function _e(e){return e instanceof ye(e).HTMLElement||e instanceof HTMLElement}function xe(e){return"undefined"!=typeof ShadowRoot&&(e instanceof ye(e).ShadowRoot||e instanceof ShadowRoot)}var Oe={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state
Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},r=t.attributes[e]||{},o=t.elements[e]
_e(o)&&ve(o)&&(Object.assign(o.style,n),Object.keys(r).forEach((function(e){var t=r[e]
!1===t?o.removeAttribute(e):o.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}}
return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var r=t.elements[e],o=t.attributes[e]||{},i=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{})
_e(r)&&ve(r)&&(Object.assign(r.style,i),Object.keys(o).forEach((function(e){r.removeAttribute(e)})))}))}},requires:["computeStyles"]}
function Ee(e){return e.split("-")[0]}var Ae=Math.max,je=Math.min,Ce=Math.round
function De(e,t){void 0===t&&(t=!1)
var n=e.getBoundingClientRect(),r=1,o=1
if(_e(e)&&t){var i=e.offsetHeight,s=e.offsetWidth
s>0&&(r=Ce(n.width)/s||1),i>0&&(o=Ce(n.height)/i||1)}return{width:n.width/r,height:n.height/o,top:n.top/o,right:n.right/r,bottom:n.bottom/o,left:n.left/r,x:n.left/r,y:n.top/o}}function Le(e){var t=De(e),n=e.offsetWidth,r=e.offsetHeight
return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function ke(e,t){var n=t.getRootNode&&t.getRootNode()
if(e.contains(t))return!0
if(n&&xe(n)){var r=t
do{if(r&&e.isSameNode(r))return!0
r=r.parentNode||r.host}while(r)}return!1}function Se(e){return ye(e).getComputedStyle(e)}function Ne(e){return["table","td","th"].indexOf(ve(e))>=0}function Te(e){return((we(e)?e.ownerDocument:e.document)||window.document).documentElement}function Ie(e){return"html"===ve(e)?e:e.assignedSlot||e.parentNode||(xe(e)?e.host:null)||Te(e)}function Pe(e){return _e(e)&&"fixed"!==Se(e).position?e.offsetParent:null}function Me(e){for(var t=ye(e),n=Pe(e);n&&Ne(n)&&"static"===Se(n).position;)n=Pe(n)
return n&&("html"===ve(n)||"body"===ve(n)&&"static"===Se(n).position)?t:n||function(e){var t=-1!==navigator.userAgent.toLowerCase().indexOf("firefox")
if(-1!==navigator.userAgent.indexOf("Trident")&&_e(e)&&"fixed"===Se(e).position)return null
var n=Ie(e)
for(xe(n)&&(n=n.host);_e(n)&&["html","body"].indexOf(ve(n))<0;){var r=Se(n)
if("none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||-1!==["transform","perspective"].indexOf(r.willChange)||t&&"filter"===r.willChange||t&&r.filter&&"none"!==r.filter)return n
n=n.parentNode}return null}(e)||t}function qe(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function Be(e,t,n){return Ae(e,je(t,n))}function We(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function $e(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}var Re={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,s=n.modifiersData.popperOffsets,a=Ee(n.placement),c=qe(a),l=[X,J].indexOf(a)>=0?"height":"width"
if(i&&s){var u=function(e,t){return We("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:$e(e,Z))}(o.padding,n),f=Le(i),d="y"===c?F:X,p="y"===c?Q:J,h=n.rects.reference[l]+n.rects.reference[c]-s[c]-n.rects.popper[l],m=s[c]-n.rects.reference[c],g=Me(i),b=g?"y"===c?g.clientHeight||0:g.clientWidth||0:0,v=h/2-m/2,y=u[d],w=b-f[l]-u[p],_=b/2-f[l]/2+v,x=Be(y,_,w),O=c
n.modifiersData[r]=((t={})[O]=x,t.centerOffset=x-_,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n
null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&ke(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]}
function He(e){return e.split("-")[1]}var Ve={top:"auto",right:"auto",bottom:"auto",left:"auto"}
function Ke(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,s=e.offsets,a=e.position,c=e.gpuAcceleration,l=e.adaptive,u=e.roundOffsets,f=e.isFixed,d=s.x,p=void 0===d?0:d,h=s.y,m=void 0===h?0:h,g="function"==typeof u?u({x:p,y:m}):{x:p,y:m}
p=g.x,m=g.y
var b=s.hasOwnProperty("x"),v=s.hasOwnProperty("y"),y=X,w=F,_=window
if(l){var x=Me(n),O="clientHeight",E="clientWidth"
x===ye(n)&&"static"!==Se(x=Te(n)).position&&"absolute"===a&&(O="scrollHeight",E="scrollWidth"),(o===F||(o===X||o===J)&&i===te)&&(w=Q,m-=(f&&x===_&&_.visualViewport?_.visualViewport.height:x[O])-r.height,m*=c?1:-1),o!==X&&(o!==F&&o!==Q||i!==te)||(y=J,p-=(f&&x===_&&_.visualViewport?_.visualViewport.width:x[E])-r.width,p*=c?1:-1)}var A,j=Object.assign({position:a},l&&Ve),C=!0===u?function(e){var t=e.x,n=e.y,r=window.devicePixelRatio||1
return{x:Ce(t*r)/r||0,y:Ce(n*r)/r||0}}({x:p,y:m}):{x:p,y:m}
return p=C.x,m=C.y,c?Object.assign({},j,((A={})[w]=v?"0":"",A[y]=b?"0":"",A.transform=(_.devicePixelRatio||1)<=1?"translate("+p+"px, "+m+"px)":"translate3d("+p+"px, "+m+"px, 0)",A)):Object.assign({},j,((t={})[w]=v?m+"px":"",t[y]=b?p+"px":"",t.transform="",t))}var Ye={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,s=void 0===i||i,a=n.roundOffsets,c=void 0===a||a,l={placement:Ee(t.placement),variation:He(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:"fixed"===t.options.strategy}
null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,Ke(Object.assign({},l,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:c})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,Ke(Object.assign({},l,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},Ue={passive:!0},ze={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=void 0===o||o,s=r.resize,a=void 0===s||s,c=ye(t.elements.popper),l=[].concat(t.scrollParents.reference,t.scrollParents.popper)
return i&&l.forEach((function(e){e.addEventListener("scroll",n.update,Ue)})),a&&c.addEventListener("resize",n.update,Ue),function(){i&&l.forEach((function(e){e.removeEventListener("scroll",n.update,Ue)})),a&&c.removeEventListener("resize",n.update,Ue)}},data:{}},Fe={left:"right",right:"left",bottom:"top",top:"bottom"}
function Qe(e){return e.replace(/left|right|bottom|top/g,(function(e){return Fe[e]}))}var Je={start:"end",end:"start"}
function Xe(e){return e.replace(/start|end/g,(function(e){return Je[e]}))}function Ge(e){var t=ye(e)
return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function Ze(e){return De(Te(e)).left+Ge(e).scrollLeft}function et(e){var t=Se(e),n=t.overflow,r=t.overflowX,o=t.overflowY
return/auto|scroll|overlay|hidden/.test(n+o+r)}function tt(e){return["html","body","#document"].indexOf(ve(e))>=0?e.ownerDocument.body:_e(e)&&et(e)?e:tt(Ie(e))}function nt(e,t){var n
void 0===t&&(t=[])
var r=tt(e),o=r===(null==(n=e.ownerDocument)?void 0:n.body),i=ye(r),s=o?[i].concat(i.visualViewport||[],et(r)?r:[]):r,a=t.concat(s)
return o?a:a.concat(nt(Ie(s)))}function rt(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function ot(e,t){return t===re?rt(function(e){var t=ye(e),n=Te(e),r=t.visualViewport,o=n.clientWidth,i=n.clientHeight,s=0,a=0
return r&&(o=r.width,i=r.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(s=r.offsetLeft,a=r.offsetTop)),{width:o,height:i,x:s+Ze(e),y:a}}(e)):we(t)?function(e){var t=De(e)
return t.top=t.top+e.clientTop,t.left=t.left+e.clientLeft,t.bottom=t.top+e.clientHeight,t.right=t.left+e.clientWidth,t.width=e.clientWidth,t.height=e.clientHeight,t.x=t.left,t.y=t.top,t}(t):rt(function(e){var t,n=Te(e),r=Ge(e),o=null==(t=e.ownerDocument)?void 0:t.body,i=Ae(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=Ae(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),a=-r.scrollLeft+Ze(e),c=-r.scrollTop
return"rtl"===Se(o||n).direction&&(a+=Ae(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:s,x:a,y:c}}(Te(e)))}function it(e,t,n){var r="clippingParents"===t?function(e){var t=nt(Ie(e)),n=["absolute","fixed"].indexOf(Se(e).position)>=0&&_e(e)?Me(e):e
return we(n)?t.filter((function(e){return we(e)&&ke(e,n)&&"body"!==ve(e)})):[]}(e):[].concat(t),o=[].concat(r,[n]),i=o[0],s=o.reduce((function(t,n){var r=ot(e,n)
return t.top=Ae(r.top,t.top),t.right=je(r.right,t.right),t.bottom=je(r.bottom,t.bottom),t.left=Ae(r.left,t.left),t}),ot(e,i))
return s.width=s.right-s.left,s.height=s.bottom-s.top,s.x=s.left,s.y=s.top,s}function st(e){var t,n=e.reference,r=e.element,o=e.placement,i=o?Ee(o):null,s=o?He(o):null,a=n.x+n.width/2-r.width/2,c=n.y+n.height/2-r.height/2
switch(i){case F:t={x:a,y:n.y-r.height}
break
case Q:t={x:a,y:n.y+n.height}
break
case J:t={x:n.x+n.width,y:c}
break
case X:t={x:n.x-r.width,y:c}
break
default:t={x:n.x,y:n.y}}var l=i?qe(i):null
if(null!=l){var u="y"===l?"height":"width"
switch(s){case ee:t[l]=t[l]-(n[u]/2-r[u]/2)
break
case te:t[l]=t[l]+(n[u]/2-r[u]/2)}}return t}function at(e,t){void 0===t&&(t={})
var n=t,r=n.placement,o=void 0===r?e.placement:r,i=n.boundary,s=void 0===i?ne:i,a=n.rootBoundary,c=void 0===a?re:a,l=n.elementContext,u=void 0===l?oe:l,f=n.altBoundary,d=void 0!==f&&f,p=n.padding,h=void 0===p?0:p,m=We("number"!=typeof h?h:$e(h,Z)),g=u===oe?ie:oe,b=e.rects.popper,v=e.elements[d?g:u],y=it(we(v)?v:v.contextElement||Te(e.elements.popper),s,c),w=De(e.elements.reference),_=st({reference:w,element:b,strategy:"absolute",placement:o}),x=rt(Object.assign({},b,_)),O=u===oe?x:w,E={top:y.top-O.top+m.top,bottom:O.bottom-y.bottom+m.bottom,left:y.left-O.left+m.left,right:O.right-y.right+m.right},A=e.modifiersData.offset
if(u===oe&&A){var j=A[o]
Object.keys(E).forEach((function(e){var t=[J,Q].indexOf(e)>=0?1:-1,n=[F,Q].indexOf(e)>=0?"y":"x"
E[e]+=j[n]*t}))}return E}function ct(e,t){void 0===t&&(t={})
var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,s=n.padding,a=n.flipVariations,c=n.allowedAutoPlacements,l=void 0===c?ae:c,u=He(r),f=u?a?se:se.filter((function(e){return He(e)===u})):Z,d=f.filter((function(e){return l.indexOf(e)>=0}))
0===d.length&&(d=f)
var p=d.reduce((function(t,n){return t[n]=at(e,{placement:n,boundary:o,rootBoundary:i,padding:s})[Ee(n)],t}),{})
return Object.keys(p).sort((function(e,t){return p[e]-p[t]}))}var lt={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name
if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=void 0===o||o,s=n.altAxis,a=void 0===s||s,c=n.fallbackPlacements,l=n.padding,u=n.boundary,f=n.rootBoundary,d=n.altBoundary,p=n.flipVariations,h=void 0===p||p,m=n.allowedAutoPlacements,g=t.options.placement,b=Ee(g),v=c||(b!==g&&h?function(e){if(Ee(e)===G)return[]
var t=Qe(e)
return[Xe(e),t,Xe(t)]}(g):[Qe(g)]),y=[g].concat(v).reduce((function(e,n){return e.concat(Ee(n)===G?ct(t,{placement:n,boundary:u,rootBoundary:f,padding:l,flipVariations:h,allowedAutoPlacements:m}):n)}),[]),w=t.rects.reference,_=t.rects.popper,x=new Map,O=!0,E=y[0],A=0;A<y.length;A++){var j=y[A],C=Ee(j),D=He(j)===ee,L=[F,Q].indexOf(C)>=0,k=L?"width":"height",S=at(t,{placement:j,boundary:u,rootBoundary:f,altBoundary:d,padding:l}),N=L?D?J:X:D?Q:F
w[k]>_[k]&&(N=Qe(N))
var T=Qe(N),I=[]
if(i&&I.push(S[C]<=0),a&&I.push(S[N]<=0,S[T]<=0),I.every((function(e){return e}))){E=j,O=!1
break}x.set(j,I)}if(O)for(var P=function(e){var t=y.find((function(t){var n=x.get(t)
if(n)return n.slice(0,e).every((function(e){return e}))}))
if(t)return E=t,"break"},M=h?3:1;M>0&&"break"!==P(M);M--);t.placement!==E&&(t.modifiersData[r]._skip=!0,t.placement=E,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}}
function ut(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function ft(e){return[F,J,Q,X].some((function(t){return e[t]>=0}))}var dt={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,s=at(t,{elementContext:"reference"}),a=at(t,{altBoundary:!0}),c=ut(s,r),l=ut(a,o,i),u=ft(c),f=ft(l)
t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:l,isReferenceHidden:u,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":f})}},pt={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=void 0===o?[0,0]:o,s=ae.reduce((function(e,n){return e[n]=function(e,t,n){var r=Ee(e),o=[X,F].indexOf(r)>=0?-1:1,i="function"==typeof n?n(Object.assign({},t,{placement:e})):n,s=i[0],a=i[1]
return s=s||0,a=(a||0)*o,[X,J].indexOf(r)>=0?{x:a,y:s}:{x:s,y:a}}(n,t.rects,i),e}),{}),a=s[t.placement],c=a.x,l=a.y
null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=l),t.modifiersData[r]=s}},ht={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name
t.modifiersData[n]=st({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},mt={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=void 0===o||o,s=n.altAxis,a=void 0!==s&&s,c=n.boundary,l=n.rootBoundary,u=n.altBoundary,f=n.padding,d=n.tether,p=void 0===d||d,h=n.tetherOffset,m=void 0===h?0:h,g=at(t,{boundary:c,rootBoundary:l,padding:f,altBoundary:u}),b=Ee(t.placement),v=He(t.placement),y=!v,w=qe(b),_="x"===w?"y":"x",x=t.modifiersData.popperOffsets,O=t.rects.reference,E=t.rects.popper,A="function"==typeof m?m(Object.assign({},t.rects,{placement:t.placement})):m,j="number"==typeof A?{mainAxis:A,altAxis:A}:Object.assign({mainAxis:0,altAxis:0},A),C=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,D={x:0,y:0}
if(x){if(i){var L,k="y"===w?F:X,S="y"===w?Q:J,N="y"===w?"height":"width",T=x[w],I=T+g[k],P=T-g[S],M=p?-E[N]/2:0,q=v===ee?O[N]:E[N],B=v===ee?-E[N]:-O[N],W=t.elements.arrow,$=p&&W?Le(W):{width:0,height:0},R=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},H=R[k],V=R[S],K=Be(0,O[N],$[N]),Y=y?O[N]/2-M-K-H-j.mainAxis:q-K-H-j.mainAxis,U=y?-O[N]/2+M+K+V+j.mainAxis:B+K+V+j.mainAxis,z=t.elements.arrow&&Me(t.elements.arrow),G=z?"y"===w?z.clientTop||0:z.clientLeft||0:0,Z=null!=(L=null==C?void 0:C[w])?L:0,te=T+U-Z,ne=Be(p?je(I,T+Y-Z-G):I,T,p?Ae(P,te):P)
x[w]=ne,D[w]=ne-T}if(a){var re,oe="x"===w?F:X,ie="x"===w?Q:J,se=x[_],ae="y"===_?"height":"width",ce=se+g[oe],le=se-g[ie],ue=-1!==[F,X].indexOf(b),fe=null!=(re=null==C?void 0:C[_])?re:0,de=ue?ce:se-O[ae]-E[ae]-fe+j.altAxis,pe=ue?se+O[ae]+E[ae]-fe-j.altAxis:le,he=p&&ue?function(e,t,n){var r=Be(e,t,n)
return r>n?n:r}(de,se,pe):Be(p?de:ce,se,p?pe:le)
x[_]=he,D[_]=he-se}t.modifiersData[r]=D}},requiresIfExists:["offset"]}
function gt(e,t,n){void 0===n&&(n=!1)
var r,o,i=_e(t),s=_e(t)&&function(e){var t=e.getBoundingClientRect(),n=Ce(t.width)/e.offsetWidth||1,r=Ce(t.height)/e.offsetHeight||1
return 1!==n||1!==r}(t),a=Te(t),c=De(e,s),l={scrollLeft:0,scrollTop:0},u={x:0,y:0}
return(i||!i&&!n)&&(("body"!==ve(t)||et(a))&&(l=(r=t)!==ye(r)&&_e(r)?{scrollLeft:(o=r).scrollLeft,scrollTop:o.scrollTop}:Ge(r)),_e(t)?((u=De(t,!0)).x+=t.clientLeft,u.y+=t.clientTop):a&&(u.x=Ze(a))),{x:c.left+l.scrollLeft-u.x,y:c.top+l.scrollTop-u.y,width:c.width,height:c.height}}function bt(e){var t=new Map,n=new Set,r=[]
function o(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e)
r&&o(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||o(e)})),r}var vt={placement:"bottom",modifiers:[],strategy:"absolute"}
function yt(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n]
return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function wt(e){void 0===e&&(e={})
var t=e,n=t.defaultModifiers,r=void 0===n?[]:n,o=t.defaultOptions,i=void 0===o?vt:o
return function(e,t,n){void 0===n&&(n=i)
var o,s,a={placement:"bottom",orderedModifiers:[],options:Object.assign({},vt,i),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},c=[],l=!1,u={state:a,setOptions:function(n){var o="function"==typeof n?n(a.options):n
f(),a.options=Object.assign({},i,a.options,o),a.scrollParents={reference:we(e)?nt(e):e.contextElement?nt(e.contextElement):[],popper:nt(t)}
var s,l,d=function(e){var t=bt(e)
return be.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}((s=[].concat(r,a.options.modifiers),l=s.reduce((function(e,t){var n=e[t.name]
return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{}),Object.keys(l).map((function(e){return l[e]}))))
return a.orderedModifiers=d.filter((function(e){return e.enabled})),a.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,o=e.effect
if("function"==typeof o){var i=o({state:a,name:t,instance:u,options:r}),s=function(){}
c.push(i||s)}})),u.update()},forceUpdate:function(){if(!l){var e=a.elements,t=e.reference,n=e.popper
if(yt(t,n)){a.rects={reference:gt(t,Me(n),"fixed"===a.options.strategy),popper:Le(n)},a.reset=!1,a.placement=a.options.placement,a.orderedModifiers.forEach((function(e){return a.modifiersData[e.name]=Object.assign({},e.data)}))
for(var r=0;r<a.orderedModifiers.length;r++)if(!0!==a.reset){var o=a.orderedModifiers[r],i=o.fn,s=o.options,c=void 0===s?{}:s,f=o.name
"function"==typeof i&&(a=i({state:a,options:c,name:f,instance:u})||a)}else a.reset=!1,r=-1}}},update:(o=function(){return new Promise((function(e){u.forceUpdate(),e(a)}))},function(){return s||(s=new Promise((function(e){Promise.resolve().then((function(){s=void 0,e(o())}))}))),s}),destroy:function(){f(),l=!0}}
if(!yt(e,t))return u
function f(){c.forEach((function(e){return e()})),c=[]}return u.setOptions(n).then((function(e){!l&&n.onFirstUpdate&&n.onFirstUpdate(e)})),u}}var _t=wt(),xt=wt({defaultModifiers:[ze,ht,Ye,Oe]}),Ot=wt({defaultModifiers:[ze,ht,Ye,Oe,pt,lt,mt,Re,dt]}),Et=Object.freeze({__proto__:null,popperGenerator:wt,detectOverflow:at,createPopperBase:_t,createPopper:Ot,createPopperLite:xt,top:F,bottom:Q,right:J,left:X,auto:G,basePlacements:Z,start:ee,end:te,clippingParents:ne,viewport:re,popper:oe,reference:ie,variationPlacements:se,placements:ae,beforeRead:ce,read:le,afterRead:ue,beforeMain:fe,main:de,afterMain:pe,beforeWrite:he,write:me,afterWrite:ge,modifierPhases:be,applyStyles:Oe,arrow:Re,computeStyles:Ye,eventListeners:ze,flip:lt,hide:dt,offset:pt,popperOffsets:ht,preventOverflow:mt})
const At="dropdown",jt="ArrowUp",Ct="ArrowDown",Dt="click.bs.dropdown.data-api",Lt="keydown.bs.dropdown.data-api",kt="show",St='[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',Nt=`${St}.show`,Tt=".dropdown-menu",It=l()?"top-end":"top-start",Pt=l()?"top-start":"top-end",Mt=l()?"bottom-end":"bottom-start",qt=l()?"bottom-start":"bottom-end",Bt=l()?"left-start":"right-start",Wt=l()?"right-start":"left-start",$t={autoClose:!0,boundary:"clippingParents",display:"dynamic",offset:[0,2],popperConfig:null,reference:"toggle"},Rt={autoClose:"(boolean|string)",boundary:"(string|element)",display:"string",offset:"(array|string|function)",popperConfig:"(null|object|function)",reference:"(string|element|object)"}
class Ht extends q{constructor(e,t){super(e,t),this._popper=null,this._parent=this._element.parentNode,this._menu=S.findOne(Tt,this._parent),this._inNavbar=this._detectNavbar()}static get Default(){return $t}static get DefaultType(){return Rt}static get NAME(){return At}toggle(){return this._isShown()?this.hide():this.show()}show(){if(i(this._element)||this._isShown())return
const e={relatedTarget:this._element}
if(!L.trigger(this._element,"show.bs.dropdown",e).defaultPrevented){if(this._createPopper(),"ontouchstart"in document.documentElement&&!this._parent.closest(".navbar-nav"))for(const e of[].concat(...document.body.children))L.on(e,"mouseover",s)
this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add(kt),this._element.classList.add(kt),L.trigger(this._element,"shown.bs.dropdown",e)}}hide(){if(i(this._element)||!this._isShown())return
const e={relatedTarget:this._element}
this._completeHide(e)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(e){if(!L.trigger(this._element,"hide.bs.dropdown",e).defaultPrevented){if("ontouchstart"in document.documentElement)for(const e of[].concat(...document.body.children))L.off(e,"mouseover",s)
this._popper&&this._popper.destroy(),this._menu.classList.remove(kt),this._element.classList.remove(kt),this._element.setAttribute("aria-expanded","false"),M.removeDataAttribute(this._menu,"popper"),L.trigger(this._element,"hidden.bs.dropdown",e)}}_getConfig(e){if("object"==typeof(e=super._getConfig(e)).reference&&!n(e.reference)&&"function"!=typeof e.reference.getBoundingClientRect)throw new TypeError(`${At.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`)
return e}_createPopper(){if(void 0===Et)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)")
let e=this._element
"parent"===this._config.reference?e=this._parent:n(this._config.reference)?e=r(this._config.reference):"object"==typeof this._config.reference&&(e=this._config.reference)
const t=this._getPopperConfig()
this._popper=Ot(e,this._menu,t)}_isShown(){return this._menu.classList.contains(kt)}_getPlacement(){const e=this._parent
if(e.classList.contains("dropend"))return Bt
if(e.classList.contains("dropstart"))return Wt
if(e.classList.contains("dropup-center"))return"top"
if(e.classList.contains("dropdown-center"))return"bottom"
const t="end"===getComputedStyle(this._menu).getPropertyValue("--bs-position").trim()
return e.classList.contains("dropup")?t?Pt:It:t?qt:Mt}_detectNavbar(){return null!==this._element.closest(".navbar")}_getOffset(){const{offset:e}=this._config
return"string"==typeof e?e.split(",").map((e=>Number.parseInt(e,10))):"function"==typeof e?t=>e(t,this._element):e}_getPopperConfig(){const e={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]}
return(this._inNavbar||"static"===this._config.display)&&(M.setDataAttribute(this._menu,"popper","static"),e.modifiers=[{name:"applyStyles",enabled:!1}]),{...e,..."function"==typeof this._config.popperConfig?this._config.popperConfig(e):this._config.popperConfig}}_selectMenuItem({key:e,target:t}){const n=S.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",this._menu).filter((e=>o(e)))
n.length&&p(n,t,e===Ct,!n.includes(t)).focus()}static jQueryInterface(e){return this.each((function(){const t=Ht.getOrCreateInstance(this,e)
if("string"==typeof e){if(void 0===t[e])throw new TypeError(`No method named "${e}"`)
t[e]()}}))}static clearMenus(e){if(2===e.button||"keyup"===e.type&&"Tab"!==e.key)return
const t=S.find(Nt)
for(const n of t){const t=Ht.getInstance(n)
if(!t||!1===t._config.autoClose)continue
const r=e.composedPath(),o=r.includes(t._menu)
if(r.includes(t._element)||"inside"===t._config.autoClose&&!o||"outside"===t._config.autoClose&&o)continue
if(t._menu.contains(e.target)&&("keyup"===e.type&&"Tab"===e.key||/input|select|option|textarea|form/i.test(e.target.tagName)))continue
const i={relatedTarget:t._element}
"click"===e.type&&(i.clickEvent=e),t._completeHide(i)}}static dataApiKeydownHandler(e){const t=/input|textarea/i.test(e.target.tagName),n="Escape"===e.key,r=[jt,Ct].includes(e.key)
if(!r&&!n)return
if(t&&!n)return
e.preventDefault()
const o=S.findOne(St,e.delegateTarget.parentNode),i=Ht.getOrCreateInstance(o)
if(r)return e.stopPropagation(),i.show(),void i._selectMenuItem(e)
i._isShown()&&(e.stopPropagation(),i.hide(),o.focus())}}L.on(document,Lt,St,Ht.dataApiKeydownHandler),L.on(document,Lt,Tt,Ht.dataApiKeydownHandler),L.on(document,Dt,Ht.clearMenus),L.on(document,"keyup.bs.dropdown.data-api",Ht.clearMenus),L.on(document,Dt,St,(function(e){e.preventDefault(),Ht.getOrCreateInstance(this).toggle()})),u(Ht),document.addEventListener("DOMContentLoaded",(function(){if(document.getElementById("prism-css").media="all",document.getElementById("toggle-offcanvas").addEventListener("click",(function(){document.body.classList.toggle("offcanvas-open")})),0!=document.querySelectorAll(".demo").length&&!document.getElementById("select-theme")){var e=window.themes||["bootstrap5","bootstrap4","default"],t={bootstrap5:"Bootstrap 5",bootstrap4:"Bootstrap 4",default:"Default"},n=localStorage.getItem("theme");-1==e.indexOf(n)&&(n="bootstrap5")
var r=document.createElement("input")
r.classList.add("theme-selector-input")
var o=document.getElementById("main-container")
document.querySelectorAll(".demo-mini").length||(o.insertBefore(r,o.firstChild),new TomSelect(r,{maxItems:1,controlInput:"<input>",plugins:["no_backspace_delete"],options:e.map((n=>-1!=e.indexOf(n)&&{text:t[n],value:n})),items:[n],render:{item:(e,t)=>"<div>Theme: "+t(e.text)+"</div>"},onChange:e=>{i(e)}})),i(n),document.addEventListener("click",(e=>{var t=e.target.closest(".opensandbox")
if(t){var n,r=t.closest(".demo")
function l(e){var t=r.querySelector(e)
return t&&t.textContent||""}var o=`<div class="p-4">${r.querySelector("textarea").value||""}</div>`,i=l("style"),s=l("script"),a=[`https://cdn.jsdelivr.net/npm/tom-select@2.1.0/dist/css/tom-select.${localStorage.getItem("theme")||"bootstrap4"}.min.css`,"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"]
"bootstrap4"==localStorage.getItem("theme")?a.push("https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/css/bootstrap.min.css"):a.push("https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css")
var c=["https://cdn.jsdelivr.net/npm/tom-select@2.1.0/dist/js/tom-select.complete.min.js"]
r.classList.contains("demo-jquery")&&(c.push("https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js"),c.push("https://cdn.jsdelivr.net/npm/jquery-ui-dist@1.12.1/jquery-ui.js")),n={html:o,js:s,css:i,js_external:c.join(";"),css_external:a.join(";")},r.querySelector(".codepen").value=JSON.stringify(n),r.querySelector(".jsfiddle-html").value=o,r.querySelector(".jsfiddle-js").value=s,r.querySelector(".jsfiddle-css").value=i,r.querySelector(".jsfiddle-resources").value=c.join(",")+","+a.join(","),setTimeout((()=>{t.nextElementSibling.submit()}),50)}}))}function i(t){if(-1!=e.indexOf(t)){localStorage.setItem("theme",t)
var n=document.getElementById("select-theme")
n&&n.parentNode.removeChild(n),(n=document.createElement("link")).id="select-theme",n.setAttribute("rel","stylesheet"),n.setAttribute("href","/css/tom-select."+t+".css"),document.getElementsByTagName("head")[0].appendChild(n)}}}))},"function"==typeof define&&define.amd?define(e):e()
//# sourceMappingURL=index.bundle.js.map
