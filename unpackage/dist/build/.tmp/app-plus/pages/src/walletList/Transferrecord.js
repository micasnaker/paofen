(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/src/walletList/Transferrecord"],{"06de":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return r})},"24ea":function(t,e,n){},"3ccb":function(t,e,n){"use strict";n.r(e);var a=n("06de"),r=n("a21b");for(var o in r)"default"!==o&&function(t){n.d(e,t,function(){return r[t]})}(o);n("def2");var u=n("2877"),c=Object(u["a"])(r["default"],a["a"],a["b"],!1,null,null,null);e["default"]=c.exports},"556b":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(n("a34a")),r=o(n("630b"));function o(t){return t&&t.__esModule?t:{default:t}}function u(t,e,n,a,r,o,u){try{var c=t[o](u),l=c.value}catch(s){return void n(s)}c.done?e(l):Promise.resolve(l).then(a,r)}function c(t){return function(){var e=this,n=arguments;return new Promise(function(a,r){var o=t.apply(e,n);function c(t){u(o,a,r,c,l,"next",t)}function l(t){u(o,a,r,c,l,"throw",t)}c(void 0)})}}var l=function(){return Promise.all([n.e("common/vendor"),n.e("components/mescroll-uni/mescroll-uni")]).then(n.bind(null,"8d3a"))},s={components:{MescrollUni:l},data:function(){return{data:{},mescroll:null}},onReachBottom:function(){this.mescroll&&this.mescroll.onReachBottom()},onPageScroll:function(t){this.mescroll&&this.mescroll.onPageScroll(t)},methods:{downCallback:function(t){t.resetUpScroll()},upCallback:function(){var t=c(a.default.mark(function t(e){var n,o,u,c,l,s;return a.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=JSON.parse(JSON.parse(plus.storage.getItem("storage"))),o={id:n.id,page:e.num},t.next=4,r.default.httpRequest("zhuan_log",o);case 4:u=t.sent,c=u.data.list,1==e.num&&(this.data.list=[]),this.data.list=this.data.list.concat(c),this.data=u.data,console.log(u.data," at pages\\src\\walletList\\Transferrecord.vue:66"),console.log(e.num," at pages\\src\\walletList\\Transferrecord.vue:68"),l=this.data.current_count,s=this.data.total_page,e.endByPage(l,s);case 14:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()}};e.default=s},a21b:function(t,e,n){"use strict";n.r(e);var a=n("556b"),r=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=r.a},def2:function(t,e,n){"use strict";var a=n("24ea"),r=n.n(a);r.a}},[["4471","common/runtime","common/vendor"]]]);