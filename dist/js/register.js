;; (function () {

    $(function () {
        init();
    });

    /**
     * 初始化函数
     */
    function init() {
        bindEvent();
        formValidate();
    }
    /**
     * 给表单元素绑定事件
     */
    function bindEvent() {
        // 我已同意的checkbox的点击事件
        $(".ui-form-item-group").on("click", "label", function () {

            $(".ui-checkbox-simulation").toggleClass("check-agree")
            $("#mobile_agree").val() === "1" ? $("#mobile_agree").val(0) : $("#mobile_agree").val(1);
            let err_txt = $("#mobile_agree").parent().parent().siblings(".u-input-tip").find(".txt");
            if ($("#mobile_agree").val() === "0") {
                err_txt.show()
            } else {
                err_txt.hide();
            }
        });

        // 每一个表单focus的时候需要提示信息
        $(".ui-form-item-group").one("focus", "input", function(){
            let ipts = $(".ui-form-item-group input");
            let index = ipts.index($(this));
            let ele = $(ipts.get(index)).parent().siblings().find(".txt");
            switch(index){
                case 0 : 
                    ele.html("请输入您的11位手机号码").show();
                    break;
            }
        });
        // 失焦事件
        $(".ui-form-item-group").one("blur", "input", function(){
            let ipts = $(".ui-form-item-group input");
            let index = ipts.index($(this));
            let ele = $(ipts.get(index)).parent().siblings().find(".txt");
            if($(this).val().trim() !== ""){
                return false
            }
            switch(index){
                case 0 : 
                    ele.html("手机号码不能为空").show();
                    break;
                case 1 : 
                    ele.html("验证码不能为空").show();
                    break;
                case 2 : 
                    ele.html("密码不能为空").show();
                    break;
                case 3 :
                    ele.html("请输入确认密码").show();
                    break;
                default :
                    break;
            }

        })
    }

    /**
     * 表单格式验证
     */
    function formValidate() {
        customValidate();
        $("#reg_form").validate({
            rules: {
                loginName: {
                    required: true,
                    format: true
                },
                pvcode: {
                    required: true,
                    digits : true, 
                    minlength : 6
                },
                password: {
                    required: true,
                },
                repeatPassword: {
                    required: true
                },

            },
            messages: {
                loginName: {
                    required: "手机号码不能为空",
                },
                password: {
                    required: "密码不能为空"
                },
                pvcode: {
                    required: "请输入6位数字手机验证码",
                    digits : "请输入6位数字手机验证码",
                    minlength : "请输入6位数字手机验证码"
                },
                repeatPassword: {
                    required: "请输入确认密码"
                },
            },
            errorPlacement: function (error, element) {
                // 判断是否为书籍元素节点
                if ($(element).attr("data-value") === "手机号码") {
                    $("#mobile_verifycode_btn").removeClass("mobile-success");
                }
                let errorText = error[0].innerHTML;
                element.css({
                    borderColor: "#f64a4a"
                })
                element.siblings(".icon-error").show();
                element.siblings(".icon-success").hide();

                element.parent().siblings(".u-input-tip").children("span").show().html(errorText);

            },
            unhighlight: function (element, errorClass, validClass) {
                // 判断是否为书籍元素节点
                if ($(element).attr("data-value") === "手机号码") {
                    $("#mobile_verifycode_btn").addClass("mobile-success");
                }
                $(element).css({
                    borderColor: "#d2c2d2"
                })
                $(element).siblings(".icon-error").hide();
                $(element).siblings(".icon-success").show();

                $(element).parent().siblings(".u-input-tip").children("span").hide()
            }
        });

        // 表单提交的时候也需要验证一次
        $("#mobile-reg-btn").click(function () {
            let isChecked = $("#reg_form").valid();;
            if (!isChecked) {
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
            return this.optional(element) || (regMobile.test(value));
        }, "请输入正确的手机号码");
    }
})();