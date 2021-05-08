var e
e=function(){"use strict"
const e="transitionend",t=e=>{const t=(e=>{let t=e.getAttribute("data-bs-target")
if(!t||"#"===t){let n=e.getAttribute("href")
if(!n||!n.includes("#")&&!n.startsWith("."))return null
n.includes("#")&&!n.startsWith("#")&&(n=`#${n.split("#")[1]}`),t=n&&"#"!==n?n.trim():null}return t})(e)
return t?document.querySelector(t):null},n=e=>(e[0]||e).nodeType,r=(t,n)=>{let r=!1
const o=n+5
t.addEventListener(e,(function n(){r=!0,t.removeEventListener(e,n)})),setTimeout((()=>{r||(t=>{t.dispatchEvent(new Event(e))})(t)}),o)},o=e=>{if(!e)return!1
if(e.style&&e.parentNode&&e.parentNode.style){const t=getComputedStyle(e),n=getComputedStyle(e.parentNode)
return"none"!==t.display&&"none"!==n.display&&"hidden"!==t.visibility}return!1},i=e=>!e||e.nodeType!==Node.ELEMENT_NODE||!!e.classList.contains("disabled")||(void 0!==e.disabled?e.disabled:e.hasAttribute("disabled")&&"false"!==e.getAttribute("disabled")),s=()=>{},a=()=>{const{jQuery:e}=window
return e&&!document.body.hasAttribute("data-bs-no-jquery")?e:null},c=()=>"rtl"===document.documentElement.dir,l=(e,t)=>{var n
n=()=>{const n=a()
if(n){const r=n.fn[e]
n.fn[e]=t.jQueryInterface,n.fn[e].Constructor=t,n.fn[e].noConflict=()=>(n.fn[e]=r,t.jQueryInterface)}},"loading"===document.readyState?document.addEventListener("DOMContentLoaded",n):n()},f=new Map
var d={set(e,t,n){f.has(e)||f.set(e,new Map)
const r=f.get(e)
r.has(t)||0===r.size?r.set(t,n):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`)},get:(e,t)=>f.has(e)&&f.get(e).get(t)||null,remove(e,t){if(!f.has(e))return
const n=f.get(e)
n.delete(t),0===n.size&&f.delete(e)}}
const u=/[^.]*(?=\..*)\.|.*/,p=/\..*/,m=/::\d+$/,h={}
let g=1
const v={mouseenter:"mouseover",mouseleave:"mouseout"},b=/^(mouseenter|mouseleave)/i,y=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"])
function w(e,t){return t&&`${t}::${g++}`||e.uidEvent||g++}function _(e){const t=w(e)
return e.uidEvent=t,h[t]=h[t]||{},h[t]}function E(e,t,n=null){const r=Object.keys(e)
for(let o=0,i=r.length;o<i;o++){const i=e[r[o]]
if(i.originalHandler===t&&i.delegationSelector===n)return i}return null}function O(e,t,n){const r="string"==typeof t,o=r?n:t
let i=L(e)
return y.has(i)||(i=e),[r,o,i]}function x(e,t,n,r,o){if("string"!=typeof t||!e)return
if(n||(n=r,r=null),b.test(t)){const e=e=>function(t){if(!t.relatedTarget||t.relatedTarget!==t.delegateTarget&&!t.delegateTarget.contains(t.relatedTarget))return e.call(this,t)}
r?r=e(r):n=e(n)}const[i,s,a]=O(t,n,r),c=_(e),l=c[a]||(c[a]={}),f=E(l,s,i?n:null)
if(f)return void(f.oneOff=f.oneOff&&o)
const d=w(s,t.replace(u,"")),p=i?function(e,t,n){return function r(o){const i=e.querySelectorAll(t)
for(let{target:s}=o;s&&s!==this;s=s.parentNode)for(let a=i.length;a--;)if(i[a]===s)return o.delegateTarget=s,r.oneOff&&A.off(e,o.type,t,n),n.apply(s,[o])
return null}}(e,n,r):function(e,t){return function n(r){return r.delegateTarget=e,n.oneOff&&A.off(e,r.type,t),t.apply(e,[r])}}(e,n)
p.delegationSelector=i?n:null,p.originalHandler=s,p.oneOff=o,p.uidEvent=d,l[d]=p,e.addEventListener(a,p,i)}function j(e,t,n,r,o){const i=E(t[n],r,o)
i&&(e.removeEventListener(n,i,Boolean(o)),delete t[n][i.uidEvent])}function L(e){return e=e.replace(p,""),v[e]||e}const A={on(e,t,n,r){x(e,t,n,r,!1)},one(e,t,n,r){x(e,t,n,r,!0)},off(e,t,n,r){if("string"!=typeof t||!e)return
const[o,i,s]=O(t,n,r),a=s!==t,c=_(e),l=t.startsWith(".")
if(void 0!==i){if(!c||!c[s])return
return void j(e,c,s,i,o?n:null)}l&&Object.keys(c).forEach((n=>{!function(e,t,n,r){const o=t[n]||{}
Object.keys(o).forEach((i=>{if(i.includes(r)){const r=o[i]
j(e,t,n,r.originalHandler,r.delegationSelector)}}))}(e,c,n,t.slice(1))}))
const f=c[s]||{}
Object.keys(f).forEach((n=>{const r=n.replace(m,"")
if(!a||t.includes(r)){const t=f[n]
j(e,c,s,t.originalHandler,t.delegationSelector)}}))},trigger(e,t,n){if("string"!=typeof t||!e)return null
const r=a(),o=L(t),i=t!==o,s=y.has(o)
let c,l=!0,f=!0,d=!1,u=null
return i&&r&&(c=r.Event(t,n),r(e).trigger(c),l=!c.isPropagationStopped(),f=!c.isImmediatePropagationStopped(),d=c.isDefaultPrevented()),s?(u=document.createEvent("HTMLEvents"),u.initEvent(o,l,!0)):u=new CustomEvent(t,{bubbles:l,cancelable:!0}),void 0!==n&&Object.keys(n).forEach((e=>{Object.defineProperty(u,e,{get:()=>n[e]})})),d&&u.preventDefault(),f&&e.dispatchEvent(u),u.defaultPrevented&&void 0!==c&&c.preventDefault(),u}},D={find:(e,t=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(t,e)),findOne:(e,t=document.documentElement)=>Element.prototype.querySelector.call(t,e),children:(e,t)=>[].concat(...e.children).filter((e=>e.matches(t))),parents(e,t){const n=[]
let r=e.parentNode
for(;r&&r.nodeType===Node.ELEMENT_NODE&&3!==r.nodeType;)r.matches(t)&&n.push(r),r=r.parentNode
return n},prev(e,t){let n=e.previousElementSibling
for(;n;){if(n.matches(t))return[n]
n=n.previousElementSibling}return[]},next(e,t){let n=e.nextElementSibling
for(;n;){if(n.matches(t))return[n]
n=n.nextElementSibling}return[]}}
class k{constructor(e){(e="string"==typeof e?document.querySelector(e):e)&&(this._element=e,d.set(this._element,this.constructor.DATA_KEY,this))}dispose(){d.remove(this._element,this.constructor.DATA_KEY),A.off(this._element,`.${this.constructor.DATA_KEY}`),this._element=null}static getInstance(e){return d.get(e,this.DATA_KEY)}static get VERSION(){return"5.0.0"}}const N="bs.tab",T="active",S="fade",C="show",P=".active",M=":scope > li > .active"
class q extends k{static get DATA_KEY(){return N}show(){if(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&this._element.classList.contains(T))return
let e
const n=t(this._element),r=this._element.closest(".nav, .list-group")
if(r){const t="UL"===r.nodeName||"OL"===r.nodeName?M:P
e=D.find(t,r),e=e[e.length-1]}const o=e?A.trigger(e,"hide.bs.tab",{relatedTarget:this._element}):null
if(A.trigger(this._element,"show.bs.tab",{relatedTarget:e}).defaultPrevented||null!==o&&o.defaultPrevented)return
this._activate(this._element,r)
const i=()=>{A.trigger(e,"hidden.bs.tab",{relatedTarget:this._element}),A.trigger(this._element,"shown.bs.tab",{relatedTarget:e})}
n?this._activate(n,n.parentNode,i):i()}_activate(e,t,n){const o=(!t||"UL"!==t.nodeName&&"OL"!==t.nodeName?D.children(t,P):D.find(M,t))[0],i=n&&o&&o.classList.contains(S),s=()=>this._transitionComplete(e,o,n)
if(o&&i){const e=(e=>{if(!e)return 0
let{transitionDuration:t,transitionDelay:n}=window.getComputedStyle(e)
const r=Number.parseFloat(t),o=Number.parseFloat(n)
return r||o?(t=t.split(",")[0],n=n.split(",")[0],1e3*(Number.parseFloat(t)+Number.parseFloat(n))):0})(o)
o.classList.remove(C),A.one(o,"transitionend",s),r(o,e)}else s()}_transitionComplete(e,t,n){if(t){t.classList.remove(T)
const e=D.findOne(":scope > .dropdown-menu .active",t.parentNode)
e&&e.classList.remove(T),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!1)}e.classList.add(T),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!0),(e=>{e.offsetHeight})(e),e.classList.contains(S)&&e.classList.add(C)
let r=e.parentNode
if(r&&"LI"===r.nodeName&&(r=r.parentNode),r&&r.classList.contains("dropdown-menu")){const t=e.closest(".dropdown")
t&&D.find(".dropdown-toggle",t).forEach((e=>e.classList.add(T))),e.setAttribute("aria-expanded",!0)}n&&n()}static jQueryInterface(e){return this.each((function(){const t=d.get(this,N)||new q(this)
if("string"==typeof e){if(void 0===t[e])throw new TypeError(`No method named "${e}"`)
t[e]()}}))}}A.on(document,"click.bs.tab.data-api",'[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',(function(e){["A","AREA"].includes(this.tagName)&&e.preventDefault(),i(this)||(d.get(this,N)||new q(this)).show()})),l("tab",q)
var B="top",H="bottom",I="right",R="left",W="auto",$=[B,H,I,R],U="start",K="end",z="clippingParents",F="viewport",V="popper",Y="reference",Q=$.reduce((function(e,t){return e.concat([t+"-"+U,t+"-"+K])}),[]),X=[].concat($,[W]).reduce((function(e,t){return e.concat([t,t+"-"+U,t+"-"+K])}),[]),G="beforeRead",J="read",Z="afterRead",ee="beforeMain",te="main",ne="afterMain",re="beforeWrite",oe="write",ie="afterWrite",se=[G,J,Z,ee,te,ne,re,oe,ie]
function ae(e){return e?(e.nodeName||"").toLowerCase():null}function ce(e){if(null==e)return window
if("[object Window]"!==e.toString()){var t=e.ownerDocument
return t&&t.defaultView||window}return e}function le(e){return e instanceof ce(e).Element||e instanceof Element}function fe(e){return e instanceof ce(e).HTMLElement||e instanceof HTMLElement}function de(e){return"undefined"!=typeof ShadowRoot&&(e instanceof ce(e).ShadowRoot||e instanceof ShadowRoot)}var ue={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state
Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},r=t.attributes[e]||{},o=t.elements[e]
fe(o)&&ae(o)&&(Object.assign(o.style,n),Object.keys(r).forEach((function(e){var t=r[e]
!1===t?o.removeAttribute(e):o.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}}
return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var r=t.elements[e],o=t.attributes[e]||{},i=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{})
fe(r)&&ae(r)&&(Object.assign(r.style,i),Object.keys(o).forEach((function(e){r.removeAttribute(e)})))}))}},requires:["computeStyles"]}
function pe(e){return e.split("-")[0]}function me(e){var t=e.getBoundingClientRect()
return{width:t.width,height:t.height,top:t.top,right:t.right,bottom:t.bottom,left:t.left,x:t.left,y:t.top}}function he(e){var t=me(e),n=e.offsetWidth,r=e.offsetHeight
return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function ge(e,t){var n=t.getRootNode&&t.getRootNode()
if(e.contains(t))return!0
if(n&&de(n)){var r=t
do{if(r&&e.isSameNode(r))return!0
r=r.parentNode||r.host}while(r)}return!1}function ve(e){return ce(e).getComputedStyle(e)}function be(e){return["table","td","th"].indexOf(ae(e))>=0}function ye(e){return((le(e)?e.ownerDocument:e.document)||window.document).documentElement}function we(e){return"html"===ae(e)?e:e.assignedSlot||e.parentNode||(de(e)?e.host:null)||ye(e)}function _e(e){return fe(e)&&"fixed"!==ve(e).position?e.offsetParent:null}function Ee(e){for(var t=ce(e),n=_e(e);n&&be(n)&&"static"===ve(n).position;)n=_e(n)
return n&&("html"===ae(n)||"body"===ae(n)&&"static"===ve(n).position)?t:n||function(e){var t=-1!==navigator.userAgent.toLowerCase().indexOf("firefox")
if(-1!==navigator.userAgent.indexOf("Trident")&&fe(e)&&"fixed"===ve(e).position)return null
for(var n=we(e);fe(n)&&["html","body"].indexOf(ae(n))<0;){var r=ve(n)
if("none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||-1!==["transform","perspective"].indexOf(r.willChange)||t&&"filter"===r.willChange||t&&r.filter&&"none"!==r.filter)return n
n=n.parentNode}return null}(e)||t}function Oe(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}var xe=Math.max,je=Math.min,Le=Math.round
function Ae(e,t,n){return xe(e,je(t,n))}function De(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function ke(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}var Ne={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,s=n.modifiersData.popperOffsets,a=pe(n.placement),c=Oe(a),l=[R,I].indexOf(a)>=0?"height":"width"
if(i&&s){var f=function(e,t){return De("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:ke(e,$))}(o.padding,n),d=he(i),u="y"===c?B:R,p="y"===c?H:I,m=n.rects.reference[l]+n.rects.reference[c]-s[c]-n.rects.popper[l],h=s[c]-n.rects.reference[c],g=Ee(i),v=g?"y"===c?g.clientHeight||0:g.clientWidth||0:0,b=m/2-h/2,y=f[u],w=v-d[l]-f[p],_=v/2-d[l]/2+b,E=Ae(y,_,w),O=c
n.modifiersData[r]=((t={})[O]=E,t.centerOffset=E-_,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n
null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&ge(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]},Te={top:"auto",right:"auto",bottom:"auto",left:"auto"}
function Se(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.offsets,s=e.position,a=e.gpuAcceleration,c=e.adaptive,l=e.roundOffsets,f=!0===l?function(e){var t=e.x,n=e.y,r=window.devicePixelRatio||1
return{x:Le(Le(t*r)/r)||0,y:Le(Le(n*r)/r)||0}}(i):"function"==typeof l?l(i):i,d=f.x,u=void 0===d?0:d,p=f.y,m=void 0===p?0:p,h=i.hasOwnProperty("x"),g=i.hasOwnProperty("y"),v=R,b=B,y=window
if(c){var w=Ee(n),_="clientHeight",E="clientWidth"
w===ce(n)&&"static"!==ve(w=ye(n)).position&&(_="scrollHeight",E="scrollWidth"),w=w,o===B&&(b=H,m-=w[_]-r.height,m*=a?1:-1),o===R&&(v=I,u-=w[E]-r.width,u*=a?1:-1)}var O,x=Object.assign({position:s},c&&Te)
return a?Object.assign({},x,((O={})[b]=g?"0":"",O[v]=h?"0":"",O.transform=(y.devicePixelRatio||1)<2?"translate("+u+"px, "+m+"px)":"translate3d("+u+"px, "+m+"px, 0)",O)):Object.assign({},x,((t={})[b]=g?m+"px":"",t[v]=h?u+"px":"",t.transform="",t))}var Ce={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,s=void 0===i||i,a=n.roundOffsets,c=void 0===a||a,l={placement:pe(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o}
null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,Se(Object.assign({},l,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:c})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,Se(Object.assign({},l,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},Pe={passive:!0},Me={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=void 0===o||o,s=r.resize,a=void 0===s||s,c=ce(t.elements.popper),l=[].concat(t.scrollParents.reference,t.scrollParents.popper)
return i&&l.forEach((function(e){e.addEventListener("scroll",n.update,Pe)})),a&&c.addEventListener("resize",n.update,Pe),function(){i&&l.forEach((function(e){e.removeEventListener("scroll",n.update,Pe)})),a&&c.removeEventListener("resize",n.update,Pe)}},data:{}},qe={left:"right",right:"left",bottom:"top",top:"bottom"}
function Be(e){return e.replace(/left|right|bottom|top/g,(function(e){return qe[e]}))}var He={start:"end",end:"start"}
function Ie(e){return e.replace(/start|end/g,(function(e){return He[e]}))}function Re(e){var t=ce(e)
return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function We(e){return me(ye(e)).left+Re(e).scrollLeft}function $e(e){var t=ve(e),n=t.overflow,r=t.overflowX,o=t.overflowY
return/auto|scroll|overlay|hidden/.test(n+o+r)}function Ue(e){return["html","body","#document"].indexOf(ae(e))>=0?e.ownerDocument.body:fe(e)&&$e(e)?e:Ue(we(e))}function Ke(e,t){var n
void 0===t&&(t=[])
var r=Ue(e),o=r===(null==(n=e.ownerDocument)?void 0:n.body),i=ce(r),s=o?[i].concat(i.visualViewport||[],$e(r)?r:[]):r,a=t.concat(s)
return o?a:a.concat(Ke(we(s)))}function ze(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Fe(e,t){return t===F?ze(function(e){var t=ce(e),n=ye(e),r=t.visualViewport,o=n.clientWidth,i=n.clientHeight,s=0,a=0
return r&&(o=r.width,i=r.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(s=r.offsetLeft,a=r.offsetTop)),{width:o,height:i,x:s+We(e),y:a}}(e)):fe(t)?function(e){var t=me(e)
return t.top=t.top+e.clientTop,t.left=t.left+e.clientLeft,t.bottom=t.top+e.clientHeight,t.right=t.left+e.clientWidth,t.width=e.clientWidth,t.height=e.clientHeight,t.x=t.left,t.y=t.top,t}(t):ze(function(e){var t,n=ye(e),r=Re(e),o=null==(t=e.ownerDocument)?void 0:t.body,i=xe(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=xe(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),a=-r.scrollLeft+We(e),c=-r.scrollTop
return"rtl"===ve(o||n).direction&&(a+=xe(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:s,x:a,y:c}}(ye(e)))}function Ve(e,t,n){var r="clippingParents"===t?function(e){var t=Ke(we(e)),n=["absolute","fixed"].indexOf(ve(e).position)>=0&&fe(e)?Ee(e):e
return le(n)?t.filter((function(e){return le(e)&&ge(e,n)&&"body"!==ae(e)})):[]}(e):[].concat(t),o=[].concat(r,[n]),i=o[0],s=o.reduce((function(t,n){var r=Fe(e,n)
return t.top=xe(r.top,t.top),t.right=je(r.right,t.right),t.bottom=je(r.bottom,t.bottom),t.left=xe(r.left,t.left),t}),Fe(e,i))
return s.width=s.right-s.left,s.height=s.bottom-s.top,s.x=s.left,s.y=s.top,s}function Ye(e){return e.split("-")[1]}function Qe(e){var t,n=e.reference,r=e.element,o=e.placement,i=o?pe(o):null,s=o?Ye(o):null,a=n.x+n.width/2-r.width/2,c=n.y+n.height/2-r.height/2
switch(i){case B:t={x:a,y:n.y-r.height}
break
case H:t={x:a,y:n.y+n.height}
break
case I:t={x:n.x+n.width,y:c}
break
case R:t={x:n.x-r.width,y:c}
break
default:t={x:n.x,y:n.y}}var l=i?Oe(i):null
if(null!=l){var f="y"===l?"height":"width"
switch(s){case U:t[l]=t[l]-(n[f]/2-r[f]/2)
break
case K:t[l]=t[l]+(n[f]/2-r[f]/2)}}return t}function Xe(e,t){void 0===t&&(t={})
var n=t,r=n.placement,o=void 0===r?e.placement:r,i=n.boundary,s=void 0===i?z:i,a=n.rootBoundary,c=void 0===a?F:a,l=n.elementContext,f=void 0===l?V:l,d=n.altBoundary,u=void 0!==d&&d,p=n.padding,m=void 0===p?0:p,h=De("number"!=typeof m?m:ke(m,$)),g=f===V?Y:V,v=e.elements.reference,b=e.rects.popper,y=e.elements[u?g:f],w=Ve(le(y)?y:y.contextElement||ye(e.elements.popper),s,c),_=me(v),E=Qe({reference:_,element:b,strategy:"absolute",placement:o}),O=ze(Object.assign({},b,E)),x=f===V?O:_,j={top:w.top-x.top+h.top,bottom:x.bottom-w.bottom+h.bottom,left:w.left-x.left+h.left,right:x.right-w.right+h.right},L=e.modifiersData.offset
if(f===V&&L){var A=L[o]
Object.keys(j).forEach((function(e){var t=[I,H].indexOf(e)>=0?1:-1,n=[B,H].indexOf(e)>=0?"y":"x"
j[e]+=A[n]*t}))}return j}function Ge(e,t){void 0===t&&(t={})
var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,s=n.padding,a=n.flipVariations,c=n.allowedAutoPlacements,l=void 0===c?X:c,f=Ye(r),d=f?a?Q:Q.filter((function(e){return Ye(e)===f})):$,u=d.filter((function(e){return l.indexOf(e)>=0}))
0===u.length&&(u=d)
var p=u.reduce((function(t,n){return t[n]=Xe(e,{placement:n,boundary:o,rootBoundary:i,padding:s})[pe(n)],t}),{})
return Object.keys(p).sort((function(e,t){return p[e]-p[t]}))}var Je={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name
if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=void 0===o||o,s=n.altAxis,a=void 0===s||s,c=n.fallbackPlacements,l=n.padding,f=n.boundary,d=n.rootBoundary,u=n.altBoundary,p=n.flipVariations,m=void 0===p||p,h=n.allowedAutoPlacements,g=t.options.placement,v=pe(g),b=c||(v!==g&&m?function(e){if(pe(e)===W)return[]
var t=Be(e)
return[Ie(e),t,Ie(t)]}(g):[Be(g)]),y=[g].concat(b).reduce((function(e,n){return e.concat(pe(n)===W?Ge(t,{placement:n,boundary:f,rootBoundary:d,padding:l,flipVariations:m,allowedAutoPlacements:h}):n)}),[]),w=t.rects.reference,_=t.rects.popper,E=new Map,O=!0,x=y[0],j=0;j<y.length;j++){var L=y[j],A=pe(L),D=Ye(L)===U,k=[B,H].indexOf(A)>=0,N=k?"width":"height",T=Xe(t,{placement:L,boundary:f,rootBoundary:d,altBoundary:u,padding:l}),S=k?D?I:R:D?H:B
w[N]>_[N]&&(S=Be(S))
var C=Be(S),P=[]
if(i&&P.push(T[A]<=0),a&&P.push(T[S]<=0,T[C]<=0),P.every((function(e){return e}))){x=L,O=!1
break}E.set(L,P)}if(O)for(var M=function(e){var t=y.find((function(t){var n=E.get(t)
if(n)return n.slice(0,e).every((function(e){return e}))}))
if(t)return x=t,"break"},q=m?3:1;q>0&&"break"!==M(q);q--);t.placement!==x&&(t.modifiersData[r]._skip=!0,t.placement=x,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}}
function Ze(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function et(e){return[B,I,H,R].some((function(t){return e[t]>=0}))}var tt={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,s=Xe(t,{elementContext:"reference"}),a=Xe(t,{altBoundary:!0}),c=Ze(s,r),l=Ze(a,o,i),f=et(c),d=et(l)
t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:l,isReferenceHidden:f,hasPopperEscaped:d},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":f,"data-popper-escaped":d})}},nt={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=void 0===o?[0,0]:o,s=X.reduce((function(e,n){return e[n]=function(e,t,n){var r=pe(e),o=[R,B].indexOf(r)>=0?-1:1,i="function"==typeof n?n(Object.assign({},t,{placement:e})):n,s=i[0],a=i[1]
return s=s||0,a=(a||0)*o,[R,I].indexOf(r)>=0?{x:a,y:s}:{x:s,y:a}}(n,t.rects,i),e}),{}),a=s[t.placement],c=a.x,l=a.y
null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=l),t.modifiersData[r]=s}},rt={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name
t.modifiersData[n]=Qe({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},ot={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=void 0===o||o,s=n.altAxis,a=void 0!==s&&s,c=n.boundary,l=n.rootBoundary,f=n.altBoundary,d=n.padding,u=n.tether,p=void 0===u||u,m=n.tetherOffset,h=void 0===m?0:m,g=Xe(t,{boundary:c,rootBoundary:l,padding:d,altBoundary:f}),v=pe(t.placement),b=Ye(t.placement),y=!b,w=Oe(v),_="x"===w?"y":"x",E=t.modifiersData.popperOffsets,O=t.rects.reference,x=t.rects.popper,j="function"==typeof h?h(Object.assign({},t.rects,{placement:t.placement})):h,L={x:0,y:0}
if(E){if(i||a){var A="y"===w?B:R,D="y"===w?H:I,k="y"===w?"height":"width",N=E[w],T=E[w]+g[A],S=E[w]-g[D],C=p?-x[k]/2:0,P=b===U?O[k]:x[k],M=b===U?-x[k]:-O[k],q=t.elements.arrow,W=p&&q?he(q):{width:0,height:0},$=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},K=$[A],z=$[D],F=Ae(0,O[k],W[k]),V=y?O[k]/2-C-F-K-j:P-F-K-j,Y=y?-O[k]/2+C+F+z+j:M+F+z+j,Q=t.elements.arrow&&Ee(t.elements.arrow),X=Q?"y"===w?Q.clientTop||0:Q.clientLeft||0:0,G=t.modifiersData.offset?t.modifiersData.offset[t.placement][w]:0,J=E[w]+V-G-X,Z=E[w]+Y-G
if(i){var ee=Ae(p?je(T,J):T,N,p?xe(S,Z):S)
E[w]=ee,L[w]=ee-N}if(a){var te="x"===w?B:R,ne="x"===w?H:I,re=E[_],oe=re+g[te],ie=re-g[ne],se=Ae(p?je(oe,J):oe,re,p?xe(ie,Z):ie)
E[_]=se,L[_]=se-re}}t.modifiersData[r]=L}},requiresIfExists:["offset"]}
function it(e,t,n){void 0===n&&(n=!1)
var r,o,i=ye(t),s=me(e),a=fe(t),c={scrollLeft:0,scrollTop:0},l={x:0,y:0}
return(a||!a&&!n)&&(("body"!==ae(t)||$e(i))&&(c=(r=t)!==ce(r)&&fe(r)?{scrollLeft:(o=r).scrollLeft,scrollTop:o.scrollTop}:Re(r)),fe(t)?((l=me(t)).x+=t.clientLeft,l.y+=t.clientTop):i&&(l.x=We(i))),{x:s.left+c.scrollLeft-l.x,y:s.top+c.scrollTop-l.y,width:s.width,height:s.height}}function st(e){var t=new Map,n=new Set,r=[]
function o(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e)
r&&o(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||o(e)})),r}var at={placement:"bottom",modifiers:[],strategy:"absolute"}
function ct(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n]
return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function lt(e){void 0===e&&(e={})
var t=e,n=t.defaultModifiers,r=void 0===n?[]:n,o=t.defaultOptions,i=void 0===o?at:o
return function(e,t,n){void 0===n&&(n=i)
var o,s,a={placement:"bottom",orderedModifiers:[],options:Object.assign({},at,i),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},c=[],l=!1,f={state:a,setOptions:function(n){d(),a.options=Object.assign({},i,a.options,n),a.scrollParents={reference:le(e)?Ke(e):e.contextElement?Ke(e.contextElement):[],popper:Ke(t)}
var o,s,l=function(e){var t=st(e)
return se.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}((o=[].concat(r,a.options.modifiers),s=o.reduce((function(e,t){var n=e[t.name]
return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{}),Object.keys(s).map((function(e){return s[e]}))))
return a.orderedModifiers=l.filter((function(e){return e.enabled})),a.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,o=e.effect
if("function"==typeof o){var i=o({state:a,name:t,instance:f,options:r}),s=function(){}
c.push(i||s)}})),f.update()},forceUpdate:function(){if(!l){var e=a.elements,t=e.reference,n=e.popper
if(ct(t,n)){a.rects={reference:it(t,Ee(n),"fixed"===a.options.strategy),popper:he(n)},a.reset=!1,a.placement=a.options.placement,a.orderedModifiers.forEach((function(e){return a.modifiersData[e.name]=Object.assign({},e.data)}))
for(var r=0;r<a.orderedModifiers.length;r++)if(!0!==a.reset){var o=a.orderedModifiers[r],i=o.fn,s=o.options,c=void 0===s?{}:s,d=o.name
"function"==typeof i&&(a=i({state:a,options:c,name:d,instance:f})||a)}else a.reset=!1,r=-1}}},update:(o=function(){return new Promise((function(e){f.forceUpdate(),e(a)}))},function(){return s||(s=new Promise((function(e){Promise.resolve().then((function(){s=void 0,e(o())}))}))),s}),destroy:function(){d(),l=!0}}
if(!ct(e,t))return f
function d(){c.forEach((function(e){return e()})),c=[]}return f.setOptions(n).then((function(e){!l&&n.onFirstUpdate&&n.onFirstUpdate(e)})),f}}var ft=lt(),dt=lt({defaultModifiers:[Me,rt,Ce,ue]}),ut=lt({defaultModifiers:[Me,rt,Ce,ue,nt,Je,ot,Ne,tt]}),pt=Object.freeze({__proto__:null,popperGenerator:lt,detectOverflow:Xe,createPopperBase:ft,createPopper:ut,createPopperLite:dt,top:B,bottom:H,right:I,left:R,auto:W,basePlacements:$,start:U,end:K,clippingParents:z,viewport:F,popper:V,reference:Y,variationPlacements:Q,placements:X,beforeRead:G,read:J,afterRead:Z,beforeMain:ee,main:te,afterMain:ne,beforeWrite:re,write:oe,afterWrite:ie,modifierPhases:se,applyStyles:ue,arrow:Ne,computeStyles:Ce,eventListeners:Me,flip:Je,hide:tt,offset:nt,popperOffsets:rt,preventOverflow:ot})
function mt(e){return"true"===e||"false"!==e&&(e===Number(e).toString()?Number(e):""===e||"null"===e?null:e)}function ht(e){return e.replace(/[A-Z]/g,(e=>`-${e.toLowerCase()}`))}const gt={setDataAttribute(e,t,n){e.setAttribute(`data-bs-${ht(t)}`,n)},removeDataAttribute(e,t){e.removeAttribute(`data-bs-${ht(t)}`)},getDataAttributes(e){if(!e)return{}
const t={}
return Object.keys(e.dataset).filter((e=>e.startsWith("bs"))).forEach((n=>{let r=n.replace(/^bs/,"")
r=r.charAt(0).toLowerCase()+r.slice(1,r.length),t[r]=mt(e.dataset[n])})),t},getDataAttribute:(e,t)=>mt(e.getAttribute(`data-bs-${ht(t)}`)),offset(e){const t=e.getBoundingClientRect()
return{top:t.top+document.body.scrollTop,left:t.left+document.body.scrollLeft}},position:e=>({top:e.offsetTop,left:e.offsetLeft})},vt="dropdown",bt="bs.dropdown",yt="Escape",wt="Space",_t="ArrowUp",Et="ArrowDown",Ot=new RegExp("ArrowUp|ArrowDown|Escape"),xt="click.bs.dropdown.data-api",jt="keydown.bs.dropdown.data-api",Lt="show",At='[data-bs-toggle="dropdown"]',Dt=".dropdown-menu",kt=c()?"top-end":"top-start",Nt=c()?"top-start":"top-end",Tt=c()?"bottom-end":"bottom-start",St=c()?"bottom-start":"bottom-end",Ct=c()?"left-start":"right-start",Pt=c()?"right-start":"left-start",Mt={offset:[0,2],boundary:"clippingParents",reference:"toggle",display:"dynamic",popperConfig:null,autoClose:!0},qt={offset:"(array|string|function)",boundary:"(string|element)",reference:"(string|element|object)",display:"string",popperConfig:"(null|object|function)",autoClose:"(boolean|string)"}
class Bt extends k{constructor(e,t){super(e),this._popper=null,this._config=this._getConfig(t),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}static get Default(){return Mt}static get DefaultType(){return qt}static get DATA_KEY(){return bt}toggle(){i(this._element)||(this._element.classList.contains(Lt)?this.hide():this.show())}show(){if(i(this._element)||this._menu.classList.contains(Lt))return
const e=Bt.getParentFromElement(this._element),t={relatedTarget:this._element}
if(!A.trigger(this._element,"show.bs.dropdown",t).defaultPrevented){if(this._inNavbar)gt.setDataAttribute(this._menu,"popper","none")
else{if(void 0===pt)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)")
let t=this._element
"parent"===this._config.reference?t=e:n(this._config.reference)?(t=this._config.reference,void 0!==this._config.reference.jquery&&(t=this._config.reference[0])):"object"==typeof this._config.reference&&(t=this._config.reference)
const r=this._getPopperConfig(),o=r.modifiers.find((e=>"applyStyles"===e.name&&!1===e.enabled))
this._popper=ut(t,this._menu,r),o&&gt.setDataAttribute(this._menu,"popper","static")}"ontouchstart"in document.documentElement&&!e.closest(".navbar-nav")&&[].concat(...document.body.children).forEach((e=>A.on(e,"mouseover",s))),this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.toggle(Lt),this._element.classList.toggle(Lt),A.trigger(this._element,"shown.bs.dropdown",t)}}hide(){if(i(this._element)||!this._menu.classList.contains(Lt))return
const e={relatedTarget:this._element}
this._completeHide(e)}dispose(){this._menu=null,this._popper&&(this._popper.destroy(),this._popper=null),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_addEventListeners(){A.on(this._element,"click.bs.dropdown",(e=>{e.preventDefault(),this.toggle()}))}_completeHide(e){A.trigger(this._element,"hide.bs.dropdown",e).defaultPrevented||("ontouchstart"in document.documentElement&&[].concat(...document.body.children).forEach((e=>A.off(e,"mouseover",s))),this._popper&&this._popper.destroy(),this._menu.classList.remove(Lt),this._element.classList.remove(Lt),this._element.setAttribute("aria-expanded","false"),gt.removeDataAttribute(this._menu,"popper"),A.trigger(this._element,"hidden.bs.dropdown",e))}_getConfig(e){if(e={...this.constructor.Default,...gt.getDataAttributes(this._element),...e},((e,t,r)=>{Object.keys(r).forEach((o=>{const i=r[o],s=t[o],a=s&&n(s)?"element":null==(c=s)?`${c}`:{}.toString.call(c).match(/\s([a-z]+)/i)[1].toLowerCase()
var c
if(!new RegExp(i).test(a))throw new TypeError(`${e.toUpperCase()}: Option "${o}" provided type "${a}" but expected type "${i}".`)}))})(vt,e,this.constructor.DefaultType),"object"==typeof e.reference&&!n(e.reference)&&"function"!=typeof e.reference.getBoundingClientRect)throw new TypeError(`${vt.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`)
return e}_getMenuElement(){return D.next(this._element,Dt)[0]}_getPlacement(){const e=this._element.parentNode
if(e.classList.contains("dropend"))return Ct
if(e.classList.contains("dropstart"))return Pt
const t="end"===getComputedStyle(this._menu).getPropertyValue("--bs-position").trim()
return e.classList.contains("dropup")?t?Nt:kt:t?St:Tt}_detectNavbar(){return null!==this._element.closest(".navbar")}_getOffset(){const{offset:e}=this._config
return"string"==typeof e?e.split(",").map((e=>Number.parseInt(e,10))):"function"==typeof e?t=>e(t,this._element):e}_getPopperConfig(){const e={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]}
return"static"===this._config.display&&(e.modifiers=[{name:"applyStyles",enabled:!1}]),{...e,..."function"==typeof this._config.popperConfig?this._config.popperConfig(e):this._config.popperConfig}}_selectMenuItem(e){const t=D.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",this._menu).filter(o)
if(!t.length)return
let n=t.indexOf(e.target)
e.key===_t&&n>0&&n--,e.key===Et&&n<t.length-1&&n++,n=-1===n?0:n,t[n].focus()}static dropdownInterface(e,t){let n=d.get(e,bt)
if(n||(n=new Bt(e,"object"==typeof t?t:null)),"string"==typeof t){if(void 0===n[t])throw new TypeError(`No method named "${t}"`)
n[t]()}}static jQueryInterface(e){return this.each((function(){Bt.dropdownInterface(this,e)}))}static clearMenus(e){if(e){if(2===e.button||"keyup"===e.type&&"Tab"!==e.key)return
if(/input|select|option|textarea|form/i.test(e.target.tagName))return}const t=D.find(At)
for(let n=0,r=t.length;n<r;n++){const r=d.get(t[n],bt)
if(!r||!1===r._config.autoClose)continue
if(!r._element.classList.contains(Lt))continue
const o={relatedTarget:r._element}
if(e){const t=e.composedPath(),n=t.includes(r._menu)
if(t.includes(r._element)||"inside"===r._config.autoClose&&!n||"outside"===r._config.autoClose&&n)continue
if("keyup"===e.type&&"Tab"===e.key&&r._menu.contains(e.target))continue
"click"===e.type&&(o.clickEvent=e)}r._completeHide(o)}}static getParentFromElement(e){return t(e)||e.parentNode}static dataApiKeydownHandler(e){if(/input|textarea/i.test(e.target.tagName)?e.key===wt||e.key!==yt&&(e.key!==Et&&e.key!==_t||e.target.closest(Dt)):!Ot.test(e.key))return
const t=this.classList.contains(Lt)
if(!t&&e.key===yt)return
if(e.preventDefault(),e.stopPropagation(),i(this))return
const n=()=>this.matches(At)?this:D.prev(this,At)[0]
if(e.key===yt)return n().focus(),void Bt.clearMenus()
t||e.key!==_t&&e.key!==Et?t&&e.key!==wt?Bt.getInstance(n())._selectMenuItem(e):Bt.clearMenus():n().click()}}A.on(document,jt,At,Bt.dataApiKeydownHandler),A.on(document,jt,Dt,Bt.dataApiKeydownHandler),A.on(document,xt,Bt.clearMenus),A.on(document,"keyup.bs.dropdown.data-api",Bt.clearMenus),A.on(document,xt,At,(function(e){e.preventDefault(),Bt.dropdownInterface(this)})),l(vt,Bt),document.addEventListener("DOMContentLoaded",(function(){document.getElementById("prism-css").media="all",document.getElementById("toggle-offcanvas").addEventListener("click",(function(){document.body.classList.toggle("offcanvas-open")}))
var e=document.querySelectorAll(".demo")
if(0!=e.length){var t=["bootstrap5","bootstrap4","bootstrap3","default"],n=localStorage.getItem("theme")||"bootstrap4",r=document.createElement("div")
r.classList.add("theme-selector")
var o=document.getElementById("main-container")
document.querySelectorAll(".demo-mini").length||o.insertBefore(r,o.firstChild),function e(n){localStorage.setItem("theme",n),r.innerHTML=""
for(let o=0;o<t.length;o++){let i=document.createElement("a")
i.textContent=t[o],i.className="btn btn-link btn-sm",t[o]===n&&i.classList.add("active"),r.appendChild(i),i.addEventListener("click",(function(n){n.preventDefault(),e(t[o])}))}var o=document.getElementById("select-theme")
o&&o.parentNode.removeChild(o),(o=document.createElement("link")).id="select-theme",o.setAttribute("rel","stylesheet"),o.setAttribute("href","/css/tom-select."+n+".css"),document.getElementsByTagName("head")[0].appendChild(o)}(n)
for(let t=0;t<e.length;t++)e[t]
document.addEventListener("click",(e=>{var t=e.target.closest(".opensandbox")
if(t){var n,r=t.closest(".demo")
function o(e){var t=r.querySelector(e)
return t&&t.textContent||""}var i=`<div class="p-4">${r.querySelector("textarea").value||""}</div>`,s=o("style"),a=o("script"),c=[`https://cdn.jsdelivr.net/gh/orchidjs/tom-select@1.6.2/dist/css/tom-select.${localStorage.getItem("theme")||"bootstrap4"}.min.css`,"https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/css/bootstrap.min.css","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"],l=["https://cdn.jsdelivr.net/gh/orchidjs/tom-select@1.6.2/dist/js/tom-select.complete.min.js"]
r.classList.contains("demo-jquery")&&(l.push("https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js"),l.push("https://cdn.jsdelivr.net/npm/jquery-ui-dist@1.12.1/jquery-ui.js")),n={html:i,js:a,css:s,js_external:l.join(";"),css_external:c.join(";")},r.querySelector(".codepen").value=JSON.stringify(n),r.querySelector(".jsfiddle-html").value=i,r.querySelector(".jsfiddle-js").value=a,r.querySelector(".jsfiddle-css").value=s,r.querySelector(".jsfiddle-resources").value=l.join(",")+","+c.join(","),setTimeout((()=>{t.nextElementSibling.submit()}),50)}}))}}))},"function"==typeof define&&define.amd?define(e):e()
//# sourceMappingURL=index.bundle.js.map
