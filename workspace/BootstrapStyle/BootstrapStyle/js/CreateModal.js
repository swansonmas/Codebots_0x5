var divGrid = document.getElementsByClassName('grid_12');
divGrid[0].className += ' modalw3c container';
divGrid[0].childNodes[1].className += ' modal-contentw3c animating';

document.getElementById('button:ln1').parentNode.innerHTML += "<div id='cancelButton' class='btn btn-danger btn-lg'" +">Cancel</div>"


document.getElementById('cancelButton').addEventListener('click', function(){
	divGrid[0].style.display = 'none';

});



divGrid[1].className += ' modalw3c container';
divGrid[1].childNodes[1].className += ' modal-contentw3c animating';

divGrid[1].childNodes[1].childNodes[3].innerHTML += "<span id='cancelButton2' class='btn btn-danger btn-lg'" +">Cancel</span>"

document.getElementById('cancelButton2').addEventListener('click', function(){
	divGrid[2].style.display = 'none';

});