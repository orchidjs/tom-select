var e
e=function(){"use strict"
const e={find:(e,t=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(t,e)),findOne:(e,t=document.documentElement)=>Element.prototype.querySelector.call(t,e),children:(e,t)=>[].concat(...e.children).filter((e=>e.matches(t))),parents(e,t){const n=[]
let o=e.parentNode
for(;o&&o.nodeType===Node.ELEMENT_NODE&&3!==o.nodeType;)o.matches(t)&&n.push(o),o=o.parentNode
return n},prev(e,t){let n=e.previousElementSibling
for(;n;){if(n.matches(t))return[n]
n=n.previousElementSibling}return[]},next(e,t){let n=e.nextElementSibling
for(;n;){if(n.matches(t))return[n]
n=n.nextElementSibling}return[]}},t="transitionend",n=e=>{const t=(e=>{let t=e.getAttribute("data-bs-target")
if(!t||"#"===t){let n=e.getAttribute("href")
if(!n||!n.includes("#")&&!n.startsWith("."))return null
n.includes("#")&&!n.startsWith("#")&&(n=`#${n.split("#")[1]}`),t=n&&"#"!==n?n.trim():null}return t})(e)
return t?document.querySelector(t):null},o=e=>!(!e||"object"!=typeof e)&&(void 0!==e.jquery&&(e=e[0]),void 0!==e.nodeType),r=t=>o(t)?t.jquery?t[0]:t:"string"==typeof t&&t.length>0?e.findOne(t):null,i=e=>!(!o(e)||0===e.getClientRects().length)&&"visible"===getComputedStyle(e).getPropertyValue("visibility"),s=e=>!e||e.nodeType!==Node.ELEMENT_NODE||!!e.classList.contains("disabled")||(void 0!==e.disabled?e.disabled:e.hasAttribute("disabled")&&"false"!==e.getAttribute("disabled")),a=()=>{},c=()=>{const{jQuery:e}=window
return e&&!document.body.hasAttribute("data-bs-no-jquery")?e:null},l=[],f=()=>"rtl"===document.documentElement.dir,u=e=>{var t
t=()=>{const t=c()
if(t){const n=e.NAME,o=t.fn[n]
t.fn[n]=e.jQueryInterface,t.fn[n].Constructor=e,t.fn[n].noConflict=()=>(t.fn[n]=o,e.jQueryInterface)}},"loading"===document.readyState?(l.length||document.addEventListener("DOMContentLoaded",(()=>{l.forEach((e=>e()))})),l.push(t)):t()},d=e=>{"function"==typeof e&&e()},p=(e,n,o=!0)=>{if(!o)return void d(e)
const r=(e=>{if(!e)return 0
let{transitionDuration:t,transitionDelay:n}=window.getComputedStyle(e)
const o=Number.parseFloat(t),r=Number.parseFloat(n)
return o||r?(t=t.split(",")[0],n=n.split(",")[0],1e3*(Number.parseFloat(t)+Number.parseFloat(n))):0})(n)+5
let i=!1
const s=({target:o})=>{o===n&&(i=!0,n.removeEventListener(t,s),d(e))}
n.addEventListener(t,s),setTimeout((()=>{i||n.dispatchEvent(new Event(t))}),r)},m=/[^.]*(?=\..*)\.|.*/,h=/\..*/,g=/::\d+$/,v={}
let b=1
const y={mouseenter:"mouseover",mouseleave:"mouseout"},w=/^(mouseenter|mouseleave)/i,E=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"])
function _(e,t){return t&&`${t}::${b++}`||e.uidEvent||b++}function O(e){const t=_(e)
return e.uidEvent=t,v[t]=v[t]||{},v[t]}function x(e,t,n=null){const o=Object.keys(e)
for(let r=0,i=o.length;r<i;r++){const i=e[o[r]]
if(i.originalHandler===t&&i.delegationSelector===n)return i}return null}function j(e,t,n){const o="string"==typeof t,r=o?n:t
let i=D(e)
return E.has(i)||(i=e),[o,r,i]}function L(e,t,n,o,r){if("string"!=typeof t||!e)return
if(n||(n=o,o=null),w.test(t)){const e=e=>function(t){if(!t.relatedTarget||t.relatedTarget!==t.delegateTarget&&!t.delegateTarget.contains(t.relatedTarget))return e.call(this,t)}
o?o=e(o):n=e(n)}const[i,s,a]=j(t,n,o),c=O(e),l=c[a]||(c[a]={}),f=x(l,s,i?n:null)
if(f)return void(f.oneOff=f.oneOff&&r)
const u=_(s,t.replace(m,"")),d=i?function(e,t,n){return function o(r){const i=e.querySelectorAll(t)
for(let{target:s}=r;s&&s!==this;s=s.parentNode)for(let a=i.length;a--;)if(i[a]===s)return r.delegateTarget=s,o.oneOff&&N.off(e,r.type,t,n),n.apply(s,[r])
return null}}(e,n,o):function(e,t){return function n(o){return o.delegateTarget=e,n.oneOff&&N.off(e,o.type,t),t.apply(e,[o])}}(e,n)
d.delegationSelector=i?n:null,d.originalHandler=s,d.oneOff=r,d.uidEvent=u,l[u]=d,e.addEventListener(a,d,i)}function A(e,t,n,o,r){const i=x(t[n],o,r)
i&&(e.removeEventListener(n,i,Boolean(r)),delete t[n][i.uidEvent])}function D(e){return e=e.replace(h,""),y[e]||e}const N={on(e,t,n,o){L(e,t,n,o,!1)},one(e,t,n,o){L(e,t,n,o,!0)},off(e,t,n,o){if("string"!=typeof t||!e)return
const[r,i,s]=j(t,n,o),a=s!==t,c=O(e),l=t.startsWith(".")
if(void 0!==i){if(!c||!c[s])return
return void A(e,c,s,i,r?n:null)}l&&Object.keys(c).forEach((n=>{!function(e,t,n,o){const r=t[n]||{}
Object.keys(r).forEach((i=>{if(i.includes(o)){const o=r[i]
A(e,t,n,o.originalHandler,o.delegationSelector)}}))}(e,c,n,t.slice(1))}))
const f=c[s]||{}
Object.keys(f).forEach((n=>{const o=n.replace(g,"")
if(!a||t.includes(o)){const t=f[n]
A(e,c,s,t.originalHandler,t.delegationSelector)}}))},trigger(e,t,n){if("string"!=typeof t||!e)return null
const o=c(),r=D(t),i=t!==r,s=E.has(r)
let a,l=!0,f=!0,u=!1,d=null
return i&&o&&(a=o.Event(t,n),o(e).trigger(a),l=!a.isPropagationStopped(),f=!a.isImmediatePropagationStopped(),u=a.isDefaultPrevented()),s?(d=document.createEvent("HTMLEvents"),d.initEvent(r,l,!0)):d=new CustomEvent(t,{bubbles:l,cancelable:!0}),void 0!==n&&Object.keys(n).forEach((e=>{Object.defineProperty(d,e,{get:()=>n[e]})})),u&&d.preventDefault(),f&&e.dispatchEvent(d),d.defaultPrevented&&void 0!==a&&a.preventDefault(),d}},k=new Map
var T={set(e,t,n){k.has(e)||k.set(e,new Map)
const o=k.get(e)
o.has(t)||0===o.size?o.set(t,n):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(o.keys())[0]}.`)},get:(e,t)=>k.has(e)&&k.get(e).get(t)||null,remove(e,t){if(!k.has(e))return
const n=k.get(e)
n.delete(t),0===n.size&&k.delete(e)}}
class C{constructor(e){(e=r(e))&&(this._element=e,T.set(this._element,this.constructor.DATA_KEY,this))}dispose(){T.remove(this._element,this.constructor.DATA_KEY),N.off(this._element,this.constructor.EVENT_KEY),Object.getOwnPropertyNames(this).forEach((e=>{this[e]=null}))}_queueCallback(e,t,n=!0){p(e,t,n)}static getInstance(e){return T.get(e,this.DATA_KEY)}static getOrCreateInstance(e,t={}){return this.getInstance(e)||new this(e,"object"==typeof t?t:null)}static get VERSION(){return"5.0.2"}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}}const S="active",M="fade",P="show",I=".active",q=":scope > li > .active"
class B extends C{static get NAME(){return"tab"}show(){if(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&this._element.classList.contains(S))return
let t
const o=n(this._element),r=this._element.closest(".nav, .list-group")
if(r){const n="UL"===r.nodeName||"OL"===r.nodeName?q:I
t=e.find(n,r),t=t[t.length-1]}const i=t?N.trigger(t,"hide.bs.tab",{relatedTarget:this._element}):null
if(N.trigger(this._element,"show.bs.tab",{relatedTarget:t}).defaultPrevented||null!==i&&i.defaultPrevented)return
this._activate(this._element,r)
const s=()=>{N.trigger(t,"hidden.bs.tab",{relatedTarget:this._element}),N.trigger(this._element,"shown.bs.tab",{relatedTarget:t})}
o?this._activate(o,o.parentNode,s):s()}_activate(t,n,o){const r=(!n||"UL"!==n.nodeName&&"OL"!==n.nodeName?e.children(n,I):e.find(q,n))[0],i=o&&r&&r.classList.contains(M),s=()=>this._transitionComplete(t,r,o)
r&&i?(r.classList.remove(P),this._queueCallback(s,t,!0)):s()}_transitionComplete(t,n,o){if(n){n.classList.remove(S)
const t=e.findOne(":scope > .dropdown-menu .active",n.parentNode)
t&&t.classList.remove(S),"tab"===n.getAttribute("role")&&n.setAttribute("aria-selected",!1)}t.classList.add(S),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!0),(e=>{e.offsetHeight})(t),t.classList.contains(M)&&t.classList.add(P)
let r=t.parentNode
if(r&&"LI"===r.nodeName&&(r=r.parentNode),r&&r.classList.contains("dropdown-menu")){const n=t.closest(".dropdown")
n&&e.find(".dropdown-toggle",n).forEach((e=>e.classList.add(S))),t.setAttribute("aria-expanded",!0)}o&&o()}static jQueryInterface(e){return this.each((function(){const t=B.getOrCreateInstance(this)
if("string"==typeof e){if(void 0===t[e])throw new TypeError(`No method named "${e}"`)
t[e]()}}))}}N.on(document,"click.bs.tab.data-api",'[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',(function(e){["A","AREA"].includes(this.tagName)&&e.preventDefault(),s(this)||B.getOrCreateInstance(this).show()})),u(B)
var H="top",R="bottom",W="right",$="left",V="auto",K=[H,R,W,$],U="start",Y="end",z="clippingParents",F="viewport",Q="popper",X="reference",G=K.reduce((function(e,t){return e.concat([t+"-"+U,t+"-"+Y])}),[]),J=[].concat(K,[V]).reduce((function(e,t){return e.concat([t,t+"-"+U,t+"-"+Y])}),[]),Z="beforeRead",ee="read",te="afterRead",ne="beforeMain",oe="main",re="afterMain",ie="beforeWrite",se="write",ae="afterWrite",ce=[Z,ee,te,ne,oe,re,ie,se,ae]
function le(e){return e?(e.nodeName||"").toLowerCase():null}function fe(e){if(null==e)return window
if("[object Window]"!==e.toString()){var t=e.ownerDocument
return t&&t.defaultView||window}return e}function ue(e){return e instanceof fe(e).Element||e instanceof Element}function de(e){return e instanceof fe(e).HTMLElement||e instanceof HTMLElement}function pe(e){return"undefined"!=typeof ShadowRoot&&(e instanceof fe(e).ShadowRoot||e instanceof ShadowRoot)}var me={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state
Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},o=t.attributes[e]||{},r=t.elements[e]
de(r)&&le(r)&&(Object.assign(r.style,n),Object.keys(o).forEach((function(e){var t=o[e]
!1===t?r.removeAttribute(e):r.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}}
return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var o=t.elements[e],r=t.attributes[e]||{},i=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{})
de(o)&&le(o)&&(Object.assign(o.style,i),Object.keys(r).forEach((function(e){o.removeAttribute(e)})))}))}},requires:["computeStyles"]}
function he(e){return e.split("-")[0]}function ge(e){var t=e.getBoundingClientRect()
return{width:t.width,height:t.height,top:t.top,right:t.right,bottom:t.bottom,left:t.left,x:t.left,y:t.top}}function ve(e){var t=ge(e),n=e.offsetWidth,o=e.offsetHeight
return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-o)<=1&&(o=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:o}}function be(e,t){var n=t.getRootNode&&t.getRootNode()
if(e.contains(t))return!0
if(n&&pe(n)){var o=t
do{if(o&&e.isSameNode(o))return!0
o=o.parentNode||o.host}while(o)}return!1}function ye(e){return fe(e).getComputedStyle(e)}function we(e){return["table","td","th"].indexOf(le(e))>=0}function Ee(e){return((ue(e)?e.ownerDocument:e.document)||window.document).documentElement}function _e(e){return"html"===le(e)?e:e.assignedSlot||e.parentNode||(pe(e)?e.host:null)||Ee(e)}function Oe(e){return de(e)&&"fixed"!==ye(e).position?e.offsetParent:null}function xe(e){for(var t=fe(e),n=Oe(e);n&&we(n)&&"static"===ye(n).position;)n=Oe(n)
return n&&("html"===le(n)||"body"===le(n)&&"static"===ye(n).position)?t:n||function(e){var t=-1!==navigator.userAgent.toLowerCase().indexOf("firefox")
if(-1!==navigator.userAgent.indexOf("Trident")&&de(e)&&"fixed"===ye(e).position)return null
for(var n=_e(e);de(n)&&["html","body"].indexOf(le(n))<0;){var o=ye(n)
if("none"!==o.transform||"none"!==o.perspective||"paint"===o.contain||-1!==["transform","perspective"].indexOf(o.willChange)||t&&"filter"===o.willChange||t&&o.filter&&"none"!==o.filter)return n
n=n.parentNode}return null}(e)||t}function je(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}var Le=Math.max,Ae=Math.min,De=Math.round
function Ne(e,t,n){return Le(e,Ae(t,n))}function ke(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function Te(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}var Ce={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,o=e.name,r=e.options,i=n.elements.arrow,s=n.modifiersData.popperOffsets,a=he(n.placement),c=je(a),l=[$,W].indexOf(a)>=0?"height":"width"
if(i&&s){var f=function(e,t){return ke("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:Te(e,K))}(r.padding,n),u=ve(i),d="y"===c?H:$,p="y"===c?R:W,m=n.rects.reference[l]+n.rects.reference[c]-s[c]-n.rects.popper[l],h=s[c]-n.rects.reference[c],g=xe(i),v=g?"y"===c?g.clientHeight||0:g.clientWidth||0:0,b=m/2-h/2,y=f[d],w=v-u[l]-f[p],E=v/2-u[l]/2+b,_=Ne(y,E,w),O=c
n.modifiersData[o]=((t={})[O]=_,t.centerOffset=_-E,t)}},effect:function(e){var t=e.state,n=e.options.element,o=void 0===n?"[data-popper-arrow]":n
null!=o&&("string"!=typeof o||(o=t.elements.popper.querySelector(o)))&&be(t.elements.popper,o)&&(t.elements.arrow=o)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]},Se={top:"auto",right:"auto",bottom:"auto",left:"auto"}
function Me(e){var t,n=e.popper,o=e.popperRect,r=e.placement,i=e.offsets,s=e.position,a=e.gpuAcceleration,c=e.adaptive,l=e.roundOffsets,f=!0===l?function(e){var t=e.x,n=e.y,o=window.devicePixelRatio||1
return{x:De(De(t*o)/o)||0,y:De(De(n*o)/o)||0}}(i):"function"==typeof l?l(i):i,u=f.x,d=void 0===u?0:u,p=f.y,m=void 0===p?0:p,h=i.hasOwnProperty("x"),g=i.hasOwnProperty("y"),v=$,b=H,y=window
if(c){var w=xe(n),E="clientHeight",_="clientWidth"
w===fe(n)&&"static"!==ye(w=Ee(n)).position&&(E="scrollHeight",_="scrollWidth"),w=w,r===H&&(b=R,m-=w[E]-o.height,m*=a?1:-1),r===$&&(v=W,d-=w[_]-o.width,d*=a?1:-1)}var O,x=Object.assign({position:s},c&&Se)
return a?Object.assign({},x,((O={})[b]=g?"0":"",O[v]=h?"0":"",O.transform=(y.devicePixelRatio||1)<2?"translate("+d+"px, "+m+"px)":"translate3d("+d+"px, "+m+"px, 0)",O)):Object.assign({},x,((t={})[b]=g?m+"px":"",t[v]=h?d+"px":"",t.transform="",t))}var Pe={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,o=n.gpuAcceleration,r=void 0===o||o,i=n.adaptive,s=void 0===i||i,a=n.roundOffsets,c=void 0===a||a,l={placement:he(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:r}
null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,Me(Object.assign({},l,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:c})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,Me(Object.assign({},l,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},Ie={passive:!0},qe={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,o=e.options,r=o.scroll,i=void 0===r||r,s=o.resize,a=void 0===s||s,c=fe(t.elements.popper),l=[].concat(t.scrollParents.reference,t.scrollParents.popper)
return i&&l.forEach((function(e){e.addEventListener("scroll",n.update,Ie)})),a&&c.addEventListener("resize",n.update,Ie),function(){i&&l.forEach((function(e){e.removeEventListener("scroll",n.update,Ie)})),a&&c.removeEventListener("resize",n.update,Ie)}},data:{}},Be={left:"right",right:"left",bottom:"top",top:"bottom"}
function He(e){return e.replace(/left|right|bottom|top/g,(function(e){return Be[e]}))}var Re={start:"end",end:"start"}
function We(e){return e.replace(/start|end/g,(function(e){return Re[e]}))}function $e(e){var t=fe(e)
return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function Ve(e){return ge(Ee(e)).left+$e(e).scrollLeft}function Ke(e){var t=ye(e),n=t.overflow,o=t.overflowX,r=t.overflowY
return/auto|scroll|overlay|hidden/.test(n+r+o)}function Ue(e){return["html","body","#document"].indexOf(le(e))>=0?e.ownerDocument.body:de(e)&&Ke(e)?e:Ue(_e(e))}function Ye(e,t){var n
void 0===t&&(t=[])
var o=Ue(e),r=o===(null==(n=e.ownerDocument)?void 0:n.body),i=fe(o),s=r?[i].concat(i.visualViewport||[],Ke(o)?o:[]):o,a=t.concat(s)
return r?a:a.concat(Ye(_e(s)))}function ze(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Fe(e,t){return t===F?ze(function(e){var t=fe(e),n=Ee(e),o=t.visualViewport,r=n.clientWidth,i=n.clientHeight,s=0,a=0
return o&&(r=o.width,i=o.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(s=o.offsetLeft,a=o.offsetTop)),{width:r,height:i,x:s+Ve(e),y:a}}(e)):de(t)?function(e){var t=ge(e)
return t.top=t.top+e.clientTop,t.left=t.left+e.clientLeft,t.bottom=t.top+e.clientHeight,t.right=t.left+e.clientWidth,t.width=e.clientWidth,t.height=e.clientHeight,t.x=t.left,t.y=t.top,t}(t):ze(function(e){var t,n=Ee(e),o=$e(e),r=null==(t=e.ownerDocument)?void 0:t.body,i=Le(n.scrollWidth,n.clientWidth,r?r.scrollWidth:0,r?r.clientWidth:0),s=Le(n.scrollHeight,n.clientHeight,r?r.scrollHeight:0,r?r.clientHeight:0),a=-o.scrollLeft+Ve(e),c=-o.scrollTop
return"rtl"===ye(r||n).direction&&(a+=Le(n.clientWidth,r?r.clientWidth:0)-i),{width:i,height:s,x:a,y:c}}(Ee(e)))}function Qe(e,t,n){var o="clippingParents"===t?function(e){var t=Ye(_e(e)),n=["absolute","fixed"].indexOf(ye(e).position)>=0&&de(e)?xe(e):e
return ue(n)?t.filter((function(e){return ue(e)&&be(e,n)&&"body"!==le(e)})):[]}(e):[].concat(t),r=[].concat(o,[n]),i=r[0],s=r.reduce((function(t,n){var o=Fe(e,n)
return t.top=Le(o.top,t.top),t.right=Ae(o.right,t.right),t.bottom=Ae(o.bottom,t.bottom),t.left=Le(o.left,t.left),t}),Fe(e,i))
return s.width=s.right-s.left,s.height=s.bottom-s.top,s.x=s.left,s.y=s.top,s}function Xe(e){return e.split("-")[1]}function Ge(e){var t,n=e.reference,o=e.element,r=e.placement,i=r?he(r):null,s=r?Xe(r):null,a=n.x+n.width/2-o.width/2,c=n.y+n.height/2-o.height/2
switch(i){case H:t={x:a,y:n.y-o.height}
break
case R:t={x:a,y:n.y+n.height}
break
case W:t={x:n.x+n.width,y:c}
break
case $:t={x:n.x-o.width,y:c}
break
default:t={x:n.x,y:n.y}}var l=i?je(i):null
if(null!=l){var f="y"===l?"height":"width"
switch(s){case U:t[l]=t[l]-(n[f]/2-o[f]/2)
break
case Y:t[l]=t[l]+(n[f]/2-o[f]/2)}}return t}function Je(e,t){void 0===t&&(t={})
var n=t,o=n.placement,r=void 0===o?e.placement:o,i=n.boundary,s=void 0===i?z:i,a=n.rootBoundary,c=void 0===a?F:a,l=n.elementContext,f=void 0===l?Q:l,u=n.altBoundary,d=void 0!==u&&u,p=n.padding,m=void 0===p?0:p,h=ke("number"!=typeof m?m:Te(m,K)),g=f===Q?X:Q,v=e.elements.reference,b=e.rects.popper,y=e.elements[d?g:f],w=Qe(ue(y)?y:y.contextElement||Ee(e.elements.popper),s,c),E=ge(v),_=Ge({reference:E,element:b,strategy:"absolute",placement:r}),O=ze(Object.assign({},b,_)),x=f===Q?O:E,j={top:w.top-x.top+h.top,bottom:x.bottom-w.bottom+h.bottom,left:w.left-x.left+h.left,right:x.right-w.right+h.right},L=e.modifiersData.offset
if(f===Q&&L){var A=L[r]
Object.keys(j).forEach((function(e){var t=[W,R].indexOf(e)>=0?1:-1,n=[H,R].indexOf(e)>=0?"y":"x"
j[e]+=A[n]*t}))}return j}function Ze(e,t){void 0===t&&(t={})
var n=t,o=n.placement,r=n.boundary,i=n.rootBoundary,s=n.padding,a=n.flipVariations,c=n.allowedAutoPlacements,l=void 0===c?J:c,f=Xe(o),u=f?a?G:G.filter((function(e){return Xe(e)===f})):K,d=u.filter((function(e){return l.indexOf(e)>=0}))
0===d.length&&(d=u)
var p=d.reduce((function(t,n){return t[n]=Je(e,{placement:n,boundary:r,rootBoundary:i,padding:s})[he(n)],t}),{})
return Object.keys(p).sort((function(e,t){return p[e]-p[t]}))}var et={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,o=e.name
if(!t.modifiersData[o]._skip){for(var r=n.mainAxis,i=void 0===r||r,s=n.altAxis,a=void 0===s||s,c=n.fallbackPlacements,l=n.padding,f=n.boundary,u=n.rootBoundary,d=n.altBoundary,p=n.flipVariations,m=void 0===p||p,h=n.allowedAutoPlacements,g=t.options.placement,v=he(g),b=c||(v!==g&&m?function(e){if(he(e)===V)return[]
var t=He(e)
return[We(e),t,We(t)]}(g):[He(g)]),y=[g].concat(b).reduce((function(e,n){return e.concat(he(n)===V?Ze(t,{placement:n,boundary:f,rootBoundary:u,padding:l,flipVariations:m,allowedAutoPlacements:h}):n)}),[]),w=t.rects.reference,E=t.rects.popper,_=new Map,O=!0,x=y[0],j=0;j<y.length;j++){var L=y[j],A=he(L),D=Xe(L)===U,N=[H,R].indexOf(A)>=0,k=N?"width":"height",T=Je(t,{placement:L,boundary:f,rootBoundary:u,altBoundary:d,padding:l}),C=N?D?W:$:D?R:H
w[k]>E[k]&&(C=He(C))
var S=He(C),M=[]
if(i&&M.push(T[A]<=0),a&&M.push(T[C]<=0,T[S]<=0),M.every((function(e){return e}))){x=L,O=!1
break}_.set(L,M)}if(O)for(var P=function(e){var t=y.find((function(t){var n=_.get(t)
if(n)return n.slice(0,e).every((function(e){return e}))}))
if(t)return x=t,"break"},I=m?3:1;I>0&&"break"!==P(I);I--);t.placement!==x&&(t.modifiersData[o]._skip=!0,t.placement=x,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}}
function tt(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function nt(e){return[H,W,R,$].some((function(t){return e[t]>=0}))}var ot={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,o=t.rects.reference,r=t.rects.popper,i=t.modifiersData.preventOverflow,s=Je(t,{elementContext:"reference"}),a=Je(t,{altBoundary:!0}),c=tt(s,o),l=tt(a,r,i),f=nt(c),u=nt(l)
t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:l,isReferenceHidden:f,hasPopperEscaped:u},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":f,"data-popper-escaped":u})}},rt={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,o=e.name,r=n.offset,i=void 0===r?[0,0]:r,s=J.reduce((function(e,n){return e[n]=function(e,t,n){var o=he(e),r=[$,H].indexOf(o)>=0?-1:1,i="function"==typeof n?n(Object.assign({},t,{placement:e})):n,s=i[0],a=i[1]
return s=s||0,a=(a||0)*r,[$,W].indexOf(o)>=0?{x:a,y:s}:{x:s,y:a}}(n,t.rects,i),e}),{}),a=s[t.placement],c=a.x,l=a.y
null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=l),t.modifiersData[o]=s}},it={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name
t.modifiersData[n]=Ge({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},st={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,o=e.name,r=n.mainAxis,i=void 0===r||r,s=n.altAxis,a=void 0!==s&&s,c=n.boundary,l=n.rootBoundary,f=n.altBoundary,u=n.padding,d=n.tether,p=void 0===d||d,m=n.tetherOffset,h=void 0===m?0:m,g=Je(t,{boundary:c,rootBoundary:l,padding:u,altBoundary:f}),v=he(t.placement),b=Xe(t.placement),y=!b,w=je(v),E="x"===w?"y":"x",_=t.modifiersData.popperOffsets,O=t.rects.reference,x=t.rects.popper,j="function"==typeof h?h(Object.assign({},t.rects,{placement:t.placement})):h,L={x:0,y:0}
if(_){if(i||a){var A="y"===w?H:$,D="y"===w?R:W,N="y"===w?"height":"width",k=_[w],T=_[w]+g[A],C=_[w]-g[D],S=p?-x[N]/2:0,M=b===U?O[N]:x[N],P=b===U?-x[N]:-O[N],I=t.elements.arrow,q=p&&I?ve(I):{width:0,height:0},B=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},V=B[A],K=B[D],Y=Ne(0,O[N],q[N]),z=y?O[N]/2-S-Y-V-j:M-Y-V-j,F=y?-O[N]/2+S+Y+K+j:P+Y+K+j,Q=t.elements.arrow&&xe(t.elements.arrow),X=Q?"y"===w?Q.clientTop||0:Q.clientLeft||0:0,G=t.modifiersData.offset?t.modifiersData.offset[t.placement][w]:0,J=_[w]+z-G-X,Z=_[w]+F-G
if(i){var ee=Ne(p?Ae(T,J):T,k,p?Le(C,Z):C)
_[w]=ee,L[w]=ee-k}if(a){var te="x"===w?H:$,ne="x"===w?R:W,oe=_[E],re=oe+g[te],ie=oe-g[ne],se=Ne(p?Ae(re,J):re,oe,p?Le(ie,Z):ie)
_[E]=se,L[E]=se-oe}}t.modifiersData[o]=L}},requiresIfExists:["offset"]}
function at(e,t,n){void 0===n&&(n=!1)
var o,r,i=Ee(t),s=ge(e),a=de(t),c={scrollLeft:0,scrollTop:0},l={x:0,y:0}
return(a||!a&&!n)&&(("body"!==le(t)||Ke(i))&&(c=(o=t)!==fe(o)&&de(o)?{scrollLeft:(r=o).scrollLeft,scrollTop:r.scrollTop}:$e(o)),de(t)?((l=ge(t)).x+=t.clientLeft,l.y+=t.clientTop):i&&(l.x=Ve(i))),{x:s.left+c.scrollLeft-l.x,y:s.top+c.scrollTop-l.y,width:s.width,height:s.height}}function ct(e){var t=new Map,n=new Set,o=[]
function r(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var o=t.get(e)
o&&r(o)}})),o.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||r(e)})),o}var lt={placement:"bottom",modifiers:[],strategy:"absolute"}
function ft(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n]
return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function ut(e){void 0===e&&(e={})
var t=e,n=t.defaultModifiers,o=void 0===n?[]:n,r=t.defaultOptions,i=void 0===r?lt:r
return function(e,t,n){void 0===n&&(n=i)
var r,s,a={placement:"bottom",orderedModifiers:[],options:Object.assign({},lt,i),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},c=[],l=!1,f={state:a,setOptions:function(n){u(),a.options=Object.assign({},i,a.options,n),a.scrollParents={reference:ue(e)?Ye(e):e.contextElement?Ye(e.contextElement):[],popper:Ye(t)}
var r,s,l=function(e){var t=ct(e)
return ce.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}((r=[].concat(o,a.options.modifiers),s=r.reduce((function(e,t){var n=e[t.name]
return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{}),Object.keys(s).map((function(e){return s[e]}))))
return a.orderedModifiers=l.filter((function(e){return e.enabled})),a.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,o=void 0===n?{}:n,r=e.effect
if("function"==typeof r){var i=r({state:a,name:t,instance:f,options:o}),s=function(){}
c.push(i||s)}})),f.update()},forceUpdate:function(){if(!l){var e=a.elements,t=e.reference,n=e.popper
if(ft(t,n)){a.rects={reference:at(t,xe(n),"fixed"===a.options.strategy),popper:ve(n)},a.reset=!1,a.placement=a.options.placement,a.orderedModifiers.forEach((function(e){return a.modifiersData[e.name]=Object.assign({},e.data)}))
for(var o=0;o<a.orderedModifiers.length;o++)if(!0!==a.reset){var r=a.orderedModifiers[o],i=r.fn,s=r.options,c=void 0===s?{}:s,u=r.name
"function"==typeof i&&(a=i({state:a,options:c,name:u,instance:f})||a)}else a.reset=!1,o=-1}}},update:(r=function(){return new Promise((function(e){f.forceUpdate(),e(a)}))},function(){return s||(s=new Promise((function(e){Promise.resolve().then((function(){s=void 0,e(r())}))}))),s}),destroy:function(){u(),l=!0}}
if(!ft(e,t))return f
function u(){c.forEach((function(e){return e()})),c=[]}return f.setOptions(n).then((function(e){!l&&n.onFirstUpdate&&n.onFirstUpdate(e)})),f}}var dt=ut(),pt=ut({defaultModifiers:[qe,it,Pe,me]}),mt=ut({defaultModifiers:[qe,it,Pe,me,rt,et,st,Ce,ot]}),ht=Object.freeze({__proto__:null,popperGenerator:ut,detectOverflow:Je,createPopperBase:dt,createPopper:mt,createPopperLite:pt,top:H,bottom:R,right:W,left:$,auto:V,basePlacements:K,start:U,end:Y,clippingParents:z,viewport:F,popper:Q,reference:X,variationPlacements:G,placements:J,beforeRead:Z,read:ee,afterRead:te,beforeMain:ne,main:oe,afterMain:re,beforeWrite:ie,write:se,afterWrite:ae,modifierPhases:ce,applyStyles:me,arrow:Ce,computeStyles:Pe,eventListeners:qe,flip:et,hide:ot,offset:rt,popperOffsets:it,preventOverflow:st})
function gt(e){return"true"===e||"false"!==e&&(e===Number(e).toString()?Number(e):""===e||"null"===e?null:e)}function vt(e){return e.replace(/[A-Z]/g,(e=>`-${e.toLowerCase()}`))}const bt={setDataAttribute(e,t,n){e.setAttribute(`data-bs-${vt(t)}`,n)},removeDataAttribute(e,t){e.removeAttribute(`data-bs-${vt(t)}`)},getDataAttributes(e){if(!e)return{}
const t={}
return Object.keys(e.dataset).filter((e=>e.startsWith("bs"))).forEach((n=>{let o=n.replace(/^bs/,"")
o=o.charAt(0).toLowerCase()+o.slice(1,o.length),t[o]=gt(e.dataset[n])})),t},getDataAttribute:(e,t)=>gt(e.getAttribute(`data-bs-${vt(t)}`)),offset(e){const t=e.getBoundingClientRect()
return{top:t.top+document.body.scrollTop,left:t.left+document.body.scrollLeft}},position:e=>({top:e.offsetTop,left:e.offsetLeft})},yt="dropdown",wt="Escape",Et="Space",_t="ArrowUp",Ot="ArrowDown",xt=new RegExp("ArrowUp|ArrowDown|Escape"),jt="click.bs.dropdown.data-api",Lt="keydown.bs.dropdown.data-api",At="show",Dt='[data-bs-toggle="dropdown"]',Nt=".dropdown-menu",kt=f()?"top-end":"top-start",Tt=f()?"top-start":"top-end",Ct=f()?"bottom-end":"bottom-start",St=f()?"bottom-start":"bottom-end",Mt=f()?"left-start":"right-start",Pt=f()?"right-start":"left-start",It={offset:[0,2],boundary:"clippingParents",reference:"toggle",display:"dynamic",popperConfig:null,autoClose:!0},qt={offset:"(array|string|function)",boundary:"(string|element)",reference:"(string|element|object)",display:"string",popperConfig:"(null|object|function)",autoClose:"(boolean|string)"}
class Bt extends C{constructor(e,t){super(e),this._popper=null,this._config=this._getConfig(t),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}static get Default(){return It}static get DefaultType(){return qt}static get NAME(){return yt}toggle(){s(this._element)||(this._element.classList.contains(At)?this.hide():this.show())}show(){if(s(this._element)||this._menu.classList.contains(At))return
const e=Bt.getParentFromElement(this._element),t={relatedTarget:this._element}
if(!N.trigger(this._element,"show.bs.dropdown",t).defaultPrevented){if(this._inNavbar)bt.setDataAttribute(this._menu,"popper","none")
else{if(void 0===ht)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)")
let t=this._element
"parent"===this._config.reference?t=e:o(this._config.reference)?t=r(this._config.reference):"object"==typeof this._config.reference&&(t=this._config.reference)
const n=this._getPopperConfig(),i=n.modifiers.find((e=>"applyStyles"===e.name&&!1===e.enabled))
this._popper=mt(t,this._menu,n),i&&bt.setDataAttribute(this._menu,"popper","static")}"ontouchstart"in document.documentElement&&!e.closest(".navbar-nav")&&[].concat(...document.body.children).forEach((e=>N.on(e,"mouseover",a))),this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.toggle(At),this._element.classList.toggle(At),N.trigger(this._element,"shown.bs.dropdown",t)}}hide(){if(s(this._element)||!this._menu.classList.contains(At))return
const e={relatedTarget:this._element}
this._completeHide(e)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_addEventListeners(){N.on(this._element,"click.bs.dropdown",(e=>{e.preventDefault(),this.toggle()}))}_completeHide(e){N.trigger(this._element,"hide.bs.dropdown",e).defaultPrevented||("ontouchstart"in document.documentElement&&[].concat(...document.body.children).forEach((e=>N.off(e,"mouseover",a))),this._popper&&this._popper.destroy(),this._menu.classList.remove(At),this._element.classList.remove(At),this._element.setAttribute("aria-expanded","false"),bt.removeDataAttribute(this._menu,"popper"),N.trigger(this._element,"hidden.bs.dropdown",e))}_getConfig(e){if(e={...this.constructor.Default,...bt.getDataAttributes(this._element),...e},((e,t,n)=>{Object.keys(n).forEach((r=>{const i=n[r],s=t[r],a=s&&o(s)?"element":null==(c=s)?`${c}`:{}.toString.call(c).match(/\s([a-z]+)/i)[1].toLowerCase()
var c
if(!new RegExp(i).test(a))throw new TypeError(`${e.toUpperCase()}: Option "${r}" provided type "${a}" but expected type "${i}".`)}))})(yt,e,this.constructor.DefaultType),"object"==typeof e.reference&&!o(e.reference)&&"function"!=typeof e.reference.getBoundingClientRect)throw new TypeError(`${yt.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`)
return e}_getMenuElement(){return e.next(this._element,Nt)[0]}_getPlacement(){const e=this._element.parentNode
if(e.classList.contains("dropend"))return Mt
if(e.classList.contains("dropstart"))return Pt
const t="end"===getComputedStyle(this._menu).getPropertyValue("--bs-position").trim()
return e.classList.contains("dropup")?t?Tt:kt:t?St:Ct}_detectNavbar(){return null!==this._element.closest(".navbar")}_getOffset(){const{offset:e}=this._config
return"string"==typeof e?e.split(",").map((e=>Number.parseInt(e,10))):"function"==typeof e?t=>e(t,this._element):e}_getPopperConfig(){const e={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]}
return"static"===this._config.display&&(e.modifiers=[{name:"applyStyles",enabled:!1}]),{...e,..."function"==typeof this._config.popperConfig?this._config.popperConfig(e):this._config.popperConfig}}_selectMenuItem({key:t,target:n}){const o=e.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",this._menu).filter(i)
o.length&&((e,t,n,o)=>{let r=e.indexOf(t)
if(-1===r)return e[!n&&o?e.length-1:0]
const i=e.length
return r+=n?1:-1,o&&(r=(r+i)%i),e[Math.max(0,Math.min(r,i-1))]})(o,n,t===Ot,!o.includes(n)).focus()}static dropdownInterface(e,t){const n=Bt.getOrCreateInstance(e,t)
if("string"==typeof t){if(void 0===n[t])throw new TypeError(`No method named "${t}"`)
n[t]()}}static jQueryInterface(e){return this.each((function(){Bt.dropdownInterface(this,e)}))}static clearMenus(t){if(t&&(2===t.button||"keyup"===t.type&&"Tab"!==t.key))return
const n=e.find(Dt)
for(let e=0,o=n.length;e<o;e++){const o=Bt.getInstance(n[e])
if(!o||!1===o._config.autoClose)continue
if(!o._element.classList.contains(At))continue
const r={relatedTarget:o._element}
if(t){const e=t.composedPath(),n=e.includes(o._menu)
if(e.includes(o._element)||"inside"===o._config.autoClose&&!n||"outside"===o._config.autoClose&&n)continue
if(o._menu.contains(t.target)&&("keyup"===t.type&&"Tab"===t.key||/input|select|option|textarea|form/i.test(t.target.tagName)))continue
"click"===t.type&&(r.clickEvent=t)}o._completeHide(r)}}static getParentFromElement(e){return n(e)||e.parentNode}static dataApiKeydownHandler(t){if(/input|textarea/i.test(t.target.tagName)?t.key===Et||t.key!==wt&&(t.key!==Ot&&t.key!==_t||t.target.closest(Nt)):!xt.test(t.key))return
const n=this.classList.contains(At)
if(!n&&t.key===wt)return
if(t.preventDefault(),t.stopPropagation(),s(this))return
const o=()=>this.matches(Dt)?this:e.prev(this,Dt)[0]
return t.key===wt?(o().focus(),void Bt.clearMenus()):t.key===_t||t.key===Ot?(n||o().click(),void Bt.getInstance(o())._selectMenuItem(t)):void(n&&t.key!==Et||Bt.clearMenus())}}N.on(document,Lt,Dt,Bt.dataApiKeydownHandler),N.on(document,Lt,Nt,Bt.dataApiKeydownHandler),N.on(document,jt,Bt.clearMenus),N.on(document,"keyup.bs.dropdown.data-api",Bt.clearMenus),N.on(document,jt,Dt,(function(e){e.preventDefault(),Bt.dropdownInterface(this)})),u(Bt),document.addEventListener("DOMContentLoaded",(function(){if(document.getElementById("prism-css").media="all",document.getElementById("toggle-offcanvas").addEventListener("click",(function(){document.body.classList.toggle("offcanvas-open")})),0!=document.querySelectorAll(".demo").length&&!document.getElementById("select-theme")){var e=window.themes||["bootstrap5","bootstrap4","bootstrap3","default"],t={bootstrap5:"Bootstrap 5",bootstrap4:"Bootstrap 4",bootstrap3:"Bootstrap 3",default:"Default"},n=localStorage.getItem("theme");-1==e.indexOf(n)&&(n="bootstrap5")
var o=document.createElement("input")
o.classList.add("theme-selector-input")
var r=document.getElementById("main-container")
document.querySelectorAll(".demo-mini").length||(r.insertBefore(o,r.firstChild),new TomSelect(o,{maxItems:1,controlInput:"<input>",plugins:["no_backspace_delete"],options:e.map((n=>-1!=e.indexOf(n)&&{text:t[n],value:n})),items:[n],render:{item:(e,t)=>"<div>Theme: "+t(e.text)+"</div>"},onChange:e=>{i(e)}})),i(n),document.addEventListener("click",(e=>{var t=e.target.closest(".opensandbox")
if(t){var n,o=t.closest(".demo")
function e(e){var t=o.querySelector(e)
return t&&t.textContent||""}var r=`<div class="p-4">${o.querySelector("textarea").value||""}</div>`,i=e("style"),s=e("script"),a=[`https://cdn.jsdelivr.net/gh/orchidjs/tom-select@1.7.7/dist/css/tom-select.${localStorage.getItem("theme")||"bootstrap4"}.min.css`,"https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/css/bootstrap.min.css","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"],c=["https://cdn.jsdelivr.net/gh/orchidjs/tom-select@1.7.7/dist/js/tom-select.complete.min.js"]
o.classList.contains("demo-jquery")&&(c.push("https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js"),c.push("https://cdn.jsdelivr.net/npm/jquery-ui-dist@1.12.1/jquery-ui.js")),n={html:r,js:s,css:i,js_external:c.join(";"),css_external:a.join(";")},o.querySelector(".codepen").value=JSON.stringify(n),o.querySelector(".jsfiddle-html").value=r,o.querySelector(".jsfiddle-js").value=s,o.querySelector(".jsfiddle-css").value=i,o.querySelector(".jsfiddle-resources").value=c.join(",")+","+a.join(","),setTimeout((()=>{t.nextElementSibling.submit()}),50)}}))}function i(t){if(-1!=e.indexOf(t)){localStorage.setItem("theme",t)
var n=document.getElementById("select-theme")
n&&n.parentNode.removeChild(n),(n=document.createElement("link")).id="select-theme",n.setAttribute("rel","stylesheet"),n.setAttribute("href","/css/tom-select."+t+".css"),document.getElementsByTagName("head")[0].appendChild(n)}}}))},"function"==typeof define&&define.amd?define(e):e()
//# sourceMappingURL=index.bundle.js.map
