!function(){function e(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],i=!0,o=!1,r=void 0;try{for(var s,c=e[Symbol.iterator]();!(i=(s=c.next()).done)&&(n.push(s.value),!t||n.length!==t);i=!0);}catch(a){o=!0,r=a}finally{try{i||null==c.return||c.return()}finally{if(o)throw r}}return n}(e,n)||t(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(e,t){if(e){if("string"==typeof e)return n(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?n(e,t):void 0}}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function r(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{KgmW:function(e,t,n){"use strict";n.d(t,"a",function(){return f});var o=n("fXoL"),s=n("ofXK");function c(e,t){1&e&&o.Ob(0,"div",2)}var a=["*"],f=function(){var e=function(){function e(t){i(this,e),this.hostElement=t,this.showShadowOffset=10,this._showShadow=!1}return r(e,[{key:"scrollHandler",value:function(e){this._showShadow=e.target.scrollTop>this.showShadowOffset}}]),e}();return e.\u0275fac=function(t){return new(t||e)(o.Nb(o.l))},e.\u0275cmp=o.Hb({type:e,selectors:[["ft-scroll-container"]],inputs:{showShadowOffset:"showShadowOffset"},ngContentSelectors:a,decls:3,vars:1,consts:[[1,"ft-ScrollContainer","ft-flex-container",3,"scroll"],["class","ft-ScrollContainer__shadow",4,"ngIf"],[1,"ft-ScrollContainer__shadow"]],template:function(e,t){1&e&&(o.jc(),o.Tb(0,"div",0),o.ac("scroll",function(e){return t.scrollHandler(e)}),o.ic(1),o.Sb(),o.Ec(2,c,1,0,"div",1)),2&e&&(o.Ab(2),o.kc("ngIf",t._showShadow))},directives:[s.l],styles:["[_nghost-%COMP%]{position:relative;height:100%;min-height:0;display:flex;flex-direction:column;flex-grow:1;flex-shrink:1}.ft-ScrollContainer[_ngcontent-%COMP%]{overflow-y:scroll;overflow-x:hidden}.ft-ScrollContainer__shadow[_ngcontent-%COMP%]{top:0;height:8px;width:100%;position:absolute;background:linear-gradient(180deg,rgba(0,0,0,.15),transparent)}"],changeDetection:0}),e}()},SZVw:function(e,t,n){"use strict";n.d(t,"a",function(){return c});var o,r=n("ofXK"),s=n("fXoL"),c=((o=function e(){i(this,e)}).\u0275mod=s.Lb({type:o}),o.\u0275inj=s.Kb({factory:function(e){return new(e||o)},imports:[[r.c]]}),o)},bf3N:function(n,o,s){"use strict";s.d(o,"b",function(){return a}),s.d(o,"a",function(){return c});var c=function(e){return e[e.ONE_RIGHT_ANSWER=0]="ONE_RIGHT_ANSWER",e[e.MANY_RIGHT_ANSWER=1]="MANY_RIGHT_ANSWER",e}({}),a=function(){function n(e){i(this,n),this._answered=!1,this._marked=!1,this.id=e.id,this.text=e.text,this.options=e.options,this.publish=e.publish,this.category=e.category,this.subcategory=e.subcategory,this.code=e.code,this.explanation=e.explanation,this.image=e.image,this.imageKey=e.imageKey,this.service=e.service}return r(n,[{key:"clone",value:function(){return new n(Object.assign({},this))}},{key:"opts",get:function(){return JSON.parse(this.options)},set:function(e){this.options=JSON.stringify(e)}},{key:"type",get:function(){var e,n=0,i=function(e,n){var i;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(i=t(e))||n&&e&&"number"==typeof e.length){i&&(e=i);var o=0,r=function(){};return{s:r,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,c=!0,a=!1;return{s:function(){i=e[Symbol.iterator]()},n:function(){var e=i.next();return c=e.done,e},e:function(e){a=!0,s=e},f:function(){try{c||null==i.return||i.return()}finally{if(a)throw s}}}}(this.opts);try{for(i.s();!(e=i.n()).done;){if(e.value.isRight&&n++,n>1)return c.MANY_RIGHT_ANSWER}}catch(o){i.e(o)}finally{i.f()}return c.ONE_RIGHT_ANSWER}},{key:"isCorrectly",get:function(){if(!this.selectedOptions||!this.selectedOptions.length)return!1;if(this.type===c.ONE_RIGHT_ANSWER){var t=e(this.selectedOptions,1)[0];return this.opts[t].isRight}var n=!0;return this.opts.forEach(function(e,t){(e.isRight&&!e.selected||!e.isRight&&e.selected)&&(n=!1)}),n}},{key:"answered",get:function(){return this._answered},set:function(e){this._answered=e}},{key:"hasOneRightAnswer",get:function(){return this.type===c.ONE_RIGHT_ANSWER}},{key:"selectedOptions",get:function(){var e=[];return this.opts.forEach(function(t,n){t.selected&&e.push(n)}),e}},{key:"marked",get:function(){return this._marked},set:function(e){this._marked=e}},{key:"subcategoryName",get:function(){return this.subcategory?this.subcategory.name:""}},{key:"fullCategoryName",get:function(){var e,t=this.subcategoryName;return t?"".concat(this.category.name,": ").concat(t):(null===(e=this.category)||void 0===e?void 0:e.name)||""}}]),n}()},qmHy:function(t,n,o){"use strict";o.r(n),o.d(n,"TestingModule",function(){return L});var s=o("tyNb"),c=o("3Pt+"),a=o("ofXK"),f=o("+xaA"),u=o("Gwzt"),l=o("quSY"),g=o("fXoL"),d=o("LqzW"),h=o("ey9i"),b=o("jZ5U"),_=o("ycSy"),p=o("PVgB"),m=o("KgmW"),v=o("XO98");function k(e,t){1&e&&(g.dc(),g.Tb(0,"svg",3),g.Ob(1,"polygon",4),g.Sb())}function w(e,t){if(1&e){var n=g.Ub();g.Tb(0,"div",1),g.ac("click",function(){g.wc(n);var e=t.$implicit;return g.ec()._changeSelectedQuestion(e)}),g.Gc(1),g.Ec(2,k,2,0,"svg",2),g.Sb()}if(2&e){var i=t.$implicit,o=t.index,r=g.ec();g.Fb("ft-QuestionSelector__selected",r._selected===i.id)("ft-QuestionSelector__answered",i.answered),g.Ab(1),g.Ic(" ",o+1," "),g.Ab(1),g.kc("ngIf",i.marked)}}var x,y=((x=function(){function e(){i(this,e),this.selectedChanged=new g.o}return r(e,[{key:"ngOnChanges",value:function(e){var t=e.selected;t&&t.currentValue&&(!t.previousValue&&t.currentValue||t.previousValue&&t.currentValue!==t.previousValue)&&(this._selected=t.currentValue)}},{key:"_changeSelectedQuestion",value:function(e){this._selected=e.id,this.selectedChanged.emit(this._selected)}}]),e}()).\u0275fac=function(e){return new(e||x)},x.\u0275cmp=g.Hb({type:x,selectors:[["ft-question-selector"]],inputs:{questions:"questions",selected:"selected"},outputs:{selectedChanged:"selectedChanged"},features:[g.yb],decls:1,vars:1,consts:[["class","ft-QuestionSelector__number",3,"ft-QuestionSelector__selected","ft-QuestionSelector__answered","click",4,"ngFor","ngForOf"],[1,"ft-QuestionSelector__number",3,"click"],["class","ft-QuestionSelector__marked","viewBox","0 0 1 1","xmlns","http://www.w3.org/2000/svg",4,"ngIf"],["viewBox","0 0 1 1","xmlns","http://www.w3.org/2000/svg",1,"ft-QuestionSelector__marked"],["points","0,0 1,1 1,0","xmlns","http://www.w3.org/2000/svg"]],template:function(e,t){1&e&&g.Ec(0,w,3,6,"div",0),2&e&&g.kc("ngForOf",t.questions)},directives:[a.k,a.l],styles:[".ft-QuestionSelector__number[_ngcontent-%COMP%]{width:30px;height:30px;line-height:28px;font-size:16px;text-align:center;margin-left:8px;margin-top:8px;display:inline-block;border-radius:4px;cursor:pointer;border:1px solid #ccc;position:relative}.ft-QuestionSelector__number[_ngcontent-%COMP%]:hover{background-color:rgba(255,166,0,.5)}.ft-QuestionSelector__selected[_ngcontent-%COMP%]{border:1px solid orange}.ft-QuestionSelector__answered[_ngcontent-%COMP%]{background-color:#28a745;cursor:default}.ft-QuestionSelector__marked[_ngcontent-%COMP%]{position:absolute;top:0;right:0;fill:red;height:8px;width:8px}"],changeDetection:0}),x),C=o("bTqV"),T=o("kmnG"),S=o("qFsG");function P(e,t){if(1&e){var n=g.Ub();g.Tb(0,"ft-question-selector",17),g.ac("selectedChanged",function(e){return g.wc(n),g.ec(2)._changeCurrentQuestion(e)}),g.Sb()}if(2&e){var i=g.ec(2);g.kc("selected",i.currentQuestion&&i.currentQuestion.id)("questions",i._questions)}}function O(e,t){if(1&e){var n=g.Ub();g.Tb(0,"button",18),g.ac("click",function(){return g.wc(n),g.ec(2)._toggleFeedbackField(!0)}),g.Gc(1," \u0417\u0430\u043c\u0435\u0442\u0438\u043b\u0438 \u043e\u0448\u0438\u0431\u043a\u0443? "),g.Sb()}}function q(e,t){if(1&e){var n=g.Ub();g.Tb(0,"mat-form-field",19),g.Tb(1,"mat-label"),g.Gc(2,"\u041e\u043f\u0438\u0448\u0438\u0442\u0435, \u0432 \u0447\u0451\u043c \u0437\u0430\u043a\u043b\u044e\u0447\u0430\u0435\u0442\u0441\u044f \u043e\u0448\u0438\u0431\u043a\u0430"),g.Sb(),g.Tb(3,"textarea",20),g.ac("ngModelChange",function(e){return g.wc(n),g.ec(2)._feedbackText=e}),g.Sb(),g.Sb()}if(2&e){var i=g.ec(2);g.Ab(3),g.Fb("ft-TestingPage__feedback-textarea",!0),g.kc("ngModel",i._feedbackText)("matAutosizeMaxRows",6)("matAutosizeMinRows",1)}}function I(e,t){if(1&e){var n=g.Ub();g.Tb(0,"button",21),g.ac("click",function(){return g.wc(n),g.ec(2)._sendFeedback()}),g.Gc(1," \u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c "),g.Sb()}if(2&e){var i=g.ec(2);g.kc("disabled",!i._feedbackText)}}function M(e,t){if(1&e){var n=g.Ub();g.Tb(0,"button",22),g.ac("click",function(){return g.wc(n),g.ec(2)._toggleFeedbackField(!1)}),g.Gc(1," \u041e\u0442\u043c\u0435\u043d\u0430 "),g.Sb()}}function A(e,t){if(1&e){var n=g.Ub();g.Tb(0,"div",3),g.Tb(1,"div",4),g.Tb(2,"div",5),g.Tb(3,"div",6),g.Gc(4),g.Sb(),g.Tb(5,"ft-timer",7),g.ac("timeIsOver",function(){return g.wc(n),g.ec()._timeIsOver()}),g.Sb(),g.Sb(),g.Ob(6,"div",8),g.Ec(7,P,1,2,"ft-question-selector",9),g.Ec(8,O,2,0,"button",10),g.Ec(9,q,4,5,"mat-form-field",11),g.Tb(10,"div",12),g.Ec(11,I,2,1,"button",13),g.Ec(12,M,2,0,"button",14),g.Sb(),g.Sb(),g.Tb(13,"ft-scroll-container",15),g.Tb(14,"ft-testing-form",16),g.ac("answerReceived",function(e){return g.wc(n),g.ec()._answerReceived(e)}),g.Sb(),g.Sb(),g.Sb()}if(2&e){var i=g.ec();g.Ab(3),g.lc("title",i.testName),g.Ab(1),g.Ic(" ",i.quizController.testName,""),g.Ab(1),g.kc("time",i.quizController.testingTime),g.Ab(2),g.kc("ngIf",!i._showFeedback),g.Ab(1),g.kc("ngIf",!i._showFeedback),g.Ab(1),g.kc("ngIf",i._showFeedback),g.Ab(2),g.kc("ngIf",i._showFeedback),g.Ab(1),g.kc("ngIf",i._showFeedback),g.Ab(2),g.kc("question",i.currentQuestion)}}function F(e,t){if(1&e){var n=g.Ub();g.Tb(0,"div",23),g.Tb(1,"h1",24),g.Gc(2," \u041a \u0441\u043e\u0436\u0430\u043b\u0435\u043d\u0438\u044e \u0442\u0435\u0441\u0442 \u0435\u0449\u0451 \u043d\u0435 \u0441\u043e\u0437\u0434\u0430\u043d :( "),g.Sb(),g.Tb(3,"button",25),g.ac("click",function(){return g.wc(n),g.ec().quizController.clear()}),g.Gc(4," \u0412\u0435\u0440\u043d\u0443\u0442\u044c\u0441\u044f \u043d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e "),g.Sb(),g.Sb()}}var Q,E,N,R,z,G=function(){return{userButton:!1,addQuestion:!1}},H=((E=function(){function t(e,n,o,r,s){i(this,t),this.feedbackService=e,this.quizController=n,this.route=o,this.confirmation=r,this.changeDetector=s,this.currentQuestionIndex=0,this._showFeedback=!1,this._subscription=new l.a}return r(t,[{key:"ngOnInit",value:function(){var t=this;this._subscription.add(this.route.data.subscribe(function(n){if(t._questions=n.questions,t.quizController.questions=n.questions,!t.quizController.isEmpty){var i=e(t._questions,1)[0];t.currentQuestion=i}}))}},{key:"ngOnDestroy",value:function(){this._subscription.unsubscribe()}},{key:"_changeCurrentQuestion",value:function(e){if(this.currentQuestion.id!==e)for(var t=0;t<this._questions.length;t++)if(this._questions[t].id===e){this.currentQuestion=this._questions[t],this.currentQuestionIndex=t;break}}},{key:"_answerReceived",value:function(e){this._toggleFeedbackField(!1),this._feedbackText="";for(var t=this.currentQuestionIndex+1;t<this._questions.length;t++)if(!this._questions[t].answered)return this.currentQuestion=this._questions[t],void(this.currentQuestionIndex=t);for(var n=0;n<this.currentQuestionIndex;n++)if(!this._questions[n].answered)return this.currentQuestion=this._questions[n],void(this.currentQuestionIndex=n);this.quizController.endTest()}},{key:"_timeIsOver",value:function(){this.quizController.endTest(!0)}},{key:"_toggleFeedbackField",value:function(e){this._showFeedback=e}},{key:"_sendFeedback",value:function(){var e=this;this._feedbackText&&this._subscription.add(this.feedbackService.create({text:this._feedbackText,questionId:this.currentQuestion.id}).subscribe(function(){e._toggleFeedbackField(!1),e._feedbackText="",e.changeDetector.markForCheck()}))}},{key:"canDeactivate",value:function(e,t,n){return!this.quizController.isStarted||"/results"===n.url||this.confirmation.open({type:"confirm",message:"\u041f\u0440\u043e\u0433\u0440\u0435\u0441\u0441 \u0442\u0435\u043a\u0443\u0449\u0435\u0433\u043e \u0442\u0435\u0441\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f \u0431\u0443\u0434\u0435\u0442 \u043f\u043e\u0442\u0435\u0440\u044f\u043d. \u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044c \u0442\u0435\u0441\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435?"})}}]),t}()).\u0275fac=function(e){return new(e||E)(g.Nb(d.b),g.Nb(h.c),g.Nb(s.a),g.Nb(b.b),g.Nb(g.h))},E.\u0275cmp=g.Hb({type:E,selectors:[["ft-test"]],decls:3,vars:6,consts:[[3,"showFooter","scrolledContent","headerButtonsConfig"],["class","ft-TestingPage ft-flexbox",4,"ngIf"],["class","ft-TestingPage__empty ft-flexbox ft-flex-column ft-justify-content-center ft-align-items-center",4,"ngIf"],[1,"ft-TestingPage","ft-flexbox"],[1,"ft-TestingPage__leftContainer","ft-flexbox","ft-flex-column","ft-flex-shrink-0"],[1,"ft-TestingPage__info","ft-flexbox","ft-align-items-center","ft-text-ellipsis"],[1,"ft-TestingPage__info-title","ft-flex-grow-1","ft-flex-shrink-1","ft-text-ellipsis",3,"title"],[1,"ft-TestingPage__info-timer","ft-flex-grow-0","ft-flex-shrink-0",3,"time","timeIsOver"],[1,"ft-TestingPage__separator"],["class","ft-TestingPage__selector",3,"selected","questions","selectedChanged",4,"ngIf"],["class","ft-TestingPage__feedback-show","mat-stroked-button","","color","warn",3,"click",4,"ngIf"],["class","ft-TestingPage__feedback-textareaContainer ft-flexbox ft-flex-column",4,"ngIf"],[1,"ft-flexbox"],["class","ft-TestingPage__feedback-hide","mat-stroked-button","","color","primary",3,"disabled","click",4,"ngIf"],["class","ft-TestingPage__feedback-cancel","mat-stroked-button","","color","warn",3,"click",4,"ngIf"],[1,"ft-TestingPage__questionContainer"],[1,"ft-TestingPage__question","ft-flex-grow-1","ft-flex-shrink-1",3,"question","answerReceived"],[1,"ft-TestingPage__selector",3,"selected","questions","selectedChanged"],["mat-stroked-button","","color","warn",1,"ft-TestingPage__feedback-show",3,"click"],[1,"ft-TestingPage__feedback-textareaContainer","ft-flexbox","ft-flex-column"],["matInput","",3,"ngModel","mat-autosize","matAutosizeMaxRows","matAutosizeMinRows","ngModelChange"],["mat-stroked-button","","color","primary",1,"ft-TestingPage__feedback-hide",3,"disabled","click"],["mat-stroked-button","","color","warn",1,"ft-TestingPage__feedback-cancel",3,"click"],[1,"ft-TestingPage__empty","ft-flexbox","ft-flex-column","ft-justify-content-center","ft-align-items-center"],[1,"ft-TestingPage__empty-text"],[1,"ft-TestingPage__empty-back","btn","btn-secondary",3,"click"]],template:function(e,t){1&e&&(g.Tb(0,"ft-page",0),g.Ec(1,A,15,9,"div",1),g.Ec(2,F,5,0,"div",2),g.Sb()),2&e&&(g.kc("showFooter",!1)("scrolledContent",!1)("headerButtonsConfig",g.mc(5,G)),g.Ab(1),g.kc("ngIf",t._questions&&t._questions.length),g.Ab(1),g.kc("ngIf",!(t._questions&&t._questions.length)))},directives:[_.a,a.l,p.a,m.a,v.a,y,C.a,T.b,T.e,S.a,c.c,S.c,c.p,c.s],styles:["[_nghost-%COMP%]{display:flex;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden}.ft-TestingPage[_ngcontent-%COMP%], [_nghost-%COMP%]{height:100%;width:100%}.ft-TestingPage[_ngcontent-%COMP%]{background-color:#f0f0f0}.ft-TestingPage__leftContainer[_ngcontent-%COMP%]{padding:20px 12px;margin-top:8px;max-width:338px;min-width:338px;height:100%;background:#fff}.ft-TestingPage__info[_ngcontent-%COMP%]{margin:0 8px}.ft-TestingPage__info-title[_ngcontent-%COMP%]{font-size:18px;font-weight:700}.ft-TestingPage__info-timer[_ngcontent-%COMP%]{margin-left:12px}.ft-TestingPage__separator[_ngcontent-%COMP%]{height:1px;background-color:#ccc;margin:12px 0}.ft-TestingPage__question[_ngcontent-%COMP%]{background-color:#fff;padding:20px 12px}.ft-TestingPage__questionContainer[_ngcontent-%COMP%]{margin:8px 0 0 8px}.ft-TestingPage__empty[_ngcontent-%COMP%]{background:url(common-bg.31dc277490d64dbb92a0.png);width:100%;height:100%}.ft-TestingPage__empty-text[_ngcontent-%COMP%]{text-align:center}.ft-TestingPage__empty-back[_ngcontent-%COMP%]{margin-top:24px}.ft-TestingPage__feedback-show[_ngcontent-%COMP%]{margin:18px 6px 0 8px}.ft-TestingPage__feedback-hide[_ngcontent-%COMP%]{margin-right:8px}.ft-TestingPage__feedback-cancel[_ngcontent-%COMP%], .ft-TestingPage__feedback-hide[_ngcontent-%COMP%]{width:50%}.ft-TestingPage__feedback-textarea[_ngcontent-%COMP%]{box-sizing:content-box}.ft-TestingPage__feedback-textareaContainer[_ngcontent-%COMP%]{margin-top:4px}@media (max-width:756px){.ft-TestingPage[_ngcontent-%COMP%]{flex-direction:column}.ft-TestingPage__leftContainer[_ngcontent-%COMP%]{max-width:100%;min-width:0;height:auto}.ft-TestingPage__question[_ngcontent-%COMP%]{margin-left:0}}"],changeDetection:0}),E),j=((Q=function(){function e(t,n){i(this,e),this.quizController=t,this.router=n}return r(e,[{key:"canActivate",value:function(){return this.quizController.isStarted||this.router.navigate(["home"]),this.quizController.isStarted}}]),e}()).\u0275fac=function(e){return new(e||Q)(g.Xb(h.c),g.Xb(s.b))},Q.\u0275prov=g.Jb({token:Q,factory:Q.\u0275fac}),Q),X=o("zlXg"),D=((R=function(){function e(t){i(this,e),this.questionsService=t}return r(e,[{key:"resolve",value:function(e){return this.questionsService.getList({publish:!0,random:!0,category:Number(e.params.category)})}}]),e}()).\u0275fac=function(e){return new(e||R)(g.Xb(X.a))},R.\u0275prov=g.Jb({token:R,factory:R.\u0275fac}),R),W=((N=function(){function e(){i(this,e)}return r(e,[{key:"canDeactivate",value:function(e,t,n,i){return!e.canDeactivate||e.canDeactivate(t,n,i)}}]),e}()).\u0275fac=function(e){return new(e||N)},N.\u0275prov=g.Jb({token:N,factory:N.\u0275fac}),N),U=o("ihCf"),V=o("fYo3"),B=o("SZVw"),K=[{path:"",pathMatch:"full",component:H,resolve:{questions:D},canActivate:[j],canDeactivate:[W]}],L=((z=function e(){i(this,e)}).\u0275mod=g.Lb({type:z}),z.\u0275inj=g.Kb({factory:function(e){return new(e||z)},providers:[D,j,X.a,W,d.b],imports:[[u.a,f.a,a.c,b.a,C.b,S.b,U.c,c.l,V.a,B.a,s.c.forChild(K)]]}),z)},ycSy:function(e,t,n){"use strict";n.d(t,"a",function(){return u});var o=n("fXoL"),r=n("cWlU"),s=n("ofXK"),c=n("p4Eg");function a(e,t){1&e&&o.Ob(0,"ft-page-footer",3)}var f=["*"],u=function(){var e=function e(){i(this,e),this.headerButtonsConfig={},this.scrolledContent=!0,this.showFooter=!0};return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=o.Hb({type:e,selectors:[["ft-page"]],inputs:{headerButtonsConfig:"headerButtonsConfig",scrolledContent:"scrolledContent",showFooter:"showFooter"},ngContentSelectors:f,decls:6,vars:7,consts:[[1,"ft-flexbox","ft-flex-column","ft-flex-shrink-1","ft-flex-grow-1","ft-height100percent"],[1,"ft-flex-shrink-0",3,"buttonsConfig"],["class","ft-flex-shrink-0",4,"ngIf"],[1,"ft-flex-shrink-0"]],template:function(e,t){1&e&&(o.jc(),o.Tb(0,"div",0),o.Ob(1,"ft-page-header",1),o.Tb(2,"div",0),o.Tb(3,"div"),o.ic(4),o.Sb(),o.Ec(5,a,1,0,"ft-page-footer",2),o.Sb(),o.Sb()),2&e&&(o.Ab(1),o.kc("buttonsConfig",t.headerButtonsConfig),o.Ab(1),o.Fb("Page__scrolledContent",t.scrolledContent),o.Ab(1),o.Cb(t.scrolledContent?"ft-flex-grow-1":"ft-flex-container"),o.Ab(2),o.kc("ngIf",t.showFooter))},directives:[r.a,s.l,c.a],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;flex-shrink:1;flex-grow:1;height:100%;width:100%;min-height:0;min-width:0}.ft-Page__scrolledContent[_ngcontent-%COMP%]{overflow-y:scroll}"],changeDetection:0}),e}()}}])}();