document.getElementsByClassName('plain')[0].setAttribute("id", "firstPlain");

document.getElementsByClassName('panel-default')[0].style.border = "none";
document.getElementsByClassName('panel-body')[0].style.border = "1px #ddd solid";
document.getElementsByClassName('panel-title')[0].className += " blogTitle";
$('#firstPlain .row a').each(function(){ $(this).addClass('btn btn-lg buttonw3c')})

var readMoreAnchorTags = $('#firstPlain .row a');

for(var i = 0; i < readMoreAnchorTags.length; i++){

    readMoreAnchorTags[i].innerHTML = '<span>READ MORE</span>'

}

var imgs = document.getElementsByClassName('blob');
for(var i = 0; i < imgs.length; i++){

    imgs[i].className += " img-responsive thumbnail";

}


$('#firstPlain .string').each(function(){$(this).addClass('myHeader');})

var subContent = " ";
var partOfContent = document.getElementsByClassName('text');

for(var i = 0; i < partOfContent.length; i++){
    subContent = partOfContent[i].childNodes[1].innerText;
    subContent = subContent.replace(/(([^\s]+\s\s*){30})(.*)/,"$1…");
    partOfContent[i].childNodes[1].innerText = subContent;

}

var temp = " ";
var blogHeaders = document.getElementsByClassName('myHeader');

for(var i = 1; i < blogHeaders.length; i++){

    temp = blogHeaders[i].innerText;
    blogHeaders[i].innerHTML = "<hr>" + temp;
}



var textParagraphTags = document.getElementsByClassName('text');
for(var i = 0; i < textParagraphTags.length; i++){

   
   
   for(var j = 0; j < textParagraphTags[i].getElementsByTagName('p').length; j++){
   
   		textParagraphTags[i].getElementsByTagName('p')[j].setAttribute("style", " ");
   }
   
    textParagraphTags[i].className += " blogParagraphs well";
}




document.getElementsByClassName('grid_5')[2].childNodes[1].className += 'fixedMargingV2';


var descriptionAnchors = $('.col-md-12').find('a#ln7');
for(var i = 0; i < descriptionAnchors.length; i++){

descriptionAnchors[i].className += ' btn-outline-primary';
}

var descriptionAnchors = $('.col-md-12').find('a#ln8');

for(var i = 0; i < descriptionAnchors.length; i++){

descriptionAnchors[i].className += ' btn-outline-info';
}

document.getElementsByClassName('col-md-offset-2')[0].childNodes[1].className= ' ';


var timeElement = document.getElementsByClassName('timestamp');
for(var i = 0; i < timeElement .length; i++){

    timeElement [i].className += " glyphicon glyphicon-time";

}

