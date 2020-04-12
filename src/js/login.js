(function () {

    $(function () {

        init();
    });

    /**
     * 初始化的函数
     */
    function init(){
        qr_account_hover_switch();
        customValidate();
        validate();
    }
    /**
     * 二维码等录和账号登录切换
     */
    function qr_account_hover_switch() {

        // 事件绑定
        $(".tab-nav-item").on("click", function () {
            $(this).addClass("active").siblings().removeClass("active");
            // 获取active状态的下标
            let index = $(".tab-nav-item").index($(this));
            $(".login_content").addClass("l-hide").eq(index).removeClass("l-hide")
        })
    }

    /**
     * 表单验证
     */
    function validate() {

        $("#form").validate({
            rules: {
                username: {
                    required: true,
                    format: true
                },
                password: {
                    required: true,
                }
            },
            messages: {
                username: {
                    required: "用户名不能为空",
                },
                password: {
                    required: "密码不能为空"
                }
            },
            errorPlacement: function (error, element) {
                console.log(error);
                let errorText = error[0].innerHTML;
                element.siblings(".icon-error").show();
                element.parent().siblings(".error_msg").show().children("span").html(errorText);
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).siblings(".icon-error").hide();
                $(element).parent().siblings(".error_msg").hide()
            }
        });
        // 失焦状态也需要验证一次
        $("form").on("blur", "input", function () {
            $("#form").valid();
        });

        // 表单提交的时候也需要验证一次
        $("#submit-btn").click(function(){
            let isChecked = $("#form").valid();;
            if(!isChecked){
                return false;
            }
            // 如果验证成功我们就发送ajax请求
            $.ajax({

            })
        })
    }

    /**
     * 自定义邮箱，手机号码的正则验证
     */
    function customValidate() {
        $.validator.addMethod("format", function (value, element) {

            let regMobile = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|(147))\d{8}$/;
            let regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            return this.optional(element) || (regMobile.test(value) || regEmail.test(value));
        }, "用户名格式错误");
    }
})();