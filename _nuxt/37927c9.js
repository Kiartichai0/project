(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{570:function(t,e,r){"use strict";r.r(e);var n=r(33),c=(r(117),{asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,q,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.$axios,n=t.query,e.next=3,r.$get("/quiz/".concat(n.id));case 3:return q=e.sent,c=q[0].quiz,e.abrupt("return",{quiz:c});case 6:case"end":return e.stop()}}),e)})))()},data:function(){return{user:this.$auth.user,loggedIn:this.$auth.loggedIn,id:this.$route.query.id,score:0,selection:[]}},methods:{delQuiz:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n={data:{id:e.$route.query.id,quiz:t}},r.next=3,e.$axios.$post("/delquiz",n);case 3:return r.next=5,e.$nuxt.refresh();case 5:case"end":return r.stop()}}),r)})))()}}}),o=r(127),d=r(173),l=r.n(d),v=r(100),_=r(116),w=r(93),h=r(337),f=r(336),component=Object(o.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{align:"center"}},[t._l(t.quiz.length,(function(e){return r("v-col",{key:e},[r("v-card",{attrs:{width:"50%"}},[r("v-card-text",[r("div",{staticClass:"my-5",domProps:{innerHTML:t._s(t.quiz[e-1].question)}}),t._v(" "),r("br"),t._v(" "),r("h4",[t._v(" correct answer: "+t._s(t.quiz[e-1].correct))])]),t._v(" "),r("v-card-actions",[r("v-row",t._l(t.quiz[e-1].choice,(function(i){return r("v-col",{key:i,staticClass:"col-6"},[r("v-btn",{staticClass:"ma-5",attrs:{disabled:""},on:{click:function(r){return t.answer(i,t.quiz[e-1].correct)}}},[t._v("\n                "+t._s(i)+"\n              ")])],1)})),1)],1),t._v(" "),r("v-btn",{staticClass:"ma-4",attrs:{width:"30%",to:{path:"/writer/edit_quiz",query:{id:t.id,data:t.quiz[e-1],edit:!0}}}},[t._v(" Edit ")]),t._v(" "),r("v-btn",{staticClass:"ma-4",attrs:{width:"30%"},on:{click:function(r){return t.delQuiz(t.quiz[e-1])}}},[t._v(" Delete ")])],1)],1)})),t._v(" "),r("v-btn",{staticClass:"ma-5",attrs:{to:{path:"/writer/add_quiz",query:{id:t.id}}}},[t._v(" add new question ")]),t._v(" "),r("v-btn",{staticClass:"ma-5",attrs:{to:{path:"/writer/writer_topic",query:{id:t.id}}}},[t._v(" back ")])],2)}),[],!1,null,null,null);e.default=component.exports;l()(component,{VBtn:v.a,VCard:_.a,VCardActions:w.a,VCardText:w.c,VCol:h.a,VRow:f.a})}}]);