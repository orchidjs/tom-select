var e
e=function(){"use strict"
const e=new Map
var t={set(t,n,r){e.has(t)||e.set(t,new Map)
const o=e.get(t)
o.has(n)||0===o.size?o.set(n,r):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(o.keys())[0]}.`)},get:(t,n)=>e.has(t)&&e.get(t).get(n)||null,remove(t,n){if(!e.has(t))return
const r=e.get(t)
r.delete(n),0===r.size&&e.delete(t)}}
const n="transitionend",r=e=>(e&&window.CSS&&window.CSS.escape&&(e=e.replace(/#([^\s"#']+)/g,((e,t)=>`#${CSS.escape(t)}`))),e),o=e=>!(!e||"object"!=typeof e)&&(void 0!==e.jquery&&(e=e[0]),void 0!==e.nodeType),i=e=>o(e)?e.jquery?e[0]:e:"string"==typeof e&&e.length>0?document.querySelector(r(e)):null,s=e=>{if(!o(e)||0===e.getClientRects().length)return!1
const t="visible"===getComputedStyle(e).getPropertyValue("visibility"),n=e.closest("details:not([open])")
if(!n)return t
if(n!==e){const t=e.closest("summary")
if(t&&t.parentNode!==n)return!1
if(null===t)return!1}return t},a=e=>!e||e.nodeType!==Node.ELEMENT_NODE||!!e.classList.contains("disabled")||(void 0!==e.disabled?e.disabled:e.hasAttribute("disabled")&&"false"!==e.getAttribute("disabled")),c=()=>{},l=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,u=[],f=()=>"rtl"===document.documentElement.dir,d=e=>{var t
t=()=>{const t=l()
if(t){const n=e.NAME,r=t.fn[n]
t.fn[n]=e.jQueryInterface,t.fn[n].Constructor=e,t.fn[n].noConflict=()=>(t.fn[n]=r,e.jQueryInterface)}},"loading"===document.readyState?(u.length||document.addEventListener("DOMContentLoaded",(()=>{for(const e of u)e()})),u.push(t)):t()},p=(e,t=[],n=e)=>"function"==typeof e?e(...t):n,m=(e,t,r=!0)=>{if(!r)return void p(e)
const o=(e=>{if(!e)return 0
let{transitionDuration:t,transitionDelay:n}=window.getComputedStyle(e)
const r=Number.parseFloat(t),o=Number.parseFloat(n)
return r||o?(t=t.split(",")[0],n=n.split(",")[0],1e3*(Number.parseFloat(t)+Number.parseFloat(n))):0})(t)+5
let i=!1
const s=({target:r})=>{r===t&&(i=!0,t.removeEventListener(n,s),p(e))}
t.addEventListener(n,s),setTimeout((()=>{i||t.dispatchEvent(new Event(n))}),o)},h=(e,t,n,r)=>{const o=e.length
let i=e.indexOf(t)
return-1===i?!n&&r?e[o-1]:e[0]:(i+=n?1:-1,r&&(i=(i+o)%o),e[Math.max(0,Math.min(i,o-1))])},g=/[^.]*(?=\..*)\.|.*/,b=/\..*/,v=/::\d+$/,y={}
let w=1
const _={mouseenter:"mouseover",mouseleave:"mouseout"},x=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"])
function O(e,t){return t&&`${t}::${w++}`||e.uidEvent||w++}function E(e){const t=O(e)
return e.uidEvent=t,y[t]=y[t]||{},y[t]}function A(e,t,n=null){return Object.values(e).find((e=>e.callable===t&&e.delegationSelector===n))}function j(e,t,n){const r="string"==typeof t,o=r?n:t||n
let i=L(e)
return x.has(i)||(i=e),[r,o,i]}function C(e,t,n,r,o){if("string"!=typeof t||!e)return
let[i,s,a]=j(t,n,r)
if(t in _){const e=e=>function(t){if(!t.relatedTarget||t.relatedTarget!==t.delegateTarget&&!t.delegateTarget.contains(t.relatedTarget))return e.call(this,t)}
s=e(s)}const c=E(e),l=c[a]||(c[a]={}),u=A(l,s,i?n:null)
if(u)return void(u.oneOff=u.oneOff&&o)
const f=O(s,t.replace(g,"")),d=i?function(e,t,n){return function r(o){const i=e.querySelectorAll(t)
for(let{target:s}=o;s&&s!==this;s=s.parentNode)for(const a of i)if(a===s)return T(o,{delegateTarget:s}),r.oneOff&&k.off(e,o.type,t,n),n.apply(s,[o])}}(e,n,s):function(e,t){return function n(r){return T(r,{delegateTarget:e}),n.oneOff&&k.off(e,r.type,t),t.apply(e,[r])}}(e,s)
d.delegationSelector=i?n:null,d.callable=s,d.oneOff=o,d.uidEvent=f,l[f]=d,e.addEventListener(a,d,i)}function S(e,t,n,r,o){const i=A(t[n],r,o)
i&&(e.removeEventListener(n,i,Boolean(o)),delete t[n][i.uidEvent])}function D(e,t,n,r){const o=t[n]||{}
for(const[i,s]of Object.entries(o))i.includes(r)&&S(e,t,n,s.callable,s.delegationSelector)}function L(e){return e=e.replace(b,""),_[e]||e}const k={on(e,t,n,r){C(e,t,n,r,!1)},one(e,t,n,r){C(e,t,n,r,!0)},off(e,t,n,r){if("string"!=typeof t||!e)return
const[o,i,s]=j(t,n,r),a=s!==t,c=E(e),l=c[s]||{},u=t.startsWith(".")
if(void 0===i){if(u)for(const n of Object.keys(c))D(e,c,n,t.slice(1))
for(const[n,r]of Object.entries(l)){const o=n.replace(v,"")
a&&!t.includes(o)||S(e,c,s,r.callable,r.delegationSelector)}}else{if(!Object.keys(l).length)return
S(e,c,s,i,o?n:null)}},trigger(e,t,n){if("string"!=typeof t||!e)return null
const r=l()
let o=null,i=!0,s=!0,a=!1
t!==L(t)&&r&&(o=r.Event(t,n),r(e).trigger(o),i=!o.isPropagationStopped(),s=!o.isImmediatePropagationStopped(),a=o.isDefaultPrevented())
const c=T(new Event(t,{bubbles:i,cancelable:!0}),n)
return a&&c.preventDefault(),s&&e.dispatchEvent(c),c.defaultPrevented&&o&&o.preventDefault(),c}}
function T(e,t={}){for(const[n,r]of Object.entries(t))try{e[n]=r}catch{Object.defineProperty(e,n,{configurable:!0,get:()=>r})}return e}function N(e){if("true"===e)return!0
if("false"===e)return!1
if(e===Number(e).toString())return Number(e)
if(""===e||"null"===e)return null
if("string"!=typeof e)return e
try{return JSON.parse(decodeURIComponent(e))}catch{return e}}function I(e){return e.replace(/[A-Z]/g,(e=>`-${e.toLowerCase()}`))}const $={setDataAttribute(e,t,n){e.setAttribute(`data-bs-${I(t)}`,n)},removeDataAttribute(e,t){e.removeAttribute(`data-bs-${I(t)}`)},getDataAttributes(e){if(!e)return{}
const t={},n=Object.keys(e.dataset).filter((e=>e.startsWith("bs")&&!e.startsWith("bsConfig")))
for(const r of n){let n=r.replace(/^bs/,"")
n=n.charAt(0).toLowerCase()+n.slice(1,n.length),t[n]=N(e.dataset[r])}return t},getDataAttribute:(e,t)=>N(e.getAttribute(`data-bs-${I(t)}`))}
class P{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(e){return e=this._mergeConfigObj(e),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}_configAfterMerge(e){return e}_mergeConfigObj(e,t){const n=o(t)?$.getDataAttribute(t,"config"):{}
return{...this.constructor.Default,..."object"==typeof n?n:{},...o(t)?$.getDataAttributes(t):{},..."object"==typeof e?e:{}}}_typeCheckConfig(e,t=this.constructor.DefaultType){for(const[r,i]of Object.entries(t)){const t=e[r],s=o(t)?"element":null==(n=t)?`${n}`:Object.prototype.toString.call(n).match(/\s([a-z]+)/i)[1].toLowerCase()
if(!new RegExp(i).test(s))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${r}" provided type "${s}" but expected type "${i}".`)}var n}}class M extends P{constructor(e,n){super(),(e=i(e))&&(this._element=e,this._config=this._getConfig(n),t.set(this._element,this.constructor.DATA_KEY,this))}dispose(){t.remove(this._element,this.constructor.DATA_KEY),k.off(this._element,this.constructor.EVENT_KEY)
for(const e of Object.getOwnPropertyNames(this))this[e]=null}_queueCallback(e,t,n=!0){m(e,t,n)}_getConfig(e){return e=this._mergeConfigObj(e,this._element),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}static getInstance(e){return t.get(i(e),this.DATA_KEY)}static getOrCreateInstance(e,t={}){return this.getInstance(e)||new this(e,"object"==typeof t?t:null)}static get VERSION(){return"5.3.3"}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(e){return`${e}${this.EVENT_KEY}`}}const B=e=>{let t=e.getAttribute("data-bs-target")
if(!t||"#"===t){let n=e.getAttribute("href")
if(!n||!n.includes("#")&&!n.startsWith("."))return null
n.includes("#")&&!n.startsWith("#")&&(n=`#${n.split("#")[1]}`),t=n&&"#"!==n?n.trim():null}return t?t.split(",").map((e=>r(e))).join(","):null},q={find:(e,t=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(t,e)),findOne:(e,t=document.documentElement)=>Element.prototype.querySelector.call(t,e),children:(e,t)=>[].concat(...e.children).filter((e=>e.matches(t))),parents(e,t){const n=[]
let r=e.parentNode.closest(t)
for(;r;)n.push(r),r=r.parentNode.closest(t)
return n},prev(e,t){let n=e.previousElementSibling
for(;n;){if(n.matches(t))return[n]
n=n.previousElementSibling}return[]},next(e,t){let n=e.nextElementSibling
for(;n;){if(n.matches(t))return[n]
n=n.nextElementSibling}return[]},focusableChildren(e){const t=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map((e=>`${e}:not([tabindex^="-"])`)).join(",")
return this.find(t,e).filter((e=>!a(e)&&s(e)))},getSelectorFromElement(e){const t=B(e)
return t&&q.findOne(t)?t:null},getElementFromSelector(e){const t=B(e)
return t?q.findOne(t):null},getMultipleElementsFromSelector(e){const t=B(e)
return t?q.find(t):[]}},W=".bs.tab",R=`hide${W}`,H=`hidden${W}`,V=`show${W}`,F=`shown${W}`,K=`click${W}`,Y=`keydown${W}`,U=`load${W}`,z="ArrowLeft",Q="ArrowRight",J="ArrowUp",X="ArrowDown",G="Home",Z="End",ee="active",te="fade",ne="show",re=".dropdown-toggle",oe=`:not(${re})`,ie='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',se=`.nav-link${oe}, .list-group-item${oe}, [role="tab"]${oe}, ${ie}`,ae=`.${ee}[data-bs-toggle="tab"], .${ee}[data-bs-toggle="pill"], .${ee}[data-bs-toggle="list"]`
class ce extends M{constructor(e){super(e),this._parent=this._element.closest('.list-group, .nav, [role="tablist"]'),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),k.on(this._element,Y,(e=>this._keydown(e))))}static get NAME(){return"tab"}show(){const e=this._element
if(this._elemIsActive(e))return
const t=this._getActiveElem(),n=t?k.trigger(t,R,{relatedTarget:e}):null
k.trigger(e,V,{relatedTarget:t}).defaultPrevented||n&&n.defaultPrevented||(this._deactivate(t,e),this._activate(e,t))}_activate(e,t){e&&(e.classList.add(ee),this._activate(q.getElementFromSelector(e)),this._queueCallback((()=>{"tab"===e.getAttribute("role")?(e.removeAttribute("tabindex"),e.setAttribute("aria-selected",!0),this._toggleDropDown(e,!0),k.trigger(e,F,{relatedTarget:t})):e.classList.add(ne)}),e,e.classList.contains(te)))}_deactivate(e,t){e&&(e.classList.remove(ee),e.blur(),this._deactivate(q.getElementFromSelector(e)),this._queueCallback((()=>{"tab"===e.getAttribute("role")?(e.setAttribute("aria-selected",!1),e.setAttribute("tabindex","-1"),this._toggleDropDown(e,!1),k.trigger(e,H,{relatedTarget:t})):e.classList.remove(ne)}),e,e.classList.contains(te)))}_keydown(e){if(![z,Q,J,X,G,Z].includes(e.key))return
e.stopPropagation(),e.preventDefault()
const t=this._getChildren().filter((e=>!a(e)))
let n
if([G,Z].includes(e.key))n=t[e.key===G?0:t.length-1]
else{const r=[Q,X].includes(e.key)
n=h(t,e.target,r,!0)}n&&(n.focus({preventScroll:!0}),ce.getOrCreateInstance(n).show())}_getChildren(){return q.find(se,this._parent)}_getActiveElem(){return this._getChildren().find((e=>this._elemIsActive(e)))||null}_setInitialAttributes(e,t){this._setAttributeIfNotExists(e,"role","tablist")
for(const e of t)this._setInitialAttributesOnChild(e)}_setInitialAttributesOnChild(e){e=this._getInnerElement(e)
const t=this._elemIsActive(e),n=this._getOuterElement(e)
e.setAttribute("aria-selected",t),n!==e&&this._setAttributeIfNotExists(n,"role","presentation"),t||e.setAttribute("tabindex","-1"),this._setAttributeIfNotExists(e,"role","tab"),this._setInitialAttributesOnTargetPanel(e)}_setInitialAttributesOnTargetPanel(e){const t=q.getElementFromSelector(e)
t&&(this._setAttributeIfNotExists(t,"role","tabpanel"),e.id&&this._setAttributeIfNotExists(t,"aria-labelledby",`${e.id}`))}_toggleDropDown(e,t){const n=this._getOuterElement(e)
if(!n.classList.contains("dropdown"))return
const r=(e,r)=>{const o=q.findOne(e,n)
o&&o.classList.toggle(r,t)}
r(re,ee),r(".dropdown-menu",ne),n.setAttribute("aria-expanded",t)}_setAttributeIfNotExists(e,t,n){e.hasAttribute(t)||e.setAttribute(t,n)}_elemIsActive(e){return e.classList.contains(ee)}_getInnerElement(e){return e.matches(se)?e:q.findOne(se,e)}_getOuterElement(e){return e.closest(".nav-item, .list-group-item")||e}static jQueryInterface(e){return this.each((function(){const t=ce.getOrCreateInstance(this)
if("string"==typeof e){if(void 0===t[e]||e.startsWith("_")||"constructor"===e)throw new TypeError(`No method named "${e}"`)
t[e]()}}))}}k.on(document,K,ie,(function(e){["A","AREA"].includes(this.tagName)&&e.preventDefault(),a(this)||ce.getOrCreateInstance(this).show()})),k.on(window,U,(()=>{for(const e of q.find(ae))ce.getOrCreateInstance(e)})),d(ce)
var le="top",ue="bottom",fe="right",de="left",pe="auto",me=[le,ue,fe,de],he="start",ge="end",be="clippingParents",ve="viewport",ye="popper",we="reference",_e=me.reduce((function(e,t){return e.concat([t+"-"+he,t+"-"+ge])}),[]),xe=[].concat(me,[pe]).reduce((function(e,t){return e.concat([t,t+"-"+he,t+"-"+ge])}),[]),Oe="beforeRead",Ee="read",Ae="afterRead",je="beforeMain",Ce="main",Se="afterMain",De="beforeWrite",Le="write",ke="afterWrite",Te=[Oe,Ee,Ae,je,Ce,Se,De,Le,ke]
function Ne(e){return e?(e.nodeName||"").toLowerCase():null}function Ie(e){if(null==e)return window
if("[object Window]"!==e.toString()){var t=e.ownerDocument
return t&&t.defaultView||window}return e}function $e(e){return e instanceof Ie(e).Element||e instanceof Element}function Pe(e){return e instanceof Ie(e).HTMLElement||e instanceof HTMLElement}function Me(e){return"undefined"!=typeof ShadowRoot&&(e instanceof Ie(e).ShadowRoot||e instanceof ShadowRoot)}var Be={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state
Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},r=t.attributes[e]||{},o=t.elements[e]
Pe(o)&&Ne(o)&&(Object.assign(o.style,n),Object.keys(r).forEach((function(e){var t=r[e]
!1===t?o.removeAttribute(e):o.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}}
return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var r=t.elements[e],o=t.attributes[e]||{},i=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{})
Pe(r)&&Ne(r)&&(Object.assign(r.style,i),Object.keys(o).forEach((function(e){r.removeAttribute(e)})))}))}},requires:["computeStyles"]}
function qe(e){return e.split("-")[0]}var We=Math.max,Re=Math.min,He=Math.round
function Ve(){var e=navigator.userAgentData
return null!=e&&e.brands&&Array.isArray(e.brands)?e.brands.map((function(e){return e.brand+"/"+e.version})).join(" "):navigator.userAgent}function Fe(){return!/^((?!chrome|android).)*safari/i.test(Ve())}function Ke(e,t,n){void 0===t&&(t=!1),void 0===n&&(n=!1)
var r=e.getBoundingClientRect(),o=1,i=1
t&&Pe(e)&&(o=e.offsetWidth>0&&He(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&He(r.height)/e.offsetHeight||1)
var s=($e(e)?Ie(e):window).visualViewport,a=!Fe()&&n,c=(r.left+(a&&s?s.offsetLeft:0))/o,l=(r.top+(a&&s?s.offsetTop:0))/i,u=r.width/o,f=r.height/i
return{width:u,height:f,top:l,right:c+u,bottom:l+f,left:c,x:c,y:l}}function Ye(e){var t=Ke(e),n=e.offsetWidth,r=e.offsetHeight
return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Ue(e,t){var n=t.getRootNode&&t.getRootNode()
if(e.contains(t))return!0
if(n&&Me(n)){var r=t
do{if(r&&e.isSameNode(r))return!0
r=r.parentNode||r.host}while(r)}return!1}function ze(e){return Ie(e).getComputedStyle(e)}function Qe(e){return["table","td","th"].indexOf(Ne(e))>=0}function Je(e){return(($e(e)?e.ownerDocument:e.document)||window.document).documentElement}function Xe(e){return"html"===Ne(e)?e:e.assignedSlot||e.parentNode||(Me(e)?e.host:null)||Je(e)}function Ge(e){return Pe(e)&&"fixed"!==ze(e).position?e.offsetParent:null}function Ze(e){for(var t=Ie(e),n=Ge(e);n&&Qe(n)&&"static"===ze(n).position;)n=Ge(n)
return n&&("html"===Ne(n)||"body"===Ne(n)&&"static"===ze(n).position)?t:n||function(e){var t=/firefox/i.test(Ve())
if(/Trident/i.test(Ve())&&Pe(e)&&"fixed"===ze(e).position)return null
var n=Xe(e)
for(Me(n)&&(n=n.host);Pe(n)&&["html","body"].indexOf(Ne(n))<0;){var r=ze(n)
if("none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||-1!==["transform","perspective"].indexOf(r.willChange)||t&&"filter"===r.willChange||t&&r.filter&&"none"!==r.filter)return n
n=n.parentNode}return null}(e)||t}function et(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function tt(e,t,n){return We(e,Re(t,n))}function nt(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function rt(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}var ot={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,s=n.modifiersData.popperOffsets,a=qe(n.placement),c=et(a),l=[de,fe].indexOf(a)>=0?"height":"width"
if(i&&s){var u=function(e,t){return nt("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:rt(e,me))}(o.padding,n),f=Ye(i),d="y"===c?le:de,p="y"===c?ue:fe,m=n.rects.reference[l]+n.rects.reference[c]-s[c]-n.rects.popper[l],h=s[c]-n.rects.reference[c],g=Ze(i),b=g?"y"===c?g.clientHeight||0:g.clientWidth||0:0,v=m/2-h/2,y=u[d],w=b-f[l]-u[p],_=b/2-f[l]/2+v,x=tt(y,_,w),O=c
n.modifiersData[r]=((t={})[O]=x,t.centerOffset=x-_,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n
null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&Ue(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]}
function it(e){return e.split("-")[1]}var st={top:"auto",right:"auto",bottom:"auto",left:"auto"}
function at(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,s=e.offsets,a=e.position,c=e.gpuAcceleration,l=e.adaptive,u=e.roundOffsets,f=e.isFixed,d=s.x,p=void 0===d?0:d,m=s.y,h=void 0===m?0:m,g="function"==typeof u?u({x:p,y:h}):{x:p,y:h}
p=g.x,h=g.y
var b=s.hasOwnProperty("x"),v=s.hasOwnProperty("y"),y=de,w=le,_=window
if(l){var x=Ze(n),O="clientHeight",E="clientWidth"
x===Ie(n)&&"static"!==ze(x=Je(n)).position&&"absolute"===a&&(O="scrollHeight",E="scrollWidth"),(o===le||(o===de||o===fe)&&i===ge)&&(w=ue,h-=(f&&x===_&&_.visualViewport?_.visualViewport.height:x[O])-r.height,h*=c?1:-1),o!==de&&(o!==le&&o!==ue||i!==ge)||(y=fe,p-=(f&&x===_&&_.visualViewport?_.visualViewport.width:x[E])-r.width,p*=c?1:-1)}var A,j=Object.assign({position:a},l&&st),C=!0===u?function(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1
return{x:He(n*o)/o||0,y:He(r*o)/o||0}}({x:p,y:h},Ie(n)):{x:p,y:h}
return p=C.x,h=C.y,c?Object.assign({},j,((A={})[w]=v?"0":"",A[y]=b?"0":"",A.transform=(_.devicePixelRatio||1)<=1?"translate("+p+"px, "+h+"px)":"translate3d("+p+"px, "+h+"px, 0)",A)):Object.assign({},j,((t={})[w]=v?h+"px":"",t[y]=b?p+"px":"",t.transform="",t))}var ct={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,s=void 0===i||i,a=n.roundOffsets,c=void 0===a||a,l={placement:qe(t.placement),variation:it(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:"fixed"===t.options.strategy}
null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,at(Object.assign({},l,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:c})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,at(Object.assign({},l,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},lt={passive:!0},ut={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=void 0===o||o,s=r.resize,a=void 0===s||s,c=Ie(t.elements.popper),l=[].concat(t.scrollParents.reference,t.scrollParents.popper)
return i&&l.forEach((function(e){e.addEventListener("scroll",n.update,lt)})),a&&c.addEventListener("resize",n.update,lt),function(){i&&l.forEach((function(e){e.removeEventListener("scroll",n.update,lt)})),a&&c.removeEventListener("resize",n.update,lt)}},data:{}},ft={left:"right",right:"left",bottom:"top",top:"bottom"}
function dt(e){return e.replace(/left|right|bottom|top/g,(function(e){return ft[e]}))}var pt={start:"end",end:"start"}
function mt(e){return e.replace(/start|end/g,(function(e){return pt[e]}))}function ht(e){var t=Ie(e)
return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function gt(e){return Ke(Je(e)).left+ht(e).scrollLeft}function bt(e){var t=ze(e),n=t.overflow,r=t.overflowX,o=t.overflowY
return/auto|scroll|overlay|hidden/.test(n+o+r)}function vt(e){return["html","body","#document"].indexOf(Ne(e))>=0?e.ownerDocument.body:Pe(e)&&bt(e)?e:vt(Xe(e))}function yt(e,t){var n
void 0===t&&(t=[])
var r=vt(e),o=r===(null==(n=e.ownerDocument)?void 0:n.body),i=Ie(r),s=o?[i].concat(i.visualViewport||[],bt(r)?r:[]):r,a=t.concat(s)
return o?a:a.concat(yt(Xe(s)))}function wt(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function _t(e,t,n){return t===ve?wt(function(e,t){var n=Ie(e),r=Je(e),o=n.visualViewport,i=r.clientWidth,s=r.clientHeight,a=0,c=0
if(o){i=o.width,s=o.height
var l=Fe();(l||!l&&"fixed"===t)&&(a=o.offsetLeft,c=o.offsetTop)}return{width:i,height:s,x:a+gt(e),y:c}}(e,n)):$e(t)?function(e,t){var n=Ke(e,!1,"fixed"===t)
return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}(t,n):wt(function(e){var t,n=Je(e),r=ht(e),o=null==(t=e.ownerDocument)?void 0:t.body,i=We(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=We(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),a=-r.scrollLeft+gt(e),c=-r.scrollTop
return"rtl"===ze(o||n).direction&&(a+=We(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:s,x:a,y:c}}(Je(e)))}function xt(e,t,n,r){var o="clippingParents"===t?function(e){var t=yt(Xe(e)),n=["absolute","fixed"].indexOf(ze(e).position)>=0&&Pe(e)?Ze(e):e
return $e(n)?t.filter((function(e){return $e(e)&&Ue(e,n)&&"body"!==Ne(e)})):[]}(e):[].concat(t),i=[].concat(o,[n]),s=i[0],a=i.reduce((function(t,n){var o=_t(e,n,r)
return t.top=We(o.top,t.top),t.right=Re(o.right,t.right),t.bottom=Re(o.bottom,t.bottom),t.left=We(o.left,t.left),t}),_t(e,s,r))
return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function Ot(e){var t,n=e.reference,r=e.element,o=e.placement,i=o?qe(o):null,s=o?it(o):null,a=n.x+n.width/2-r.width/2,c=n.y+n.height/2-r.height/2
switch(i){case le:t={x:a,y:n.y-r.height}
break
case ue:t={x:a,y:n.y+n.height}
break
case fe:t={x:n.x+n.width,y:c}
break
case de:t={x:n.x-r.width,y:c}
break
default:t={x:n.x,y:n.y}}var l=i?et(i):null
if(null!=l){var u="y"===l?"height":"width"
switch(s){case he:t[l]=t[l]-(n[u]/2-r[u]/2)
break
case ge:t[l]=t[l]+(n[u]/2-r[u]/2)}}return t}function Et(e,t){void 0===t&&(t={})
var n=t,r=n.placement,o=void 0===r?e.placement:r,i=n.strategy,s=void 0===i?e.strategy:i,a=n.boundary,c=void 0===a?be:a,l=n.rootBoundary,u=void 0===l?ve:l,f=n.elementContext,d=void 0===f?ye:f,p=n.altBoundary,m=void 0!==p&&p,h=n.padding,g=void 0===h?0:h,b=nt("number"!=typeof g?g:rt(g,me)),v=d===ye?we:ye,y=e.rects.popper,w=e.elements[m?v:d],_=xt($e(w)?w:w.contextElement||Je(e.elements.popper),c,u,s),x=Ke(e.elements.reference),O=Ot({reference:x,element:y,strategy:"absolute",placement:o}),E=wt(Object.assign({},y,O)),A=d===ye?E:x,j={top:_.top-A.top+b.top,bottom:A.bottom-_.bottom+b.bottom,left:_.left-A.left+b.left,right:A.right-_.right+b.right},C=e.modifiersData.offset
if(d===ye&&C){var S=C[o]
Object.keys(j).forEach((function(e){var t=[fe,ue].indexOf(e)>=0?1:-1,n=[le,ue].indexOf(e)>=0?"y":"x"
j[e]+=S[n]*t}))}return j}function At(e,t){void 0===t&&(t={})
var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,s=n.padding,a=n.flipVariations,c=n.allowedAutoPlacements,l=void 0===c?xe:c,u=it(r),f=u?a?_e:_e.filter((function(e){return it(e)===u})):me,d=f.filter((function(e){return l.indexOf(e)>=0}))
0===d.length&&(d=f)
var p=d.reduce((function(t,n){return t[n]=Et(e,{placement:n,boundary:o,rootBoundary:i,padding:s})[qe(n)],t}),{})
return Object.keys(p).sort((function(e,t){return p[e]-p[t]}))}var jt={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name
if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=void 0===o||o,s=n.altAxis,a=void 0===s||s,c=n.fallbackPlacements,l=n.padding,u=n.boundary,f=n.rootBoundary,d=n.altBoundary,p=n.flipVariations,m=void 0===p||p,h=n.allowedAutoPlacements,g=t.options.placement,b=qe(g),v=c||(b!==g&&m?function(e){if(qe(e)===pe)return[]
var t=dt(e)
return[mt(e),t,mt(t)]}(g):[dt(g)]),y=[g].concat(v).reduce((function(e,n){return e.concat(qe(n)===pe?At(t,{placement:n,boundary:u,rootBoundary:f,padding:l,flipVariations:m,allowedAutoPlacements:h}):n)}),[]),w=t.rects.reference,_=t.rects.popper,x=new Map,O=!0,E=y[0],A=0;A<y.length;A++){var j=y[A],C=qe(j),S=it(j)===he,D=[le,ue].indexOf(C)>=0,L=D?"width":"height",k=Et(t,{placement:j,boundary:u,rootBoundary:f,altBoundary:d,padding:l}),T=D?S?fe:de:S?ue:le
w[L]>_[L]&&(T=dt(T))
var N=dt(T),I=[]
if(i&&I.push(k[C]<=0),a&&I.push(k[T]<=0,k[N]<=0),I.every((function(e){return e}))){E=j,O=!1
break}x.set(j,I)}if(O)for(var $=function(e){var t=y.find((function(t){var n=x.get(t)
if(n)return n.slice(0,e).every((function(e){return e}))}))
if(t)return E=t,"break"},P=m?3:1;P>0&&"break"!==$(P);P--);t.placement!==E&&(t.modifiersData[r]._skip=!0,t.placement=E,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}}
function Ct(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function St(e){return[le,fe,ue,de].some((function(t){return e[t]>=0}))}var Dt={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,s=Et(t,{elementContext:"reference"}),a=Et(t,{altBoundary:!0}),c=Ct(s,r),l=Ct(a,o,i),u=St(c),f=St(l)
t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:l,isReferenceHidden:u,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":f})}},Lt={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=void 0===o?[0,0]:o,s=xe.reduce((function(e,n){return e[n]=function(e,t,n){var r=qe(e),o=[de,le].indexOf(r)>=0?-1:1,i="function"==typeof n?n(Object.assign({},t,{placement:e})):n,s=i[0],a=i[1]
return s=s||0,a=(a||0)*o,[de,fe].indexOf(r)>=0?{x:a,y:s}:{x:s,y:a}}(n,t.rects,i),e}),{}),a=s[t.placement],c=a.x,l=a.y
null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=l),t.modifiersData[r]=s}},kt={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name
t.modifiersData[n]=Ot({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},Tt={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=void 0===o||o,s=n.altAxis,a=void 0!==s&&s,c=n.boundary,l=n.rootBoundary,u=n.altBoundary,f=n.padding,d=n.tether,p=void 0===d||d,m=n.tetherOffset,h=void 0===m?0:m,g=Et(t,{boundary:c,rootBoundary:l,padding:f,altBoundary:u}),b=qe(t.placement),v=it(t.placement),y=!v,w=et(b),_="x"===w?"y":"x",x=t.modifiersData.popperOffsets,O=t.rects.reference,E=t.rects.popper,A="function"==typeof h?h(Object.assign({},t.rects,{placement:t.placement})):h,j="number"==typeof A?{mainAxis:A,altAxis:A}:Object.assign({mainAxis:0,altAxis:0},A),C=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,S={x:0,y:0}
if(x){if(i){var D,L="y"===w?le:de,k="y"===w?ue:fe,T="y"===w?"height":"width",N=x[w],I=N+g[L],$=N-g[k],P=p?-E[T]/2:0,M=v===he?O[T]:E[T],B=v===he?-E[T]:-O[T],q=t.elements.arrow,W=p&&q?Ye(q):{width:0,height:0},R=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},H=R[L],V=R[k],F=tt(0,O[T],W[T]),K=y?O[T]/2-P-F-H-j.mainAxis:M-F-H-j.mainAxis,Y=y?-O[T]/2+P+F+V+j.mainAxis:B+F+V+j.mainAxis,U=t.elements.arrow&&Ze(t.elements.arrow),z=U?"y"===w?U.clientTop||0:U.clientLeft||0:0,Q=null!=(D=null==C?void 0:C[w])?D:0,J=N+Y-Q,X=tt(p?Re(I,N+K-Q-z):I,N,p?We($,J):$)
x[w]=X,S[w]=X-N}if(a){var G,Z="x"===w?le:de,ee="x"===w?ue:fe,te=x[_],ne="y"===_?"height":"width",re=te+g[Z],oe=te-g[ee],ie=-1!==[le,de].indexOf(b),se=null!=(G=null==C?void 0:C[_])?G:0,ae=ie?re:te-O[ne]-E[ne]-se+j.altAxis,ce=ie?te+O[ne]+E[ne]-se-j.altAxis:oe,pe=p&&ie?function(e,t,n){var r=tt(e,t,n)
return r>n?n:r}(ae,te,ce):tt(p?ae:re,te,p?ce:oe)
x[_]=pe,S[_]=pe-te}t.modifiersData[r]=S}},requiresIfExists:["offset"]}
function Nt(e,t,n){void 0===n&&(n=!1)
var r,o,i=Pe(t),s=Pe(t)&&function(e){var t=e.getBoundingClientRect(),n=He(t.width)/e.offsetWidth||1,r=He(t.height)/e.offsetHeight||1
return 1!==n||1!==r}(t),a=Je(t),c=Ke(e,s,n),l={scrollLeft:0,scrollTop:0},u={x:0,y:0}
return(i||!i&&!n)&&(("body"!==Ne(t)||bt(a))&&(l=(r=t)!==Ie(r)&&Pe(r)?{scrollLeft:(o=r).scrollLeft,scrollTop:o.scrollTop}:ht(r)),Pe(t)?((u=Ke(t,!0)).x+=t.clientLeft,u.y+=t.clientTop):a&&(u.x=gt(a))),{x:c.left+l.scrollLeft-u.x,y:c.top+l.scrollTop-u.y,width:c.width,height:c.height}}function It(e){var t=new Map,n=new Set,r=[]
function o(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e)
r&&o(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||o(e)})),r}var $t={placement:"bottom",modifiers:[],strategy:"absolute"}
function Pt(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n]
return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function Mt(e){void 0===e&&(e={})
var t=e,n=t.defaultModifiers,r=void 0===n?[]:n,o=t.defaultOptions,i=void 0===o?$t:o
return function(e,t,n){void 0===n&&(n=i)
var o,s,a={placement:"bottom",orderedModifiers:[],options:Object.assign({},$t,i),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},c=[],l=!1,u={state:a,setOptions:function(n){var o="function"==typeof n?n(a.options):n
f(),a.options=Object.assign({},i,a.options,o),a.scrollParents={reference:$e(e)?yt(e):e.contextElement?yt(e.contextElement):[],popper:yt(t)}
var s,l,d=function(e){var t=It(e)
return Te.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}((s=[].concat(r,a.options.modifiers),l=s.reduce((function(e,t){var n=e[t.name]
return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{}),Object.keys(l).map((function(e){return l[e]}))))
return a.orderedModifiers=d.filter((function(e){return e.enabled})),a.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,o=e.effect
if("function"==typeof o){var i=o({state:a,name:t,instance:u,options:r}),s=function(){}
c.push(i||s)}})),u.update()},forceUpdate:function(){if(!l){var e=a.elements,t=e.reference,n=e.popper
if(Pt(t,n)){a.rects={reference:Nt(t,Ze(n),"fixed"===a.options.strategy),popper:Ye(n)},a.reset=!1,a.placement=a.options.placement,a.orderedModifiers.forEach((function(e){return a.modifiersData[e.name]=Object.assign({},e.data)}))
for(var r=0;r<a.orderedModifiers.length;r++)if(!0!==a.reset){var o=a.orderedModifiers[r],i=o.fn,s=o.options,c=void 0===s?{}:s,f=o.name
"function"==typeof i&&(a=i({state:a,options:c,name:f,instance:u})||a)}else a.reset=!1,r=-1}}},update:(o=function(){return new Promise((function(e){u.forceUpdate(),e(a)}))},function(){return s||(s=new Promise((function(e){Promise.resolve().then((function(){s=void 0,e(o())}))}))),s}),destroy:function(){f(),l=!0}}
if(!Pt(e,t))return u
function f(){c.forEach((function(e){return e()})),c=[]}return u.setOptions(n).then((function(e){!l&&n.onFirstUpdate&&n.onFirstUpdate(e)})),u}}var Bt=Mt(),qt=Mt({defaultModifiers:[ut,kt,ct,Be]}),Wt=Mt({defaultModifiers:[ut,kt,ct,Be,Lt,jt,Tt,ot,Dt]}),Rt=Object.freeze({__proto__:null,afterMain:Se,afterRead:Ae,afterWrite:ke,applyStyles:Be,arrow:ot,auto:pe,basePlacements:me,beforeMain:je,beforeRead:Oe,beforeWrite:De,bottom:ue,clippingParents:be,computeStyles:ct,createPopper:Wt,createPopperBase:Bt,createPopperLite:qt,detectOverflow:Et,end:ge,eventListeners:ut,flip:jt,hide:Dt,left:de,main:Ce,modifierPhases:Te,offset:Lt,placements:xe,popper:ye,popperGenerator:Mt,popperOffsets:kt,preventOverflow:Tt,read:Ee,reference:we,right:fe,start:he,top:le,variationPlacements:_e,viewport:ve,write:Le})
const Ht="dropdown",Vt=".bs.dropdown",Ft=".data-api",Kt="ArrowUp",Yt="ArrowDown",Ut=`hide${Vt}`,zt=`hidden${Vt}`,Qt=`show${Vt}`,Jt=`shown${Vt}`,Xt=`click${Vt}${Ft}`,Gt=`keydown${Vt}${Ft}`,Zt=`keyup${Vt}${Ft}`,en="show",tn='[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',nn=`${tn}.${en}`,rn=".dropdown-menu",on=f()?"top-end":"top-start",sn=f()?"top-start":"top-end",an=f()?"bottom-end":"bottom-start",cn=f()?"bottom-start":"bottom-end",ln=f()?"left-start":"right-start",un=f()?"right-start":"left-start",fn={autoClose:!0,boundary:"clippingParents",display:"dynamic",offset:[0,2],popperConfig:null,reference:"toggle"},dn={autoClose:"(boolean|string)",boundary:"(string|element)",display:"string",offset:"(array|string|function)",popperConfig:"(null|object|function)",reference:"(string|element|object)"}
class pn extends M{constructor(e,t){super(e,t),this._popper=null,this._parent=this._element.parentNode,this._menu=q.next(this._element,rn)[0]||q.prev(this._element,rn)[0]||q.findOne(rn,this._parent),this._inNavbar=this._detectNavbar()}static get Default(){return fn}static get DefaultType(){return dn}static get NAME(){return Ht}toggle(){return this._isShown()?this.hide():this.show()}show(){if(a(this._element)||this._isShown())return
const e={relatedTarget:this._element}
if(!k.trigger(this._element,Qt,e).defaultPrevented){if(this._createPopper(),"ontouchstart"in document.documentElement&&!this._parent.closest(".navbar-nav"))for(const e of[].concat(...document.body.children))k.on(e,"mouseover",c)
this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add(en),this._element.classList.add(en),k.trigger(this._element,Jt,e)}}hide(){if(a(this._element)||!this._isShown())return
const e={relatedTarget:this._element}
this._completeHide(e)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(e){if(!k.trigger(this._element,Ut,e).defaultPrevented){if("ontouchstart"in document.documentElement)for(const e of[].concat(...document.body.children))k.off(e,"mouseover",c)
this._popper&&this._popper.destroy(),this._menu.classList.remove(en),this._element.classList.remove(en),this._element.setAttribute("aria-expanded","false"),$.removeDataAttribute(this._menu,"popper"),k.trigger(this._element,zt,e)}}_getConfig(e){if("object"==typeof(e=super._getConfig(e)).reference&&!o(e.reference)&&"function"!=typeof e.reference.getBoundingClientRect)throw new TypeError(`${Ht.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`)
return e}_createPopper(){if(void 0===Rt)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)")
let e=this._element
"parent"===this._config.reference?e=this._parent:o(this._config.reference)?e=i(this._config.reference):"object"==typeof this._config.reference&&(e=this._config.reference)
const t=this._getPopperConfig()
this._popper=Wt(e,this._menu,t)}_isShown(){return this._menu.classList.contains(en)}_getPlacement(){const e=this._parent
if(e.classList.contains("dropend"))return ln
if(e.classList.contains("dropstart"))return un
if(e.classList.contains("dropup-center"))return"top"
if(e.classList.contains("dropdown-center"))return"bottom"
const t="end"===getComputedStyle(this._menu).getPropertyValue("--bs-position").trim()
return e.classList.contains("dropup")?t?sn:on:t?cn:an}_detectNavbar(){return null!==this._element.closest(".navbar")}_getOffset(){const{offset:e}=this._config
return"string"==typeof e?e.split(",").map((e=>Number.parseInt(e,10))):"function"==typeof e?t=>e(t,this._element):e}_getPopperConfig(){const e={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]}
return(this._inNavbar||"static"===this._config.display)&&($.setDataAttribute(this._menu,"popper","static"),e.modifiers=[{name:"applyStyles",enabled:!1}]),{...e,...p(this._config.popperConfig,[e])}}_selectMenuItem({key:e,target:t}){const n=q.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",this._menu).filter((e=>s(e)))
n.length&&h(n,t,e===Yt,!n.includes(t)).focus()}static jQueryInterface(e){return this.each((function(){const t=pn.getOrCreateInstance(this,e)
if("string"==typeof e){if(void 0===t[e])throw new TypeError(`No method named "${e}"`)
t[e]()}}))}static clearMenus(e){if(2===e.button||"keyup"===e.type&&"Tab"!==e.key)return
const t=q.find(nn)
for(const n of t){const t=pn.getInstance(n)
if(!t||!1===t._config.autoClose)continue
const r=e.composedPath(),o=r.includes(t._menu)
if(r.includes(t._element)||"inside"===t._config.autoClose&&!o||"outside"===t._config.autoClose&&o)continue
if(t._menu.contains(e.target)&&("keyup"===e.type&&"Tab"===e.key||/input|select|option|textarea|form/i.test(e.target.tagName)))continue
const i={relatedTarget:t._element}
"click"===e.type&&(i.clickEvent=e),t._completeHide(i)}}static dataApiKeydownHandler(e){const t=/input|textarea/i.test(e.target.tagName),n="Escape"===e.key,r=[Kt,Yt].includes(e.key)
if(!r&&!n)return
if(t&&!n)return
e.preventDefault()
const o=this.matches(tn)?this:q.prev(this,tn)[0]||q.next(this,tn)[0]||q.findOne(tn,e.delegateTarget.parentNode),i=pn.getOrCreateInstance(o)
if(r)return e.stopPropagation(),i.show(),void i._selectMenuItem(e)
i._isShown()&&(e.stopPropagation(),i.hide(),o.focus())}}k.on(document,Gt,tn,pn.dataApiKeydownHandler),k.on(document,Gt,rn,pn.dataApiKeydownHandler),k.on(document,Xt,pn.clearMenus),k.on(document,Zt,pn.clearMenus),k.on(document,Xt,tn,(function(e){e.preventDefault(),pn.getOrCreateInstance(this).toggle()})),d(pn),document.addEventListener("DOMContentLoaded",(function(){if(document.getElementById("prism-css").media="all",document.getElementById("toggle-offcanvas").addEventListener("click",(function(){document.body.classList.toggle("offcanvas-open")})),0!=document.querySelectorAll(".demo").length&&!document.getElementById("select-theme")){var e=window.themes||["bootstrap5","bootstrap4","default"],t={bootstrap5:"Bootstrap 5",bootstrap4:"Bootstrap 4",default:"Default"},n=localStorage.getItem("theme");-1==e.indexOf(n)&&(n="bootstrap5")
var r=document.createElement("input")
r.classList.add("theme-selector-input")
var o=document.getElementById("main-container")
document.querySelectorAll(".demo-mini").length||(o.insertBefore(r,o.firstChild),new TomSelect(r,{maxItems:1,controlInput:"<input>",plugins:["no_backspace_delete"],options:e.map((n=>-1!=e.indexOf(n)&&{text:t[n],value:n})),items:[n],render:{item:(e,t)=>"<div>Theme: "+t(e.text)+"</div>"},onChange:e=>{i(e)}})),i(n),document.addEventListener("click",(e=>{var t=e.target.closest(".opensandbox")
if(t){var n,r=t.closest(".demo")
function l(e){var t=r.querySelector(e)
return t&&t.textContent||""}var o=`<div class="p-4">${r.querySelector("textarea").value||""}</div>`,i=l("style"),s=l("script"),a=[`https://cdn.jsdelivr.net/npm/tom-select@2.3.1/dist/css/tom-select.${localStorage.getItem("theme")||"bootstrap4"}.min.css`,"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"]
"bootstrap4"==localStorage.getItem("theme")?a.push("https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/css/bootstrap.min.css"):a.push("https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css")
var c=["https://cdn.jsdelivr.net/npm/tom-select@2.3.1/dist/js/tom-select.complete.min.js"]
n={html:o,js:s,css:i,js_external:c.join(";"),css_external:a.join(";")},r.querySelector(".codepen").value=JSON.stringify(n),r.querySelector(".jsfiddle-html").value=o,r.querySelector(".jsfiddle-js").value=s,r.querySelector(".jsfiddle-css").value=i,r.querySelector(".jsfiddle-resources").value=c.join(",")+","+a.join(","),setTimeout((()=>{t.nextElementSibling.submit()}),50)}}))}function i(t){if(-1!=e.indexOf(t)){localStorage.setItem("theme",t)
var n=document.getElementById("select-theme")
n&&n.parentNode.removeChild(n),(n=document.createElement("link")).id="select-theme",n.setAttribute("rel","stylesheet"),n.setAttribute("href","/css/tom-select."+t+".css"),document.getElementsByTagName("head")[0].appendChild(n)}}}))},"function"==typeof define&&define.amd?define(e):e()
//# sourceMappingURL=index.bundle.js.map
