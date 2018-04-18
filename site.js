/* Your plugin javascript here */
$(function () {
    $.fn.inner_float = function(options) {
        var defaults = {
            top: '50px'
        };
        var setting = $.extend(defaults, options);
        var topInt = setting.top.substr(0, setting.top.indexOf('px'));
        var topInt = parseInt(topInt);
        var box = $(this);
        var boxOffset = box.offset().top;
        var parentOffset = box.parent().offset().top;
        var parentHeight = box.parent().height();
        var parentWidth = box.parent().width();
        var stopFloat = parentOffset + parentHeight - box.height() - topInt;
        $(window).scroll(function(){
            if (boxOffset - $(this).scrollTop() <= topInt) {
                box.removeClass('th1');
                box.removeClass('th3');
                box.addClass('th2');
                box.css({
                    'top' : setting.top,
                    'width' : parentWidth
                });
                if ($(this).scrollTop() > stopFloat) {
                    box.removeClass('th1');
                    box.removeClass('th2');
                    box.addClass('th3');
                    box.css({
                        'bottom' : box.css('bottom')
                    });
                }
            } else {
                box.removeClass('th2');
                box.removeClass('th3');
                box.addClass('th1');
            }
        });
    }
}(jQuery));
/* Call your plugin */
$('#almost-show').inner_float({
    top: "10px"
});