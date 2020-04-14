;; (function () {

    $(function () {
        getActivityBrandData();
    });

    /**
     * 获取活动品牌的数据
     */
    function getActivityBrandData() {
        $.ajax({
            url: "https://h5.vip.com/dp/getDataPC",
            dataType: "jsonp",
            data: {
                serviceType: 2,
                componentId: 352241,
                pageSize: 100,
                dataSourceScene: "BRAND_COMPONENT",
                salesQueryFields: "brandStoreInfos,query4BrandFav",
                salesScene: "",
                topSalesList: "",
                pageId: 100016060,
                warehouse: "VIP_SH",
                fdc_area_id: 104104101,
                area_id: 103104110,
                api_key: "70f71280d5d547b2a7bb370a529aeea1",
                mars_cid: "1585923048293_a96d442f0be377ab63fc1790f5d32873",
                is_front: 1,
                _: Date.now()
            },
            success: function (data) {
                let html = ``;
                let res = data.data.items;
                res.forEach((item, index) => {
                    html += `<a href="javascript:void(0)"><div class="brand-inner-box">
                    <div class="brand-inner-item">
                        <div class="brand-img-box">
                            <img data-original="${item.salesImageTags.imageOne.image}" alt="">
                        </div>
                        <div class="brand-info-box">
                            <p class="brand-name">${item.salesName}</p>
                            <p class="benefit-info">${item.salesSellTags.salesAgio.msg}</p>
                        </div>
                    </div>
                </div></a>`;
                });
                $(".brand-list").html(html);
                $(".brand-list img").lazyload({
                    // 覆盖lazyload自带的背景图片
                    placeholder : "",
                    effect: "fadeIn",
                    threshold: 400
                });
            }
        })
    }
})();