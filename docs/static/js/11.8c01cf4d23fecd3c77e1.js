webpackJsonp([11],{OPQM:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("Dd8w"),n=s.n(a),l=s("Xxa5"),i=s.n(l),r=s("exGp"),u=s.n(r),o=s("teIl"),c=s("/mXm"),h=s("H868"),p=s("NYxO"),d=s("P9l9"),m=s("vsZy"),f={name:"Thumbs",components:{VHeader:o.a,HotRecomment:c.a,Scroll:h.a},mixins:[m.a],data:function(){return{thumbsList:[],pageNum:0,pullUp:!0,userId:""}},activated:function(){this.hasTitle=!1,this.userId=this.$route.query.uid},watch:{userId:function(){this.getUserLike(!0)}},methods:{getUserLike:function(t){var e=this;return u()(i.a.mark(function s(){var a,n,l,r,u;return i.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return a=e.$route.query.uid,t||e.pageNum++,n=e.pageNum,l={params:{uid:a,page:n,pageSize:20}},s.next=6,d.a.getUserLike(l);case 6:1===(r=s.sent).s&&(u=r.d.entryList,e.thumbsList=t?u:e.thumbsList.concat(u.slice(1)),u.length||(e.pullUp=!1,e.pageNum=0));case 8:case"end":return s.stop()}},s,e)}))()},handleGoBack:function(){this.$router.go(-1)},handleToDetail:function(t){this.$router.push({path:"detail",query:{id:t.id,type:t.type}})},handlePullDown:function(){this.getUserLike(!0)},handlePullUp:function(){this.pullUp?this.getUserLike():this.$refs.scroll.forceUpdate()}},computed:n()({},Object(p.b)(["auth"]))},g={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"thumbs"},[s("v-header",{attrs:{title:"赞过的文章"},on:{goBack:t.handleGoBack}}),t._v(" "),t.thumbsList.length?s("scroll",{ref:"scroll",staticClass:"scroll",attrs:{data:t.thumbsList,scrollbar:t.scrollbarObj,pullDownRefresh:t.pullDownRefreshObj,pullUpLoad:t.pullUpLoadObj},on:{pullingDown:t.handlePullDown,pullingUp:t.handlePullUp}},[s("hot-recomment",{attrs:{hasTitle:t.hasTitle,recomment:t.thumbsList},on:{toDetail:t.handleToDetail}})],1):s("div",{staticClass:"no-more"},[s("div",{staticClass:"icon"},[s("svg-icon",{attrs:{iconClass:"file"}})],1),t._v(" "),s("p",{staticClass:"text"},[t._v("暂无赞过的文章")])])],1)},staticRenderFns:[]};var b=s("VU/8")(f,g,!1,function(t){s("mngZ")},"data-v-5b44aa71",null);e.default=b.exports},mngZ:function(t,e){}});
//# sourceMappingURL=11.8c01cf4d23fecd3c77e1.js.map