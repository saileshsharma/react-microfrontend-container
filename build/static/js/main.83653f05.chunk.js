(this.webpackJsonpcontainer=this.webpackJsonpcontainer||[]).push([[0],{19:function(e,t,n){e.exports=n(31)},24:function(e,t,n){},25:function(e,t,n){},31:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),o=n(14),r=n.n(o),l=(n(24),n(17)),i=n(18),s=n(2),m=n(15);function u(e){var t=e.name,n=e.host,o=e.history;return Object(a.useEffect)((function(){var e="micro-frontend-script-".concat(t);console.log("********** scriptId ************* "+e);var a=function(){window["render".concat(t)]("".concat(t,"-container"),o)};if(!document.getElementById(e))return fetch("".concat(n,"/asset-manifest.json")).then((function(e){return e.json()})).then((function(t){var c=document.createElement("script");c.id=e,c.crossOrigin="",c.src="".concat(n).concat(t.files["main.js"]),c.onload=function(){a()},document.head.appendChild(c)})),function(){window["unmount".concat(t)]&&window["unmount".concat(t)]("".concat(t,"-container"))};a()})),c.a.createElement("main",{id:"".concat(t,"-container")})}u.defaultProps={document:document,window:window};var d=u,E=(n(25),Object(m.a)(),Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,REACT_APP_CATS_HOST:"http://localhost:3002",REACT_APP_CONTENTS_HOST:"http://localhost:3003",REACT_APP_DOGS_HOST:"http://localhost:3001"})),h=E.REACT_APP_DOGS_HOST,f=E.REACT_APP_CATS_HOST;E.REACT_APP_CONTENTS_HOST;function v(){return c.a.createElement("div",{className:"banner"},c.a.createElement("h1",{className:"banner-title"},"\ud83d\ude3b Cats and Dogs \ud83d\udc15"),c.a.createElement("h4",null,"Random pics of cats and dogs"))}function _(e){var t=e.history;return c.a.createElement(d,{history:t,host:h,name:"Dogs"})}function p(e){var t=e.history;return c.a.createElement(d,{history:t,host:f,name:"Cats"})}function T(e){var t=e.history;return c.a.createElement("div",null,c.a.createElement(v,null),c.a.createElement("div",{className:"home"},c.a.createElement(d,{history:t,host:f,name:"Cats"})))}function O(e){var t=e.history,n=Object(a.useState)(""),o=Object(l.a)(n,2),r=o[0],i=o[1];return c.a.createElement("div",null,c.a.createElement(v,null),c.a.createElement("div",{className:"home"},c.a.createElement("input",{placeholder:"Insert a greeting",defaultValue:r,onBlur:function(e){return i(e.target.value)}}),c.a.createElement("button",{onClick:function(){t.push("/cat/".concat(r))}},"Greet Me")),c.a.createElement("div",{className:"home"},c.a.createElement("div",{className:"content"},c.a.createElement("div",{className:"cat"},c.a.createElement(p,null)),c.a.createElement("div",{className:"dog"},c.a.createElement(_,null)),c.a.createElement("div",null,c.a.createElement("contentsHost",null)))))}var S=function(){return c.a.createElement(i.a,null,c.a.createElement(c.a.Fragment,null,c.a.createElement(s.c,null,c.a.createElement(s.a,{exact:!0,path:"/",component:O}),c.a.createElement(s.a,{exact:!0,path:"/cat/:greeting",component:T}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[19,1,2]]]);
//# sourceMappingURL=main.83653f05.chunk.js.map