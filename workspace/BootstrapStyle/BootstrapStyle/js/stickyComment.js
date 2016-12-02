function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var html = document.documentElement;
    return rect.top >=0;

}

function stickyComment(){
    var el = document.getElementById('grid6_id0');

    if(!isInViewport(el) && window.innerWidth >=680){

        $('#grid4_id0').css({"position":"fixed", "top":"50px"});

    }
    else{$('#grid4_id0').css({"position":"static"})}

}



if(window.innerWidth >=680){

    document.getElementsByTagName("body")[0].setAttribute("onscroll","stickyComment()");

}
