import "@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css";
import "./css/style.css";
import "bootstrap";
import "jquery/dist/jquery.min";
import "popper.js/dist/popper.min";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/js/all";
import "webpack-jquery-ui";
import "webpack-jquery-ui/css";
import "jquery-ui-touch-punch/jquery.ui.touch-punch.min.js";

$(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $(".add-to-cart-btn").on("click", function () {
        alert("تم إضافة المنتج إلى عربة الشراء");
    });
    $("#copyright").text(
        "جميع الحقوق محفوظة للمتجر سنة " + new Date().getFullYear()
    );
    $(".product-option input[type='radio']").on("change", function () {
        $(this).parents(".product-option").siblings().removeClass("active");
        $(this).parents(".product-option").addClass("active");
    });

    $("[data-product-quantity]").change(function () {
        var newQuantity = $(this).val();
        var parent = $(this).parents("[data-product-info]");
        var pricePerUnit = parent.attr("data-product-price");
        var totalPriceForProduct = newQuantity * pricePerUnit;
        parent
            .find(".total-price-for-product")
            .text(totalPriceForProduct + "$");
        calculateTotalPrice();
    });

    $("[data-remove-from-cart]").click(function () {
        let x = confirm("سيتم حذف المنتج, هل أنت متأكد؟");
        if (x) {
            $(this).parents("[data-product-info]").remove();
            calculateTotalPrice();
        } else return false;
    });

    function calculateTotalPrice() {
        var totalPriceForAllProducts = 0;
        $("[data-product-info]").each(function () {
            var pricePerUnit = $(this).attr("data-product-price");
            var quantity = $(this).find("[data-product-quantity]").val();
            var totalPriceForProduct = pricePerUnit * quantity;
            totalPriceForAllProducts =
                totalPriceForAllProducts + totalPriceForProduct;
        });
        $("#total-price-for-all-products").text(totalPriceForAllProducts + "$");
    }

    const citiesByCountry = {
        sa: ["الرياض", "جدة"],
        eg: ["الأسكندرية", "القاهرة"],
        jo: ["الزرقاء", "عمان"],
        sy: ["حماه", "حلب", "دمشق"],
    };

    $("#form-checkout select[name='country']").on("change", function () {
        let country = $(this).val();
        let cities = citiesByCountry[country];
        $("#form-checkout select[name='city']").empty();
        $("#form-checkout select[name='city']").append(
            '<option disabled selected value="">اختر المدينة</option>'
        );

        cities.forEach((city) => {
            let newOption = $("<option></option>");
            newOption.text(city).val(city);
            $("#form-checkout select[name='city']").append(newOption);
        });
    });

    $("#form-checkout input[name='payment_method']").on("change", function () {
        let paymentMethod = $(this).val();

        if (paymentMethod === "on_delivery") {
            $("#credit-card-info input").prop("disabled", true);
        } else {
            $("#credit-card-info input").prop("disabled", false);
        }
        $("#credit-card-info").toggle();
    });
    $("#price-range").slider({
        range: true,
        min: 50,
        max: 1000,
        step: 50,
        values: [250, 800],
        slide: function (event, ui) {
            $("#price-min").text(ui.values[0]);
            $("#price-max").text(ui.values[1]);
        },
    });
});
