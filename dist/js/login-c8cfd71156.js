"use strict";$(function(){$(".tab-nav-item").on("click",function(){$(this).addClass("active").siblings().removeClass("active");var i=$(".tab-nav-item").index($(this));$(".login_content").addClass("l-hide").eq(i).removeClass("l-hide")}),$("#submit-btn").click(function(){if(!$("#form").valid())return!1;$.ajax({})}),$(".form-item").one("blur","input",function(){var i=$(".ui-form-item-group input"),r=i.index($(this)),e=$(i.get(r)).parent().siblings().show().find(".txt");if(""!==$(this).val().trim())return!1;switch(r){case 0:e.html("请输入登录名");break;case 1:e.html("请输入密码").show()}}),$.validator.addMethod("format",function(i,r){return this.optional(r)||/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|(147))\d{8}$/.test(i)||/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(i)},"用户名格式错误"),$("#form").validate({rules:{username:{required:!0,format:!0},password:{required:!0}},messages:{username:{required:"用户名不能为空"},password:{required:"密码不能为空"}},errorPlacement:function(i,r){var e=i[0].innerHTML;r.css({borderColor:"#f64a4a"}),r.siblings(".icon-error").show(),r.parent().siblings(".error_msg").show().children("span").html(e)},unhighlight:function(i){$(i).css({borderColor:"#666"}),$(i).siblings(".icon-error").hide(),$(i).parent().siblings(".error_msg").hide()}})});
//# sourceMappingURL=login-c8cfd71156.js.map
