$(document).ready(function($) {

    /* animate skill set */
    $('.skill__level-bar-inner').css('width', '0');
    
    $(window).on('load', function() {
        $('.skill__level-bar-inner').each(function() {
            var itemWidth = $(this).data('level');
            $(this).animate({
                width: itemWidth
            }, 800);
        });

    });
    
});