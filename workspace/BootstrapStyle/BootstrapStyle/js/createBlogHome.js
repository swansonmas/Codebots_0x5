document.getElementsByClassName('panel-default')[0].style.border = "none";
document.getElementsByClassName('panel-body')[0].style.border = "1px #ddd solid";

var imgs = document.getElementsByClassName('blob');
for(var i = 0; i < imgs.length; i++){

    imgs[i].className += " img-responsive thumbnail";

}

$("#page2_cell_1 .text p").attr("style", " ");
$("#page2_cell_30 .text p").attr("style", " ");

var temp = " ";
var blogHeaders = $('#page2_cell_1 .string');

for(var i = 1; i < blogHeaders.length; i++){

    temp = blogHeaders[i].innerText;
    blogHeaders[i].innerHTML = "<hr>" + temp;
}


try{


    var grids = document.getElementsByClassName('grid_5')
    var grid_id = ' ';

    for(var i = 0; i < grids.length; i++){
        grid_id = 'grid_id' + i.toString();
        grids[i].setAttribute('id', grid_id);

    }

}
catch (err){
    console.log(err);
}
