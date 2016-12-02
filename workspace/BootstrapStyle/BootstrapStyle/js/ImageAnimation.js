function isScrolledIntoView(el) {
    var elemTop = el.getBoundingClientRect().top;
    var elemBottom = el.getBoundingClientRect().bottom;

    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    return isVisible;
}

function 	navbarScroll(){
    window.addEventListener('scroll', function(e) {
        last_known_scroll_position = window.scrollY;


        var navBar = $('#topNavigationbar');
        var el = document.getElementById('topNavigationbar');
        isScrolledIntoView(el);

        if (isScrolledIntoView && last_known_scroll_position > 0) {
            navBar.addClass('navbar-inverse');
            navBar.addClass('navbar-fixed-top');
            navBar.removeClass('navbar-default');

            navBar.addClass('blackBackground');
            navBar.removeClass('blueBackground');

        }
        else{
            navBar.removeClass('navbar-inverse');
            navBar.addClass('navbar-default');
            navBar.addClass('blueBackground');
            navBar.removeClass('navbar-fixed-top');
            navBar.removeClass('blackBackground');

        }


    });
}

jQuery('document').ready(function(){

    navbarScroll();
});