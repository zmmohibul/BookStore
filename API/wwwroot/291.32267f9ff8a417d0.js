"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[291],{291:(v,u,i)=>{i.r(u),i.d(u,{AuthenticationModule:()=>C});var l=i(3060),e=i(4650);let p=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-register"]],decls:2,vars:0,template:function(t,r){1&t&&(e.TgZ(0,"p"),e._uU(1,"register works!"),e.qZA())}}),n})();var c=i(7053),g=i(6769),a=i(4006);let m=(()=>{class n{constructor(t,r){this.authService=t,this.router=r,this.model={userName:"",password:""}}login(){this.authService.login(this.model).subscribe({next:t=>{this.router.navigateByUrl("Admin"==t.role?"admin":"")}})}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(c.$),e.Y36(l.F0))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-login"]],decls:18,vars:2,consts:[[1,"text-center","mt-5","mb-4"],[1,"display-5","fw-normal"],[1,"d-flex","justify-content-center","align-items-center"],[1,"text-center",2,"width","25rem"],[3,"ngSubmit"],["loginForm","ngForm"],[1,"input-group","mb-4"],["name","username","type","text","placeholder","Username ","aria-label","Username","aria-describedby","basic-addon1",1,"form-control",3,"ngModel","ngModelChange"],[1,"input-group","mb-3"],["name","password","type","password","placeholder","Password","aria-describedby","basic-addon2",1,"form-control",3,"ngModel","ngModelChange"],["type","submit",1,"btn","btn-dark","btn-block","my-4","mb-5"],[1,"fw-normal"],["type","button","mdbRipple","","rippleColor","dark",1,"btn","btn-outline-dark"]],template:function(t,r){1&t&&(e.TgZ(0,"div")(1,"div",0)(2,"h2",1),e._uU(3,"Login"),e.qZA()(),e.TgZ(4,"div",2)(5,"div",3)(6,"form",4,5),e.NdJ("ngSubmit",function(){return r.login()}),e.TgZ(8,"div",6)(9,"input",7),e.NdJ("ngModelChange",function(s){return r.model.userName=s}),e.qZA()(),e.TgZ(10,"div",8)(11,"input",9),e.NdJ("ngModelChange",function(s){return r.model.password=s}),e.qZA()(),e.TgZ(12,"button",10),e._uU(13," Submit "),e.qZA()(),e.TgZ(14,"h5",11),e._uU(15,"Don't have an account?"),e.qZA(),e.TgZ(16,"button",12),e._uU(17," Register "),e.qZA()()()()),2&t&&(e.xp6(9),e.Q6J("ngModel",r.model.userName),e.xp6(2),e.Q6J("ngModel",r.model.password))},dependencies:[g.e,a._Y,a.Fj,a.JJ,a.JL,a.On,a.F]}),n})();const h=[{path:"login",component:m},{path:"register",component:p},{path:"",component:m}];let f=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[l.Bz.forChild(h),l.Bz]}),n})();var b=i(7661);let C=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[f,b.m]}),n})()}}]);