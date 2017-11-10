$('.content-bar-topProduct button').on('click', function () {
    $('.viev-hidden').toggleClass('active');
    if ($('.viev-hidden').hasClass('active')) {
        $(this).html('View all products');
    } else {
        $(this).html('Hide products');
    }
})
$('.fifteen__inner').addClass('active');
$('.fifteen__inner').animate({ num: 15/* - начало */ }, {

    duration: 3000,
    step: function (num) {
        this.innerHTML = num.toFixed(0) + '<span>%</span>'
    }
});