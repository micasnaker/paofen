(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/an-uploadImg/an-uploadImg"],{"0218":function(e,t,a){"use strict";a.r(t);var n=a("4dd3"),o=a("ae90");for(var u in o)"default"!==u&&function(e){a.d(t,e,function(){return o[e]})}(u);a("222f");var s=a("2877"),r=Object(s["a"])(o["default"],n["a"],n["b"],!1,null,null,null);t["default"]=r.exports},"222f":function(e,t,a){"use strict";var n=a("779c"),o=a.n(n);o.a},"3ab2":function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a("674f"),o=u(a("f4fb"));function u(e){return e&&e.__esModule?e:{default:e}}var s=function(){return a.e("components/uni-icon/uni-icon").then(a.bind(null,"a0b9"))},r={name:"AnUploadImg",components:{uniIcon:s},data:function(){return{imgurl:null,imgurls:null}},methods:{chooseImage:function(t){var a=this;switch(t){case 1:e.chooseImage({count:1,success:function(t){(0,n.pathToBase64)(t.tempFilePaths[0]).then(function(n){var u=JSON.parse(JSON.parse(plus.storage.getItem("storage")));e.showLoading({title:"图片上传中...",mask:!0}),e.request({url:o.default+"member/base64_upload",data:{id:u.id,base64:n,type:1},header:{token:u.token},method:"POST",success:function(n){plus.nativeUI.toast("正面上传成功！"),e.hideLoading(),a.imgurl=t.tempFilePaths[0],console.log(n.data.error_code," at components\\an-uploadImg\\an-uploadImg.vue:60"),0==n.data.error_code&&a.$emit("func",n.data.data.url)},fail:function(e){plus.nativeUI.toast("正面上传失败！")}})}).catch(function(e){console.error(e," at components\\an-uploadImg\\an-uploadImg.vue:72")})}});break;default:e.chooseImage({count:1,success:function(t){(0,n.pathToBase64)(t.tempFilePaths[0]).then(function(n){e.showLoading({title:"图片上传中...",mask:!0});var u=JSON.parse(JSON.parse(plus.storage.getItem("storage")));e.request({url:o.default+"member/base64_upload",data:{id:u.id,base64:n,type:2},header:{token:u.token},method:"POST",success:function(n){plus.nativeUI.toast("背面上传成功！"),e.hideLoading(),a.imgurls=t.tempFilePaths[0],0==n.data.error_code&&a.$emit("funcs",n.data.data.url)},fail:function(e){plus.nativeUI.toast("背面上传失败！")}})}).catch(function(e){console.error(e," at components\\an-uploadImg\\an-uploadImg.vue:113")})}});break}}}};t.default=r}).call(this,a("6e42")["default"])},"4dd3":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},o=[];a.d(t,"a",function(){return n}),a.d(t,"b",function(){return o})},"779c":function(e,t,a){},ae90:function(e,t,a){"use strict";a.r(t);var n=a("3ab2"),o=a.n(n);for(var u in n)"default"!==u&&function(e){a.d(t,e,function(){return n[e]})}(u);t["default"]=o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/an-uploadImg/an-uploadImg-create-component',
    {
        'components/an-uploadImg/an-uploadImg-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("0218"))
        })
    },
    [['components/an-uploadImg/an-uploadImg-create-component']]
]);                