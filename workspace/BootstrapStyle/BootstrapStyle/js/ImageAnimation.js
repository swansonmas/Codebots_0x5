function imageAnimation() {

    var element = document.getElementsByTagName("img");
    var elementControl = $(".string");

    for(var i = 0; i < element.length; i ++){

        if((elementControl[i].getBoundingClientRect().top+10) < window.innerHeight){
            element[i].className = "zoomInLeft animated";
        }
        else{
            element[i].className = " ";
        }

    }

}

window.addEventListener("scroll", function(){


    imageAnimation();



});

