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
return t?document.querySelector(t):null},o=e=>!(!e||"object"!=typeof e)&&(void 0!==e.jquery&&(e=e[0]),void 0!==e.nodeType),r=t=>o(t)?t.jquery?t[0]:t:"string"==typeof t&&t.length>0?e.findOne(t):null,i=(e,n)=>{let o=!1
const r=n+5
e.addEventListener(t,(function n(){o=!0,e.removeEventListener(t,n)})),setTimeout((()=>{o||(e=>{e.dispatchEvent(new Event(t))})(e)}),r)},s=e=>{if(!e)return!1
if(e.style&&e.parentNode&&e.parentNode.style){const t=getComputedStyle(e),n=getComputedStyle(e.parentNode)
return"none"!==t.display&&"none"!==n.display&&"hidden"!==t.visibility}return!1},a=e=>!e||e.nodeType!==Node.ELEMENT_NODE||!!e.classList.contains("disabled")||(void 0!==e.disabled?e.disabled:e.hasAttribute("disabled")&&"false"!==e.getAttribute("disabled")),c=()=>{},l=()=>{const{jQuery:e}=window
return e&&!document.body.hasAttribute("data-bs-no-jquery")?e:null},f=()=>"rtl"===document.documentElement.dir,d=e=>{var t
t=()=>{const t=l()
if(t){const n=e.NAME,o=t.fn[n]
t.fn[n]=e.jQueryInterface,t.fn[n].Constructor=e,t.fn[n].noConflict=()=>(t.fn[n]=o,e.jQueryInterface)}},"loading"===document.readyState?document.addEventListener("DOMContentLoaded",t):t()},u=e=>{"function"==typeof e&&e()},p=new Map
var m={set(e,t,n){p.has(e)||p.set(e,new Map)
const o=p.get(e)
o.has(t)||0===o.size?o.set(t,n):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(o.keys())[0]}.`)},get:(e,t)=>p.has(e)&&p.get(e).get(t)||null,remove(e,t){if(!p.has(e))return
const n=p.get(e)
n.delete(t),0===n.size&&p.delete(e)}}
const h=/[^.]*(?=\..*)\.|.*/,g=/\..*/,v=/::\d+$/,b={}
let y=1
const w={mouseenter:"mouseover",mouseleave:"mouseout"},E=/^(mouseenter|mouseleave)/i,_=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"])
function O(e,t){return t&&`${t}::${y++}`||e.uidEvent||y++}function x(e){const t=O(e)
return e.uidEvent=t,b[t]=b[t]||{},b[t]}function j(e,t,n=null){const o=Object.keys(e)
for(let r=0,i=o.length;r<i;r++){const i=e[o[r]]
if(i.originalHandler===t&&i.delegationSelector===n)return i}return null}function L(e,t,n){const o="string"==typeof t,r=o?n:t
let i=D(e)
return _.has(i)||(i=e),[o,r,i]}function A(e,t,n,o,r){if("string"!=typeof t||!e)return
if(n||(n=o,o=null),E.test(t)){const e=e=>function(t){if(!t.relatedTarget||t.relatedTarget!==t.delegateTarget&&!t.delegateTarget.contains(t.relatedTarget))return e.call(this,t)}
o?o=e(o):n=e(n)}const[i,s,a]=L(t,n,o),c=x(e),l=c[a]||(c[a]={}),f=j(l,s,i?n:null)
if(f)return void(f.oneOff=f.oneOff&&r)
const d=O(s,t.replace(h,"")),u=i?function(e,t,n){return function o(r){const i=e.querySelectorAll(t)
for(let{target:s}=r;s&&s!==this;s=s.parentNode)for(let a=i.length;a--;)if(i[a]===s)return r.delegateTarget=s,o.oneOff&&k.off(e,r.type,t,n),n.apply(s,[r])
return null}}(e,n,o):function(e,t){return function n(o){return o.delegateTarget=e,n.oneOff&&k.off(e,o.type,t),t.apply(e,[o])}}(e,n)
u.delegationSelector=i?n:null,u.originalHandler=s,u.oneOff=r,u.uidEvent=d,l[d]=u,e.addEventListener(a,u,i)}function N(e,t,n,o,r){const i=j(t[n],o,r)
i&&(e.removeEventListener(n,i,Boolean(r)),delete t[n][i.uidEvent])}function D(e){return e=e.replace(g,""),w[e]||e}const k={on(e,t,n,o){A(e,t,n,o,!1)},one(e,t,n,o){A(e,t,n,o,!0)},off(e,t,n,o){if("string"!=typeof t||!e)return
const[r,i,s]=L(t,n,o),a=s!==t,c=x(e),l=t.startsWith(".")
if(void 0!==i){if(!c||!c[s])return
return void N(e,c,s,i,r?n:null)}l&&Object.keys(c).forEach((n=>{!function(e,t,n,o){const r=t[n]||{}
Object.keys(r).forEach((i=>{if(i.includes(o)){const o=r[i]
N(e,t,n,o.originalHandler,o.delegationSelector)}}))}(e,c,n,t.slice(1))}))
const f=c[s]||{}
Object.keys(f).forEach((n=>{const o=n.replace(v,"")
if(!a||t.includes(o)){const t=f[n]
N(e,c,s,t.originalHandler,t.delegationSelector)}}))},trigger(e,t,n){if("string"!=typeof t||!e)return null
const o=l(),r=D(t),i=t!==r,s=_.has(r)
let a,c=!0,f=!0,d=!1,u=null
return i&&o&&(a=o.Event(t,n),o(e).trigger(a),c=!a.isPropagationStopped(),f=!a.isImmediatePropagationStopped(),d=a.isDefaultPrevented()),s?(u=document.createEvent("HTMLEvents"),u.initEvent(r,c,!0)):u=new CustomEvent(t,{bubbles:c,cancelable:!0}),void 0!==n&&Object.keys(n).forEach((e=>{Object.defineProperty(u,e,{get:()=>n[e]})})),d&&u.preventDefault(),f&&e.dispatchEvent(u),u.defaultPrevented&&void 0!==a&&a.preventDefault(),u}}
class T{constructor(e){(e=r(e))&&(this._element=e,m.set(this._element,this.constructor.DATA_KEY,this))}dispose(){m.remove(this._element,this.constructor.DATA_KEY),k.off(this._element,this.constructor.EVENT_KEY),Object.getOwnPropertyNames(this).forEach((e=>{this[e]=null}))}_queueCallback(e,t,n=!0){if(!n)return void u(e)
const o=(e=>{if(!e)return 0
let{transitionDuration:t,transitionDelay:n}=window.getComputedStyle(e)
const o=Number.parseFloat(t),r=Number.parseFloat(n)
return o||r?(t=t.split(",")[0],n=n.split(",")[0],1e3*(Number.parseFloat(t)+Number.parseFloat(n))):0})(t)
k.one(t,"transitionend",(()=>u(e))),i(t,o)}static getInstance(e){return m.get(e,this.DATA_KEY)}static get VERSION(){return"5.0.1"}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}}const S="bs.tab",C="active",M="fade",P="show",q=".active",B=":scope > li > .active"
class I extends T{static get NAME(){return"tab"}show(){if(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&this._element.classList.contains(C))return
let t
const o=n(this._element),r=this._element.closest(".nav, .list-group")
if(r){const n="UL"===r.nodeName||"OL"===r.nodeName?B:q
t=e.find(n,r),t=t[t.length-1]}const i=t?k.trigger(t,"hide.bs.tab",{relatedTarget:this._element}):null
if(k.trigger(this._element,"show.bs.tab",{relatedTarget:t}).defaultPrevented||null!==i&&i.defaultPrevented)return
this._activate(this._element,r)
const s=()=>{k.trigger(t,"hidden.bs.tab",{relatedTarget:this._element}),k.trigger(this._element,"shown.bs.tab",{relatedTarget:t})}
o?this._activate(o,o.parentNode,s):s()}_activate(t,n,o){const r=(!n||"UL"!==n.nodeName&&"OL"!==n.nodeName?e.children(n,q):e.find(B,n))[0],i=o&&r&&r.classList.contains(M),s=()=>this._transitionComplete(t,r,o)
r&&i?(r.classList.remove(P),this._queueCallback(s,t,!0)):s()}_transitionComplete(t,n,o){if(n){n.classList.remove(C)
const t=e.findOne(":scope > .dropdown-menu .active",n.parentNode)
t&&t.classList.remove(C),"tab"===n.getAttribute("role")&&n.setAttribute("aria-selected",!1)}t.classList.add(C),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!0),(e=>{e.offsetHeight})(t),t.classList.contains(M)&&t.classList.add(P)
let r=t.parentNode
if(r&&"LI"===r.nodeName&&(r=r.parentNode),r&&r.classList.contains("dropdown-menu")){const n=t.closest(".dropdown")
n&&e.find(".dropdown-toggle",n).forEach((e=>e.classList.add(C))),t.setAttribute("aria-expanded",!0)}o&&o()}static jQueryInterface(e){return this.each((function(){const t=m.get(this,S)||new I(this)
if("string"==typeof e){if(void 0===t[e])throw new TypeError(`No method named "${e}"`)
t[e]()}}))}}k.on(document,"click.bs.tab.data-api",'[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',(function(e){["A","AREA"].includes(this.tagName)&&e.preventDefault(),a(this)||(m.get(this,S)||new I(this)).show()})),d(I)
var H="top",R="bottom",W="right",$="left",K="auto",U=[H,R,W,$],V="start",Y="end",z="clippingParents",F="viewport",Q="popper",X="reference",G=U.reduce((function(e,t){return e.concat([t+"-"+V,t+"-"+Y])}),[]),J=[].concat(U,[K]).reduce((function(e,t){return e.concat([t,t+"-"+V,t+"-"+Y])}),[]),Z="beforeRead",ee="read",te="afterRead",ne="beforeMain",oe="main",re="afterMain",ie="beforeWrite",se="write",ae="afterWrite",ce=[Z,ee,te,ne,oe,re,ie,se,ae]
function le(e){return e?(e.nodeName||"").toLowerCase():null}function fe(e){if(null==e)return window
if("[object Window]"!==e.toString()){var t=e.ownerDocument
return t&&t.defaultView||window}return e}function de(e){return e instanceof fe(e).Element||e instanceof Element}function ue(e){return e instanceof fe(e).HTMLElement||e instanceof HTMLElement}function pe(e){return"undefined"!=typeof ShadowRoot&&(e instanceof fe(e).ShadowRoot||e instanceof ShadowRoot)}var me={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state
Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},o=t.attributes[e]||{},r=t.elements[e]
ue(r)&&le(r)&&(Object.assign(r.style,n),Object.keys(o).forEach((function(e){var t=o[e]
!1===t?r.removeAttribute(e):r.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}}
return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var o=t.elements[e],r=t.attributes[e]||{},i=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{})
ue(o)&&le(o)&&(Object.assign(o.style,i),Object.keys(r).forEach((function(e){o.removeAttribute(e)})))}))}},requires:["computeStyles"]}
function he(e){return e.split("-")[0]}function ge(e){var t=e.getBoundingClientRect()
return{width:t.width,height:t.height,top:t.top,right:t.right,bottom:t.bottom,left:t.left,x:t.left,y:t.top}}function ve(e){var t=ge(e),n=e.offsetWidth,o=e.offsetHeight
return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-o)<=1&&(o=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:o}}function be(e,t){var n=t.getRootNode&&t.getRootNode()
if(e.contains(t))return!0
if(n&&pe(n)){var o=t
do{if(o&&e.isSameNode(o))return!0
o=o.parentNode||o.host}while(o)}return!1}function ye(e){return fe(e).getComputedStyle(e)}function we(e){return["table","td","th"].indexOf(le(e))>=0}function Ee(e){return((de(e)?e.ownerDocument:e.document)||window.document).documentElement}function _e(e){return"html"===le(e)?e:e.assignedSlot||e.parentNode||(pe(e)?e.host:null)||Ee(e)}function Oe(e){return ue(e)&&"fixed"!==ye(e).position?e.offsetParent:null}function xe(e){for(var t=fe(e),n=Oe(e);n&&we(n)&&"static"===ye(n).position;)n=Oe(n)
return n&&("html"===le(n)||"body"===le(n)&&"static"===ye(n).position)?t:n||function(e){var t=-1!==navigator.userAgent.toLowerCase().indexOf("firefox")
if(-1!==navigator.userAgent.indexOf("Trident")&&ue(e)&&"fixed"===ye(e).position)return null
for(var n=_e(e);ue(n)&&["html","body"].indexOf(le(n))<0;){var o=ye(n)
if("none"!==o.transform||"none"!==o.perspective||"paint"===o.contain||-1!==["transform","perspective"].indexOf(o.willChange)||t&&"filter"===o.willChange||t&&o.filter&&"none"!==o.filter)return n
n=n.parentNode}return null}(e)||t}function je(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}var Le=Math.max,Ae=Math.min,Ne=Math.round
function De(e,t,n){return Le(e,Ae(t,n))}function ke(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function Te(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}var Se={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,o=e.name,r=e.options,i=n.elements.arrow,s=n.modifiersData.popperOffsets,a=he(n.placement),c=je(a),l=[$,W].indexOf(a)>=0?"height":"width"
if(i&&s){var f=function(e,t){return ke("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:Te(e,U))}(r.padding,n),d=ve(i),u="y"===c?H:$,p="y"===c?R:W,m=n.rects.reference[l]+n.rects.reference[c]-s[c]-n.rects.popper[l],h=s[c]-n.rects.reference[c],g=xe(i),v=g?"y"===c?g.clientHeight||0:g.clientWidth||0:0,b=m/2-h/2,y=f[u],w=v-d[l]-f[p],E=v/2-d[l]/2+b,_=De(y,E,w),O=c
n.modifiersData[o]=((t={})[O]=_,t.centerOffset=_-E,t)}},effect:function(e){var t=e.state,n=e.options.element,o=void 0===n?"[data-popper-arrow]":n
null!=o&&("string"!=typeof o||(o=t.elements.popper.querySelector(o)))&&be(t.elements.popper,o)&&(t.elements.arrow=o)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]},Ce={top:"auto",right:"auto",bottom:"auto",left:"auto"}
function Me(e){var t,n=e.popper,o=e.popperRect,r=e.placement,i=e.offsets,s=e.position,a=e.gpuAcceleration,c=e.adaptive,l=e.roundOffsets,f=!0===l?function(e){var t=e.x,n=e.y,o=window.devicePixelRatio||1
return{x:Ne(Ne(t*o)/o)||0,y:Ne(Ne(n*o)/o)||0}}(i):"function"==typeof l?l(i):i,d=f.x,u=void 0===d?0:d,p=f.y,m=void 0===p?0:p,h=i.hasOwnProperty("x"),g=i.hasOwnProperty("y"),v=$,b=H,y=window
if(c){var w=xe(n),E="clientHeight",_="clientWidth"
w===fe(n)&&"static"!==ye(w=Ee(n)).position&&(E="scrollHeight",_="scrollWidth"),w=w,r===H&&(b=R,m-=w[E]-o.height,m*=a?1:-1),r===$&&(v=W,u-=w[_]-o.width,u*=a?1:-1)}var O,x=Object.assign({position:s},c&&Ce)
return a?Object.assign({},x,((O={})[b]=g?"0":"",O[v]=h?"0":"",O.transform=(y.devicePixelRatio||1)<2?"translate("+u+"px, "+m+"px)":"translate3d("+u+"px, "+m+"px, 0)",O)):Object.assign({},x,((t={})[b]=g?m+"px":"",t[v]=h?u+"px":"",t.transform="",t))}var Pe={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,o=n.gpuAcceleration,r=void 0===o||o,i=n.adaptive,s=void 0===i||i,a=n.roundOffsets,c=void 0===a||a,l={placement:he(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:r}
null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,Me(Object.assign({},l,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:c})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,Me(Object.assign({},l,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},qe={passive:!0},Be={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,o=e.options,r=o.scroll,i=void 0===r||r,s=o.resize,a=void 0===s||s,c=fe(t.elements.popper),l=[].concat(t.scrollParents.reference,t.scrollParents.popper)
return i&&l.forEach((function(e){e.addEventListener("scroll",n.update,qe)})),a&&c.addEventListener("resize",n.update,qe),function(){i&&l.forEach((function(e){e.removeEventListener("scroll",n.update,qe)})),a&&c.removeEventListener("resize",n.update,qe)}},data:{}},Ie={left:"right",right:"left",bottom:"top",top:"bottom"}
function He(e){return e.replace(/left|right|bottom|top/g,(function(e){return Ie[e]}))}var Re={start:"end",end:"start"}
function We(e){return e.replace(/start|end/g,(function(e){return Re[e]}))}function $e(e){var t=fe(e)
return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function Ke(e){return ge(Ee(e)).left+$e(e).scrollLeft}function Ue(e){var t=ye(e),n=t.overflow,o=t.overflowX,r=t.overflowY
return/auto|scroll|overlay|hidden/.test(n+r+o)}function Ve(e){return["html","body","#document"].indexOf(le(e))>=0?e.ownerDocument.body:ue(e)&&Ue(e)?e:Ve(_e(e))}function Ye(e,t){var n
void 0===t&&(t=[])
var o=Ve(e),r=o===(null==(n=e.ownerDocument)?void 0:n.body),i=fe(o),s=r?[i].concat(i.visualViewport||[],Ue(o)?o:[]):o,a=t.concat(s)
return r?a:a.concat(Ye(_e(s)))}function ze(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Fe(e,t){return t===F?ze(function(e){var t=fe(e),n=Ee(e),o=t.visualViewport,r=n.clientWidth,i=n.clientHeight,s=0,a=0
return o&&(r=o.width,i=o.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(s=o.offsetLeft,a=o.offsetTop)),{width:r,height:i,x:s+Ke(e),y:a}}(e)):ue(t)?function(e){var t=ge(e)
return t.top=t.top+e.clientTop,t.left=t.left+e.clientLeft,t.bottom=t.top+e.clientHeight,t.right=t.left+e.clientWidth,t.width=e.clientWidth,t.height=e.clientHeight,t.x=t.left,t.y=t.top,t}(t):ze(function(e){var t,n=Ee(e),o=$e(e),r=null==(t=e.ownerDocument)?void 0:t.body,i=Le(n.scrollWidth,n.clientWidth,r?r.scrollWidth:0,r?r.clientWidth:0),s=Le(n.scrollHeight,n.clientHeight,r?r.scrollHeight:0,r?r.clientHeight:0),a=-o.scrollLeft+Ke(e),c=-o.scrollTop
return"rtl"===ye(r||n).direction&&(a+=Le(n.clientWidth,r?r.clientWidth:0)-i),{width:i,height:s,x:a,y:c}}(Ee(e)))}function Qe(e,t,n){var o="clippingParents"===t?function(e){var t=Ye(_e(e)),n=["absolute","fixed"].indexOf(ye(e).position)>=0&&ue(e)?xe(e):e
return de(n)?t.filter((function(e){return de(e)&&be(e,n)&&"body"!==le(e)})):[]}(e):[].concat(t),r=[].concat(o,[n]),i=r[0],s=r.reduce((function(t,n){var o=Fe(e,n)
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
switch(s){case V:t[l]=t[l]-(n[f]/2-o[f]/2)
break
case Y:t[l]=t[l]+(n[f]/2-o[f]/2)}}return t}function Je(e,t){void 0===t&&(t={})
var n=t,o=n.placement,r=void 0===o?e.placement:o,i=n.boundary,s=void 0===i?z:i,a=n.rootBoundary,c=void 0===a?F:a,l=n.elementContext,f=void 0===l?Q:l,d=n.altBoundary,u=void 0!==d&&d,p=n.padding,m=void 0===p?0:p,h=ke("number"!=typeof m?m:Te(m,U)),g=f===Q?X:Q,v=e.elements.reference,b=e.rects.popper,y=e.elements[u?g:f],w=Qe(de(y)?y:y.contextElement||Ee(e.elements.popper),s,c),E=ge(v),_=Ge({reference:E,element:b,strategy:"absolute",placement:r}),O=ze(Object.assign({},b,_)),x=f===Q?O:E,j={top:w.top-x.top+h.top,bottom:x.bottom-w.bottom+h.bottom,left:w.left-x.left+h.left,right:x.right-w.right+h.right},L=e.modifiersData.offset
if(f===Q&&L){var A=L[r]
Object.keys(j).forEach((function(e){var t=[W,R].indexOf(e)>=0?1:-1,n=[H,R].indexOf(e)>=0?"y":"x"
j[e]+=A[n]*t}))}return j}function Ze(e,t){void 0===t&&(t={})
var n=t,o=n.placement,r=n.boundary,i=n.rootBoundary,s=n.padding,a=n.flipVariations,c=n.allowedAutoPlacements,l=void 0===c?J:c,f=Xe(o),d=f?a?G:G.filter((function(e){return Xe(e)===f})):U,u=d.filter((function(e){return l.indexOf(e)>=0}))
0===u.length&&(u=d)
var p=u.reduce((function(t,n){return t[n]=Je(e,{placement:n,boundary:r,rootBoundary:i,padding:s})[he(n)],t}),{})
return Object.keys(p).sort((function(e,t){return p[e]-p[t]}))}var et={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,o=e.name
if(!t.modifiersData[o]._skip){for(var r=n.mainAxis,i=void 0===r||r,s=n.altAxis,a=void 0===s||s,c=n.fallbackPlacements,l=n.padding,f=n.boundary,d=n.rootBoundary,u=n.altBoundary,p=n.flipVariations,m=void 0===p||p,h=n.allowedAutoPlacements,g=t.options.placement,v=he(g),b=c||(v!==g&&m?function(e){if(he(e)===K)return[]
var t=He(e)
return[We(e),t,We(t)]}(g):[He(g)]),y=[g].concat(b).reduce((function(e,n){return e.concat(he(n)===K?Ze(t,{placement:n,boundary:f,rootBoundary:d,padding:l,flipVariations:m,allowedAutoPlacements:h}):n)}),[]),w=t.rects.reference,E=t.rects.popper,_=new Map,O=!0,x=y[0],j=0;j<y.length;j++){var L=y[j],A=he(L),N=Xe(L)===V,D=[H,R].indexOf(A)>=0,k=D?"width":"height",T=Je(t,{placement:L,boundary:f,rootBoundary:d,altBoundary:u,padding:l}),S=D?N?W:$:N?R:H
w[k]>E[k]&&(S=He(S))
var C=He(S),M=[]
if(i&&M.push(T[A]<=0),a&&M.push(T[S]<=0,T[C]<=0),M.every((function(e){return e}))){x=L,O=!1
break}_.set(L,M)}if(O)for(var P=function(e){var t=y.find((function(t){var n=_.get(t)
if(n)return n.slice(0,e).every((function(e){return e}))}))
if(t)return x=t,"break"},q=m?3:1;q>0&&"break"!==P(q);q--);t.placement!==x&&(t.modifiersData[o]._skip=!0,t.placement=x,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}}
function tt(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function nt(e){return[H,W,R,$].some((function(t){return e[t]>=0}))}var ot={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,o=t.rects.reference,r=t.rects.popper,i=t.modifiersData.preventOverflow,s=Je(t,{elementContext:"reference"}),a=Je(t,{altBoundary:!0}),c=tt(s,o),l=tt(a,r,i),f=nt(c),d=nt(l)
t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:l,isReferenceHidden:f,hasPopperEscaped:d},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":f,"data-popper-escaped":d})}},rt={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,o=e.name,r=n.offset,i=void 0===r?[0,0]:r,s=J.reduce((function(e,n){return e[n]=function(e,t,n){var o=he(e),r=[$,H].indexOf(o)>=0?-1:1,i="function"==typeof n?n(Object.assign({},t,{placement:e})):n,s=i[0],a=i[1]
return s=s||0,a=(a||0)*r,[$,W].indexOf(o)>=0?{x:a,y:s}:{x:s,y:a}}(n,t.rects,i),e}),{}),a=s[t.placement],c=a.x,l=a.y
null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=l),t.modifiersData[o]=s}},it={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name
t.modifiersData[n]=Ge({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},st={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,o=e.name,r=n.mainAxis,i=void 0===r||r,s=n.altAxis,a=void 0!==s&&s,c=n.boundary,l=n.rootBoundary,f=n.altBoundary,d=n.padding,u=n.tether,p=void 0===u||u,m=n.tetherOffset,h=void 0===m?0:m,g=Je(t,{boundary:c,rootBoundary:l,padding:d,altBoundary:f}),v=he(t.placement),b=Xe(t.placement),y=!b,w=je(v),E="x"===w?"y":"x",_=t.modifiersData.popperOffsets,O=t.rects.reference,x=t.rects.popper,j="function"==typeof h?h(Object.assign({},t.rects,{placement:t.placement})):h,L={x:0,y:0}
if(_){if(i||a){var A="y"===w?H:$,N="y"===w?R:W,D="y"===w?"height":"width",k=_[w],T=_[w]+g[A],S=_[w]-g[N],C=p?-x[D]/2:0,M=b===V?O[D]:x[D],P=b===V?-x[D]:-O[D],q=t.elements.arrow,B=p&&q?ve(q):{width:0,height:0},I=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},K=I[A],U=I[N],Y=De(0,O[D],B[D]),z=y?O[D]/2-C-Y-K-j:M-Y-K-j,F=y?-O[D]/2+C+Y+U+j:P+Y+U+j,Q=t.elements.arrow&&xe(t.elements.arrow),X=Q?"y"===w?Q.clientTop||0:Q.clientLeft||0:0,G=t.modifiersData.offset?t.modifiersData.offset[t.placement][w]:0,J=_[w]+z-G-X,Z=_[w]+F-G
if(i){var ee=De(p?Ae(T,J):T,k,p?Le(S,Z):S)
_[w]=ee,L[w]=ee-k}if(a){var te="x"===w?H:$,ne="x"===w?R:W,oe=_[E],re=oe+g[te],ie=oe-g[ne],se=De(p?Ae(re,J):re,oe,p?Le(ie,Z):ie)
_[E]=se,L[E]=se-oe}}t.modifiersData[o]=L}},requiresIfExists:["offset"]}
function at(e,t,n){void 0===n&&(n=!1)
var o,r,i=Ee(t),s=ge(e),a=ue(t),c={scrollLeft:0,scrollTop:0},l={x:0,y:0}
return(a||!a&&!n)&&(("body"!==le(t)||Ue(i))&&(c=(o=t)!==fe(o)&&ue(o)?{scrollLeft:(r=o).scrollLeft,scrollTop:r.scrollTop}:$e(o)),ue(t)?((l=ge(t)).x+=t.clientLeft,l.y+=t.clientTop):i&&(l.x=Ke(i))),{x:s.left+c.scrollLeft-l.x,y:s.top+c.scrollTop-l.y,width:s.width,height:s.height}}function ct(e){var t=new Map,n=new Set,o=[]
function r(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var o=t.get(e)
o&&r(o)}})),o.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||r(e)})),o}var lt={placement:"bottom",modifiers:[],strategy:"absolute"}
function ft(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n]
return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function dt(e){void 0===e&&(e={})
var t=e,n=t.defaultModifiers,o=void 0===n?[]:n,r=t.defaultOptions,i=void 0===r?lt:r
return function(e,t,n){void 0===n&&(n=i)
var r,s,a={placement:"bottom",orderedModifiers:[],options:Object.assign({},lt,i),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},c=[],l=!1,f={state:a,setOptions:function(n){d(),a.options=Object.assign({},i,a.options,n),a.scrollParents={reference:de(e)?Ye(e):e.contextElement?Ye(e.contextElement):[],popper:Ye(t)}
var r,s,l=function(e){var t=ct(e)
return ce.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}((r=[].concat(o,a.options.modifiers),s=r.reduce((function(e,t){var n=e[t.name]
return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{}),Object.keys(s).map((function(e){return s[e]}))))
return a.orderedModifiers=l.filter((function(e){return e.enabled})),a.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,o=void 0===n?{}:n,r=e.effect
if("function"==typeof r){var i=r({state:a,name:t,instance:f,options:o}),s=function(){}
c.push(i||s)}})),f.update()},forceUpdate:function(){if(!l){var e=a.elements,t=e.reference,n=e.popper
if(ft(t,n)){a.rects={reference:at(t,xe(n),"fixed"===a.options.strategy),popper:ve(n)},a.reset=!1,a.placement=a.options.placement,a.orderedModifiers.forEach((function(e){return a.modifiersData[e.name]=Object.assign({},e.data)}))
for(var o=0;o<a.orderedModifiers.length;o++)if(!0!==a.reset){var r=a.orderedModifiers[o],i=r.fn,s=r.options,c=void 0===s?{}:s,d=r.name
"function"==typeof i&&(a=i({state:a,options:c,name:d,instance:f})||a)}else a.reset=!1,o=-1}}},update:(r=function(){return new Promise((function(e){f.forceUpdate(),e(a)}))},function(){return s||(s=new Promise((function(e){Promise.resolve().then((function(){s=void 0,e(r())}))}))),s}),destroy:function(){d(),l=!0}}
if(!ft(e,t))return f
function d(){c.forEach((function(e){return e()})),c=[]}return f.setOptions(n).then((function(e){!l&&n.onFirstUpdate&&n.onFirstUpdate(e)})),f}}var ut=dt(),pt=dt({defaultModifiers:[Be,it,Pe,me]}),mt=dt({defaultModifiers:[Be,it,Pe,me,rt,et,st,Se,ot]}),ht=Object.freeze({__proto__:null,popperGenerator:dt,detectOverflow:Je,createPopperBase:ut,createPopper:mt,createPopperLite:pt,top:H,bottom:R,right:W,left:$,auto:K,basePlacements:U,start:V,end:Y,clippingParents:z,viewport:F,popper:Q,reference:X,variationPlacements:G,placements:J,beforeRead:Z,read:ee,afterRead:te,beforeMain:ne,main:oe,afterMain:re,beforeWrite:ie,write:se,afterWrite:ae,modifierPhases:ce,applyStyles:me,arrow:Se,computeStyles:Pe,eventListeners:Be,flip:et,hide:ot,offset:rt,popperOffsets:it,preventOverflow:st})
function gt(e){return"true"===e||"false"!==e&&(e===Number(e).toString()?Number(e):""===e||"null"===e?null:e)}function vt(e){return e.replace(/[A-Z]/g,(e=>`-${e.toLowerCase()}`))}const bt={setDataAttribute(e,t,n){e.setAttribute(`data-bs-${vt(t)}`,n)},removeDataAttribute(e,t){e.removeAttribute(`data-bs-${vt(t)}`)},getDataAttributes(e){if(!e)return{}
const t={}
return Object.keys(e.dataset).filter((e=>e.startsWith("bs"))).forEach((n=>{let o=n.replace(/^bs/,"")
o=o.charAt(0).toLowerCase()+o.slice(1,o.length),t[o]=gt(e.dataset[n])})),t},getDataAttribute:(e,t)=>gt(e.getAttribute(`data-bs-${vt(t)}`)),offset(e){const t=e.getBoundingClientRect()
return{top:t.top+document.body.scrollTop,left:t.left+document.body.scrollLeft}},position:e=>({top:e.offsetTop,left:e.offsetLeft})},yt="dropdown",wt="bs.dropdown",Et="Escape",_t="Space",Ot="ArrowUp",xt="ArrowDown",jt=new RegExp("ArrowUp|ArrowDown|Escape"),Lt="click.bs.dropdown.data-api",At="keydown.bs.dropdown.data-api",Nt="show",Dt='[data-bs-toggle="dropdown"]',kt=".dropdown-menu",Tt=f()?"top-end":"top-start",St=f()?"top-start":"top-end",Ct=f()?"bottom-end":"bottom-start",Mt=f()?"bottom-start":"bottom-end",Pt=f()?"left-start":"right-start",qt=f()?"right-start":"left-start",Bt={offset:[0,2],boundary:"clippingParents",reference:"toggle",display:"dynamic",popperConfig:null,autoClose:!0},It={offset:"(array|string|function)",boundary:"(string|element)",reference:"(string|element|object)",display:"string",popperConfig:"(null|object|function)",autoClose:"(boolean|string)"}
class Ht extends T{constructor(e,t){super(e),this._popper=null,this._config=this._getConfig(t),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}static get Default(){return Bt}static get DefaultType(){return It}static get NAME(){return yt}toggle(){a(this._element)||(this._element.classList.contains(Nt)?this.hide():this.show())}show(){if(a(this._element)||this._menu.classList.contains(Nt))return
const e=Ht.getParentFromElement(this._element),t={relatedTarget:this._element}
if(!k.trigger(this._element,"show.bs.dropdown",t).defaultPrevented){if(this._inNavbar)bt.setDataAttribute(this._menu,"popper","none")
else{if(void 0===ht)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)")
let t=this._element
"parent"===this._config.reference?t=e:o(this._config.reference)?t=r(this._config.reference):"object"==typeof this._config.reference&&(t=this._config.reference)
const n=this._getPopperConfig(),i=n.modifiers.find((e=>"applyStyles"===e.name&&!1===e.enabled))
this._popper=mt(t,this._menu,n),i&&bt.setDataAttribute(this._menu,"popper","static")}"ontouchstart"in document.documentElement&&!e.closest(".navbar-nav")&&[].concat(...document.body.children).forEach((e=>k.on(e,"mouseover",c))),this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.toggle(Nt),this._element.classList.toggle(Nt),k.trigger(this._element,"shown.bs.dropdown",t)}}hide(){if(a(this._element)||!this._menu.classList.contains(Nt))return
const e={relatedTarget:this._element}
this._completeHide(e)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_addEventListeners(){k.on(this._element,"click.bs.dropdown",(e=>{e.preventDefault(),this.toggle()}))}_completeHide(e){k.trigger(this._element,"hide.bs.dropdown",e).defaultPrevented||("ontouchstart"in document.documentElement&&[].concat(...document.body.children).forEach((e=>k.off(e,"mouseover",c))),this._popper&&this._popper.destroy(),this._menu.classList.remove(Nt),this._element.classList.remove(Nt),this._element.setAttribute("aria-expanded","false"),bt.removeDataAttribute(this._menu,"popper"),k.trigger(this._element,"hidden.bs.dropdown",e))}_getConfig(e){if(e={...this.constructor.Default,...bt.getDataAttributes(this._element),...e},((e,t,n)=>{Object.keys(n).forEach((r=>{const i=n[r],s=t[r],a=s&&o(s)?"element":null==(c=s)?`${c}`:{}.toString.call(c).match(/\s([a-z]+)/i)[1].toLowerCase()
var c
if(!new RegExp(i).test(a))throw new TypeError(`${e.toUpperCase()}: Option "${r}" provided type "${a}" but expected type "${i}".`)}))})(yt,e,this.constructor.DefaultType),"object"==typeof e.reference&&!o(e.reference)&&"function"!=typeof e.reference.getBoundingClientRect)throw new TypeError(`${yt.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`)
return e}_getMenuElement(){return e.next(this._element,kt)[0]}_getPlacement(){const e=this._element.parentNode
if(e.classList.contains("dropend"))return Pt
if(e.classList.contains("dropstart"))return qt
const t="end"===getComputedStyle(this._menu).getPropertyValue("--bs-position").trim()
return e.classList.contains("dropup")?t?St:Tt:t?Mt:Ct}_detectNavbar(){return null!==this._element.closest(".navbar")}_getOffset(){const{offset:e}=this._config
return"string"==typeof e?e.split(",").map((e=>Number.parseInt(e,10))):"function"==typeof e?t=>e(t,this._element):e}_getPopperConfig(){const e={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]}
return"static"===this._config.display&&(e.modifiers=[{name:"applyStyles",enabled:!1}]),{...e,..."function"==typeof this._config.popperConfig?this._config.popperConfig(e):this._config.popperConfig}}_selectMenuItem(t){const n=e.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",this._menu).filter(s)
if(!n.length)return
let o=n.indexOf(t.target)
t.key===Ot&&o>0&&o--,t.key===xt&&o<n.length-1&&o++,o=-1===o?0:o,n[o].focus()}static dropdownInterface(e,t){let n=m.get(e,wt)
if(n||(n=new Ht(e,"object"==typeof t?t:null)),"string"==typeof t){if(void 0===n[t])throw new TypeError(`No method named "${t}"`)
n[t]()}}static jQueryInterface(e){return this.each((function(){Ht.dropdownInterface(this,e)}))}static clearMenus(t){if(t&&(2===t.button||"keyup"===t.type&&"Tab"!==t.key))return
const n=e.find(Dt)
for(let e=0,o=n.length;e<o;e++){const o=m.get(n[e],wt)
if(!o||!1===o._config.autoClose)continue
if(!o._element.classList.contains(Nt))continue
const r={relatedTarget:o._element}
if(t){const e=t.composedPath(),n=e.includes(o._menu)
if(e.includes(o._element)||"inside"===o._config.autoClose&&!n||"outside"===o._config.autoClose&&n)continue
if(o._menu.contains(t.target)&&("keyup"===t.type&&"Tab"===t.key||/input|select|option|textarea|form/i.test(t.target.tagName)))continue
"click"===t.type&&(r.clickEvent=t)}o._completeHide(r)}}static getParentFromElement(e){return n(e)||e.parentNode}static dataApiKeydownHandler(t){if(/input|textarea/i.test(t.target.tagName)?t.key===_t||t.key!==Et&&(t.key!==xt&&t.key!==Ot||t.target.closest(kt)):!jt.test(t.key))return
const n=this.classList.contains(Nt)
if(!n&&t.key===Et)return
if(t.preventDefault(),t.stopPropagation(),a(this))return
const o=()=>this.matches(Dt)?this:e.prev(this,Dt)[0]
if(t.key===Et)return o().focus(),void Ht.clearMenus()
n||t.key!==Ot&&t.key!==xt?n&&t.key!==_t?Ht.getInstance(o())._selectMenuItem(t):Ht.clearMenus():o().click()}}k.on(document,At,Dt,Ht.dataApiKeydownHandler),k.on(document,At,kt,Ht.dataApiKeydownHandler),k.on(document,Lt,Ht.clearMenus),k.on(document,"keyup.bs.dropdown.data-api",Ht.clearMenus),k.on(document,Lt,Dt,(function(e){e.preventDefault(),Ht.dropdownInterface(this)})),d(Ht),document.addEventListener("DOMContentLoaded",(function(){if(document.getElementById("prism-css").media="all",document.getElementById("toggle-offcanvas").addEventListener("click",(function(){document.body.classList.toggle("offcanvas-open")})),0!=document.querySelectorAll(".demo").length&&!document.getElementById("select-theme")){var e=window.themes||["bootstrap5","bootstrap4","bootstrap3","default"],t={bootstrap5:"Bootstrap 5",bootstrap4:"Bootstrap 4",bootstrap3:"Bootstrap 3",default:"Default"},n=localStorage.getItem("theme");-1==e.indexOf(n)&&(n="bootstrap5")
var o=document.createElement("input")
o.classList.add("theme-selector-input")
var r=document.getElementById("main-container")
document.querySelectorAll(".demo-mini").length||(r.insertBefore(o,r.firstChild),new TomSelect(o,{maxItems:1,controlInput:"<input>",plugins:["no_backspace_delete"],options:e.map((n=>-1!=e.indexOf(n)&&{text:t[n],value:n})),items:[n],render:{item:(e,t)=>"<div>Theme: "+t(e.text)+"</div>"},onChange:e=>{i(e)}})),i(n),document.addEventListener("click",(e=>{var t=e.target.closest(".opensandbox")
if(t){var n,o=t.closest(".demo")
function r(e){var t=o.querySelector(e)
return t&&t.textContent||""}var i=`<div class="p-4">${o.querySelector("textarea").value||""}</div>`,s=r("style"),a=r("script"),c=[`https://cdn.jsdelivr.net/gh/orchidjs/tom-select@1.7.2/dist/css/tom-select.${localStorage.getItem("theme")||"bootstrap4"}.min.css`,"https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/css/bootstrap.min.css","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"],l=["https://cdn.jsdelivr.net/gh/orchidjs/tom-select@1.7.2/dist/js/tom-select.complete.min.js"]
o.classList.contains("demo-jquery")&&(l.push("https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js"),l.push("https://cdn.jsdelivr.net/npm/jquery-ui-dist@1.12.1/jquery-ui.js")),n={html:i,js:a,css:s,js_external:l.join(";"),css_external:c.join(";")},o.querySelector(".codepen").value=JSON.stringify(n),o.querySelector(".jsfiddle-html").value=i,o.querySelector(".jsfiddle-js").value=a,o.querySelector(".jsfiddle-css").value=s,o.querySelector(".jsfiddle-resources").value=l.join(",")+","+c.join(","),setTimeout((()=>{t.nextElementSibling.submit()}),50)}}))}function i(t){if(-1!=e.indexOf(t)){localStorage.setItem("theme",t)
var n=document.getElementById("select-theme")
n&&n.parentNode.removeChild(n),(n=document.createElement("link")).id="select-theme",n.setAttribute("rel","stylesheet"),n.setAttribute("href","/css/tom-select."+t+".css"),document.getElementsByTagName("head")[0].appendChild(n)}}}))},"function"==typeof define&&define.amd?define(e):e()
//# sourceMappingURL=index.bundle.js.map
