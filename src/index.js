import "@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css";
import "./css/style.css";
import "bootstrap";
import "jquery/dist/jquery.min";
import "popper.js/dist/popper.min";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/js/all";

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
});
