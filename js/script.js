//  CLICK TOGGLE
(function ($) {
    $.fn.clickToggle = function (func1, func2) {
        var funcs = [func1, func2];
        this.data('toggleclicked', 0);
        this.click(function () {
            var data = $(this).data();
            var tc = data.toggleclicked;
            $.proxy(funcs[tc], this)();
            data.toggleclicked = (tc + 1) % 2;
        });
        return this;
    };
}(jQuery));

$(document).ready(function () {
    var vh = $(window).height();
    $('.cart').height(vh - $("#navbar").height());

    //  CHECKOUT
    if ($("#wrapper_chk").length) {
        $('input[name="cardnumber"]').mask("0000 0000 0000 0000");
        $('input[name="phone"]').mask('(+00) 0000-0000');
        $('input[name="expdate"]').mask('00 / 00');
        $('input[name="cvc"]').mask('000');
        var stp1_pos = $(".stp1").offset().left;
        var stp2_pos = $(".stp2").offset().left;
        var w1 = stp2_pos - stp1_pos
        $(window).on("load resize", function (e) {
            stp1_pos = $(".stp1").offset().left;
            stp2_pos = $(".stp2").offset().left;
            w1 = stp2_pos - stp1_pos
            $('.bar').css('left', stp1_pos + 1);
            if ($('.pay').hasClass("view")) {
                $('.bar').width(w1);
            }
            if ($('.conf').hasClass("view")) {
                $('.bar').width(w1 * 2);
            }
        });
        $('.nextdlvr').click(pay);
        $('.nextdlvr').click(function () {
            setTimeout(function () {
                $('.stp2').addClass("active");
            }, 1000);
        });
        $('.prevpay').click(dlvr);
        $('.prevpay').click(function () {

        });
        $('.nextpay').click(conf);
        $('.nextpay').click(function () {
        });
        $('.prevconf').click(pay);
        $('.prevconf').click(function () {
            $('.stp3').removeClass("active");
        });

        function dlvr() {
            $('.stp1 h4').addClass("txtdown");
            $('.stp2 h4').removeClass("txtdown");
            $('.stp3 h4').removeClass("txtdown");

            $('.dlvr').addClass("view");
            $('.dlvr').removeClass("stepl");
            $('.pay').addClass("stepr");
            $('.conf').addClass("stepr");
            $('.bar').width(0);
            $('.stp3').removeClass("active");
            $('.stp2').removeClass("active");
        }

        function pay() {
            $('.stp1 h4').removeClass("txtdown");
            $('.stp2 h4').addClass("txtdown");
            $('.stp3 h4').removeClass("txtdown");

            $('.pay').addClass("view");
            $('.conf').removeClass("view");
            $('.pay').removeClass("stepr");
            $('.pay').removeClass("stepl");
            $('.dlvr').addClass("stepl");
            $('.conf').addClass("stepr");
            $('.bar').width(w1);
        }

        function conf() {
            $('.stp1 h4').removeClass("txtdown");
            $('.stp2 h4').removeClass("txtdown");
            $('.stp3 h4').addClass("txtdown");

            $('.pay').removeClass("view");
            $('.conf').addClass("view");
            $('.conf').removeClass("stepl, stepr");
            $('.dlvr').addClass("stepl");
            $('.pay').addClass("stepl");
            $('.bar').width(w1 * 2);
            setTimeout(function () {
                $('.stp3').addClass("active");
            }, 1000);
        }

        $('.paypal').click(function () {
            $(this).addClass("activepay");
            $('.card').removeClass("activepay");
            $(".ccard input").prop('disabled', true);
            $(".ccard input").addClass('dsblpay');
            $(".cpaypal input").prop('disabled', false);
            $(".cpaypal input").removeClass('dsblpay');
        });

        $('.card').click(function () {
            $(this).addClass("activepay");
            $('.paypal').removeClass("activepay");
            $(".ccard input").prop('disabled', false);
            $(".ccard input").removeClass('dsblpay');
            $(".cpaypal input").prop('disabled', true);
            $(".cpaypal input").addClass('dsblpay');
        });

    }

    $(".paroller").paroller({ factor: '-0.3', type: 'background', direction: 'vertical' });
    //  TITLE GLITCH
    $('.glitch').glitch({
        minint: 1,
        maxint: 5,
        maxglitch: 15,
        hshift: 5,
        vshift: 10,
        direction: 'random'
    });

    if ($("#wrapper_in").length) {
        $(window).scroll(function (event) {
            var scrollPos = $(this).scrollTop();
            if ($("#insec2").offset().top - 60 < scrollPos) {
                $(".navfiller").addClass("ulfull");
            };
            if ($("#insec2").offset().top - 60 > scrollPos) {
                $(".navfiller").removeClass("ulfull");
            };
        });
    };

    //  NAV MENU
    $('.hamburger').click(function () {
        if ($('.nav').hasClass('navdown') == false) {
            var vw = $(window).width();
            $('.overlay').addClass('olon');
            if ($('.cart').hasClass('cartout')) {
                $('.cart').removeClass('cartout');
                if ($("#wrapper_in").length) {
                    $('.cartfill').removeClass('cartfiller');
                };
                $("#cross").removeClass("animatetop");
                $("#cartic").removeClass("animatebottom");
            };
            $('.cart').removeClass('cartout');
            $('.hamburger').addClass('is-active');
            if ($("#wrapper_in").length) {
                $('.navfiller').addClass('ulfull');
            };
            if ($(".navfiller").width() > vw) {
                $('.nav').addClass('navdown');
            } else {
                setTimeout(function () {
                    $('.nav').toggleClass('navdown');
                }, 100);
            }
        } else {
            $('.hamburger').removeClass('is-active');
            $('.overlay').removeClass('olon');
            $('.nav').removeClass('navdown');
            if ($("#wrapper_in").length) {
                setTimeout(function () {
                    $('.navfiller').removeClass('ulfull');
                }, 400);
            };
        };
    });

    $(".overlay").click(function () {
        $('.hamburger').removeClass('is-active');
        $('.overlay').removeClass('olon');
        $('.nav').removeClass('navdown');
        if ($("#wrapper_in").length) {
            setTimeout(function () {
                $('.navfiller').removeClass('ulfull');
            }, 400);
        };
    });

    //  CART
    $("#cartic").click(function () {
        if ($('.nav').hasClass('navdown')) {
            $('.hamburger').removeClass('is-active');
            $('.nav').removeClass('navdown');
            setTimeout(function () {
                $('.navfiller').removeClass('ulfull');
            }, 400);
        };
        $('.cart').addClass('cartout');
        $('.overlay').addClass('olon');
        if ($("#wrapper_in").length) {
            $('.cartfill').addClass('cartfiller');
        };
        $("#cartic").addClass("animatebottom");
        $("#cross").addClass("animatetop");
    });
    $("#cross, .overlay").click(function () {
        $('.overlay').removeClass('olon');
        $('.cart').removeClass('cartout');
        if ($("#wrapper_in").length) {
            $('.cartfill').removeClass('cartfiller');
        };
        $("#cross").removeClass("animatetop");
        $("#cartic").removeClass("animatebottom");
    });

    var sbtot = 0

    if ($("#wrapper_chk").length) {
        sbtot = 6685
    };

    //  ADD CART 
    $(".addcart").click(function () {
        $('.ctinfo').show();
        $('.cart > h4').hide();
        var cp = $(".cartprod").length + 1
        var wear = $(this).siblings('h3').text();
        var price = $(this).siblings('h4').text();
        var bg = $(this).parent().siblings('a').css('background-image');
        var cart_elmt = `<div class="cartprod cp${cp}"> <div class="cpimg"></div><article class="cptxt"><h2>${wear}</h2><h3>${price}</h3></article><i class="material-icons md-36 md-light cpdel">close</i></div>`;
        $('.prods').append(cart_elmt);
        $('#cartic h3').text(cp);
        $(`.cp${cp} .cpimg`).css('background-image', bg);
        sbtot += 1337
        $('.sbpr').text("$" + sbtot);
    });

    $('.addprod').click(function () {
        $('.ctinfo').show();
        $('.cart > h4').hide();
        var cp = $(".cartprod").length + 1
        var bg = "url('img/jacket.jpg')"
        var cart_elmt = `<div class="cartprod cp${cp}"> <div class="cpimg"></div><article class="cptxt"><h2>Product</h2><h3>$1337</h3></article><i class="material-icons md-36 md-light cpdel">close</i></div>`;
        $('.prods').append(cart_elmt);
        $('#cartic h3').text(cp);
        $(`.cp${cp} .cpimg`).css('background-image', bg);
        sbtot += 1337
        $('.sbpr').text("$" + sbtot);
    });

    $('.cart, .chkcart').on('click', '.cpdel', function () {
        $(this).parent().remove();
        if ($(".cartprod").length == false) {
            $('.ctinfo').hide();
        };
        var cp = $(".cartprod").length + 1
        if (cp == 1) {
            $('#cartic h3').text('');
            $('.cart > h4, .chkcart > h4').show();
        } else {
            $('#cartic h3').text(cp - 1);
        };
        sbtot -= 1337
        $('.sbpr').text("$" + sbtot);
    });

    //  CATEGORIES
    $(window).scroll(function (event) {
        var scrollPos = $(this).scrollTop();
        if (80 < scrollPos) {
            $(".altbtnsmall").addClass("altbtndown");
        };
        if (80 > scrollPos) {
            $(".altbtnsmall").removeClass("altbtndown");
        };
    });
    $(".catbtn").click(function () {
        $(".cat").toggleClass("catout");
    });
    $(".closebtn").click(function () {
        $(".cat").removeClass("catout");
    });
    $(".mencat1, .wmencat1").click(function () {
        $(".cat").removeClass("catout");
        if ($(window).width() < 601) {
            $('html, body').animate({
                scrollTop: $("#jackets").offset().top - 60
            }, 1000);
        } else {
            $('html, body').animate({
                scrollTop: $("#jackets").offset().top - 90
            }, 1000);
        };
    });
    $(".mencat2, .wmencat2").click(function () {
        $(".cat").removeClass("catout");
        if ($(window).width() < 601) {
            $('html, body').animate({
                scrollTop: $("#swshirts").offset().top - 60
            }, 1000);
        } else {
            $('html, body').animate({
                scrollTop: $("#swshirts").offset().top - 90
            }, 1000);
        };
    });
    $(".mencat3, .wmencat3").click(function () {
        $(".cat").removeClass("catout");
        if ($(window).width() < 601) {
            $('html, body').animate({
                scrollTop: $("#tshirts").offset().top - 60
            }, 1000);
        } else {
            $('html, body').animate({
                scrollTop: $("#tshirts").offset().top - 90
            }, 1000);
        };
    });
    $(".mencat4, .wmencat4").click(function () {
        $(".cat").removeClass("catout");
        if ($(window).width() < 601) {
            $('html, body').animate({
                scrollTop: $("#shoes").offset().top - 60
            }, 1000);
        } else {
            $('html, body').animate({
                scrollTop: $("#shoes").offset().top - 90
            }, 1000);
        };
    });
    $('.prodimg').slick({
        dots: true
    });
});