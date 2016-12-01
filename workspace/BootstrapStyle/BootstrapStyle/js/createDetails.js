try {
    $('.panel-default img')[0].parentNode.className = 'value col-md-8 img-responsive thumbnail';
    var grids6 = document.getElementsByClassName('grid_6');
    var grid_id = ' ';

    for (var i = 0; i < grids6.length; i++) {
        grid_id = 'grid6_id' + i.toString();
        grids6[i].setAttribute('id', grid_id);

    }

    var grids4 = document.getElementsByClassName('grid_4');
    grid_id = ' ';

    for (var i = 0; i < grids4.length; i++) {
        grid_id = 'grid4_id' + i.toString();
        grids4[i].setAttribute('id', grid_id);

    }

}

catch (err){

}