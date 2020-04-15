;; (function () {

    $(function () {
        getCategoryList().then((data) => {
            renderCategoryList(data.data);
            bindCategoryEvent();
        })
    });

    /**
     * 初始化的函数
     */
    function init() {

    }

    function renderCategoryList(data) {
        // 用来记录渲染几次超过四次我们需要隐藏一部分
        let count = 0;
        // 唯品服务
        let label = data.label;
        // 品类数据
        let category = data.category;
        // 其他的属性
        let otherData = data.property;
        let html = ``;
        // 首先判断label是否为空 为空我们就不许渲染这个数据
        if (label !== null) {
            label.forEach((item, index) => {
                html += `<div class="filter-group-pos">
                <div class="filter-group clearfix">
                    <h3 class="filter-group-title">${item.name}</h3>
                    <div class="filter-group-content">
                        <div class="filter-group-scroll">
                            <ul class="filter-data-list">`;
                item.labels.forEach((item, index) => {
                    html += `<li class="filter-data-item"><a class="filter-item-link"
                                href="javascript:;" data-id=${item.id}>${item.name}</a></li>`
                })
                html += `</ul>
                        </div>
                    </div>
                    <div class="filter-group-commands is-filter-commands-show">
                        <button class="filter_btn_confirm btn-mini btn-primary">确认</button>
                        <button class="filter_btn_cancel btn-mini btn-default">取消</button>
                    </div>
                    <div class="filter-group-operation">
                        <button class="filter-group-button-multiple" type="button">
                            <span class="filter-group-button-moreicon iconfont icon-jiahao"></span>
                            <span class="filter-group-button-text">多选</span>
                        </button>
                    </div>
                </div>
            </div>`;
            });
            count++;
        }
        // 如果label为null我们就不需要管他了
        if (category !== null) {
            html += `<div class="filter-group-pos">
                <div class="filter-group clearfix">
                    <h3 class="filter-group-title">品类</h3>
                    <div class="filter-group-content">
                        <div class="filter-group-scroll">
                            <ul class="filter-data-list">`;
            category.forEach((item, index) => {
                html += `<li class="filter-data-item"><a class="filter-item-link"
                                href="javascript:;" data-id=${item.cate_id}>${item.cate_name}</a></li>`
            });
            html += `</ul>
                        </div>
                    </div>
                    <div class="filter-group-commands is-filter-commands-show">
                        <button class="filter_btn_confirm btn-mini btn-primary">确认</button>
                        <button class="filter_btn_cancel btn-mini btn-default">取消</button>
                    </div>
                    <div class="filter-group-operation">

                        <button class="filter-group-button-multiple" type="button">
                            <span class="filter-group-button-moreicon iconfont icon-jiahao"></span>
                            <span class="filter-group-button-text">多选</span>
                        </button>
                    </div>
                </div>
            </div>`;
            count++;
        }


        // 如果其他数据不为null渲染数据
        if (otherData !== null) {
            let is_filter_group_hidden = ""

            otherData.forEach((item, index) => {

                if (count >= 4) {
                    is_filter_group_hidden = "is-filter-group-hidden";
                }
                html += `<div class="filter-group-pos ${is_filter_group_hidden}">
                <div class="filter-group clearfix">
                <h3 class="filter-group-title">${item.name}</h3>
                <div class="filter-group-content">
                <div class="filter-group-scroll">
                <ul class="filter-data-list">`;
                item.list.forEach((item, index) => {
                    html += `<li class="filter-data-item"><a class="filter-item-link"
                    href="javascript:;" data-id=${item.id}>${item.name}</a></li>`
                });
                html += `</ul>
                </div>
                </div>
                <div class="filter-group-commands is-filter-commands-show">
                <button class="filter_btn_confirm btn-mini btn-primary">确认</button>
                <button class="filter_btn_cancel btn-mini btn-default">取消</button>
                </div>
                <div class="filter-group-operation">

                <button class="filter-group-button-multiple" type="button">
                <span class="filter-group-button-moreicon iconfont icon-jiahao"></span>
                <span class="filter-group-button-text">多选</span>
                </button>
                </div>
                </div>
                </div>`;
                count++;
            })
        }
        /*    <button class="filter-group-button-expand">
                <span class="filter-group-button-text">更多</span>
                <span class="iconfont icon-xiajiantou"></span>
            </button>
            <button class="filter-group-button-collapse">
                <span class="filter-group-button-text">收起</span>
                <span class="iconfont icon-shangjiantou-copy"></span>
            </button> */
        $(".filter-groups").html(html);

    }

    /**
     * 为菜单选项的绑定一些事件，完成多选更多隐藏显示的功能
     */
    function bindCategoryEvent() {

        $('.choose').on("click", ".filter-group-operation", function () {
            // 这个是将确认和取消按钮显示出来
            // 将选项变为多选框的效果
            $(this).hide().siblings(".is-filter-commands-show").show().prev().find(".filter-group-scroll").css({
                overflow:"auto",
                maxHeight : 94
            }).find(".filter-data-item").css({
                marginTop : 10
            }).find(".filter-item-link").addClass("is-switch-show")
                .on("click", function () {
                    $(this).toggleClass("is-switch-click");
                })
            // 先将选择框的显示显示出来之后我们才可以去绑定点击选择框的事件
        });
        $('.choose').on("click", ".filter_btn_cancel", function () {
            /* 
                unbind
                该方法是用来清空属性的事件的
                为什么使用这个方法
                因为上面点击选择框事件每次都会保留下来 在点击去掉按钮之后呢这个时间还会存在导致下一次点击选择框他会执行两次事件操作
            */
            $(this).parent().hide().siblings(".filter-group-operation").show().prev().prev().find(".filter-group-scroll").scrollTop(0).css({
                overflow:"hidden",
                maxHeight : 16
            }).find(".filter-data-item").css({
                marginTop : 0
            }).find(".filter-item-link").removeClass("is-switch-show is-switch-click").unbind("click");;

        });

        $(".filter-commands").on("click", "button", function () {
            $(".filter-group-pos:gt(4)").toggleClass("is-filter-group-hidden")
            $(this).hide().siblings().show();
        })
    }
    /**
     * 获取选择类别菜单的数据
     */
    function getCategoryList() {
        return $.ajax({
            type: "get",
            url: "https://mapi.vip.com/vips-mobile/rest/shopping/pc/screening/category/get/v2",
            data: {
                app_name: "shop_pc",
                app_version: 4.0,
                warehouse: "VIP_SH",
                fdc_area_id: 103104110,
                client: "pc",
                mobile_platform: 1,
                province_id: 103104,
                api_key: "70f71280d5d547b2a7bb370a529aeea1",
                user_id: "",
                mars_cid: "1586916379082_4f21050de8cc284da6366886163b7623",
                wap_consumer: "a",
                functions: "showLabel",
                useStandardSize: 1,
                brandStoreSns: "",
                brand_id: 100625141,
                _: Date.now()
            },
            dataType: "jsonp",
            jsonpCallback: "getCategoryListCb"
        });
    }
})();