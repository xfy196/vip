;; (function ($) {

    $(function () {
        init();
    });

    /**
     * 初始化的函数
     */
    function init() {
        getCategoryList().then((data) => {
            renderCategoryList(data.data);
            bindCategoryEvent();
        })
        getShopListData().then((data) => {
            // 将数据处理一下 传递给分页进行分页
            pager(data.data.products)
        });
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
                overflow: "auto",
                maxHeight: 94
            }).find(".filter-data-item").css({
                marginTop: 10
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
                overflow: "hidden",
                maxHeight: 16
            }).find(".filter-data-item").css({
                marginTop: 0
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
            url: "../json/listCategory.json",
        });
    }

    /**
     * 加载商品列表的数据
     */
    function getShopListData() {
        return $.ajax({
            type: "get",
            url: "../json/listData.json",
            data: "data",
            dataType: "json",
        });
    }

    /**
     * 商品列表渲染
     * @param {商品数据} data 
     */
    function renderShopListData(data) {
        let html = ``;
        data.forEach((item, index) => {

            html += `<div class="good-item">
            <a href="./detailInfo.html" target="_blank" data-id=${item.productId}>
                <div class="good-item-top">
                    <div class="good-item-img-box">
                        <img class="good-img"
                            data-original="${item.smallImage}"
                            alt="" data-brandId=${item.brandId}>
                    </div>
                    <div class="good-item__corner-tag">
                        <img data-original="${item.icon}"
                            alt="">
                    </div>
                </div>

                <div class="good-item-bottom">
                    <div class="good-item_price">
                        <div class="good-item_main_price">
                            <div class="good-item_price_label"><span
                                    class="good-item_price_label_text">${item.price.priceLabel}</span></div>
                            <div class="good-item_sale_price"><span>¥</span>${item.price.salePrice}</div>
                            <div class="good-item-market_price"><span>¥</span>${item.price.marketPrice}</div>
                            <div class="good-item_discount">${item.price.saleDiscount}</div>
                        </div>
                    </div>
                    <div class="good-item-name good-item-two-line">
                        ${item.title}
                    </div>
                </div>
            </a>
        </div>`
        });
        $(".goods-list .wrap_pro").html(html);
        $(".goods-list .wrap_pro img").lazyload({
            // 覆盖lazyload自带的背景图片
            placeholder: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3544053956,2144358865&fm=26&gp=0.jpg",
            effect: "fadeIn",
            threshold: 400
        });


    }

    /**
     * 分页器
     * @param {分页所需要的数据} data 
     */
    function pager(data) {
        var defaultPageData = 50;
        $('.pager').pagination({
            totalData: data.length,
            showData: defaultPageData,
            coping: true
        });
        // 计算开始下标
        var starIndex = 0;
        $(".pager").on("click", "a[data-page]", function () {
            starIndex = $(this).attr("data-page") - 1;
            renderShopListData(data.slice(starIndex * 50, 50 * starIndex + 50));
        })
        // 上一页和下一页的按钮事件绑定
        $(".pager").on("click", ".next", function () {
            starIndex++;
            renderShopListData(data.slice(starIndex * 50, 50 * starIndex + 50));

        })
        $(".pager").on("click", ".prev", function () {
            starIndex--;
            renderShopListData(data.slice(starIndex * 50, 50 * starIndex + 50));

        })
        renderShopListData(data.slice(starIndex * 50, 50 * starIndex + 50));
    }
})(jQuery);