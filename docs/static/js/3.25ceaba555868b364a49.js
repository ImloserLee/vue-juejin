webpackJsonp([3],{XzY5:function(t,e,a){"use strict";var i=a("oAV5"),s={props:{timeline:{type:Array,default:function(){return[]}}},filters:{splitTag:function(t){return t.slice(0,2).map(function(t,e){return t.title}).join("/")}},methods:{handleToDetail:function(t){var e=Object(i.c)(t.originalUrl),a=t.objectId,s=t.type,n={id:"post"===s?e:a,type:s};this.$emit("toDetail",n)},handleToHomePage:function(t){var e=t.user.objectId;this.$emit("toHomePage",e)},handleSetUserLike:function(t){var e=t.objectId;this.$emit("setUserLike",e)},handleCancelUserLike:function(t){var e=t.objectId;this.$emit("cancelUserLike",e)}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",t._l(t.timeline,function(e){return a("li",{key:e.objectId,staticClass:"list"},[a("div",{staticClass:"panel"},[a("div",{staticClass:"header"},[a("div",{staticClass:"header_left",on:{click:function(a){t.handleToHomePage(e)}}},[a("div",{staticClass:"avatar"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.user.avatarLarge,expression:"item.user.avatarLarge"}]})]),t._v(" "),a("div",{staticClass:"name"},[t._v("\n            "+t._s(e.user.username)+"\n          ")])]),t._v(" "),a("div",{staticClass:"header_right",on:{click:function(a){t.handleToDetail(e)}}},[a("span",[t._v(t._s(t._f("splitTag")(e.tags)))])])]),t._v(" "),a("div",{staticClass:"content",on:{click:function(a){t.handleToDetail(e)}}},[a("div",{staticClass:"content_left"},[a("h4",[t._v(t._s(e.title))]),t._v(" "),a("div",{staticClass:"text"},[a("p",[t._v(t._s(e.content))])])]),t._v(" "),e.screenshot?a("div",{staticClass:"content_right"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.screenshot,expression:"item.screenshot"}]})]):t._e()]),t._v(" "),a("div",{staticClass:"bar"},[a("div",{staticClass:"like"},[e.isCollected?a("span",{staticClass:"icon",on:{click:function(a){t.handleCancelUserLike(e)}}},[a("svg-icon",{attrs:{iconClass:"dianzan-fill"}})],1):a("span",{staticClass:"icon",on:{click:function(a){t.handleSetUserLike(e)}}},[a("svg-icon",{attrs:{iconClass:"dianzan"}})],1),t._v(" "),e.collectionCount?a("span",{staticClass:"text",class:e.isCollected?"like-text":""},[t._v(t._s(e.collectionCount))]):a("span",{staticClass:"text"},[t._v("点赞")])]),t._v(" "),a("div",{staticClass:"comment"},[a("span",{staticClass:"icon"},[a("svg-icon",{attrs:{iconClass:"pinlun"}})],1),t._v(" "),e.commentsCount?a("span",{staticClass:"text"},[t._v(t._s(e.commentsCount))]):a("span",{staticClass:"text"},[t._v("评论")])])])])])}))},staticRenderFns:[]};var l=a("VU/8")(s,n,!1,function(t){a("ju5e")},"data-v-64203f29",null);e.a=l.exports},Zy4N:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Dd8w"),s=a.n(i),n=a("Xxa5"),l=a.n(n),c=a("exGp"),o=a.n(c),r=a("teIl"),d=a("XzY5"),u=a("H868"),v=a("NYxO"),f=a("P9l9"),h=a("vsZy"),p={name:"Original",components:{VHeader:r.a,ItemPanel:d.a,Scroll:u.a},mixins:[h.a],data:function(){return{originalList:[],userId:""}},activated:function(){this.userId=this.$route.query.uid},watch:{userId:function(){this.getEntryBySelf(!0)}},methods:{getEntryBySelf:function(t){var e=this;return o()(l.a.mark(function a(){var i,s,n,c,o,r,d,u,v,h,p,m,_;return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return i=e.auth?e.auth:{},s=i.token,n=void 0===s?"":s,c=i.uid,o=void 0===c?"unlogin":c,r=i.device_id,d=void 0===r?"":r,u=e.$route.query.uid,(v=e.originalList).length&&!t||(v=[{createdAt:""}]),h=v.slice(-1)[0].createdAt||"",p={params:{uid:o,token:n,device_id:d,targetUid:u,before:h,limit:20,order:"createdAt",src:"ios",type:"post"}},a.next=8,f.a.getEntryBySelf(p);case 8:1===(m=a.sent).s&&(_=m.d.entrylist?m.d.entrylist:[],e.originalList=t?_:e.originalList.concat(_.slice(1)));case 10:case"end":return a.stop()}},a,e)}))()},handleGoBack:function(){this.$router.go(-1)},handlePullDown:function(){this.getEntryBySelf(!0)},handlePullUp:function(){this.getEntryBySelf()}},computed:s()({},Object(v.b)(["auth"]))},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"original"},[a("v-header",{attrs:{title:"原创文章"},on:{goBack:t.handleGoBack}}),t._v(" "),t.originalList.length?a("scroll",{ref:"scroll",staticClass:"scroll",attrs:{data:t.originalList,scrollbar:t.scrollbarObj,pullDownRefresh:t.pullDownRefreshObj,pullUpLoad:t.pullUpLoadObj},on:{pullingDown:t.handlePullDown,pullingUp:t.handlePullUp}},[a("item-panel",{attrs:{timeline:t.originalList}})],1):a("div",{staticClass:"no-more"},[a("div",{staticClass:"icon"},[a("svg-icon",{attrs:{iconClass:"file"}})],1),t._v(" "),a("p",{staticClass:"text"},[t._v("没有发布过原创文章呢")])])],1)},staticRenderFns:[]};var _=a("VU/8")(p,m,!1,function(t){a("kUdk")},"data-v-41a7719b",null);e.default=_.exports},ju5e:function(t,e){},kUdk:function(t,e){}});
//# sourceMappingURL=3.25ceaba555868b364a49.js.map