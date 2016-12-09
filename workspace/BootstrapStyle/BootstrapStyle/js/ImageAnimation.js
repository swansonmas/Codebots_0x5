function imageAnimation() {

    var element = document.getElementsByTagName("img");
    for(var i = 0; i < element.length; i ++){

        if(element[i].getBoundingClientRect().top < 750){
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

