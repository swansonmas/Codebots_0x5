document.getElementsByClassName('navbar-nav')[0].innerHTML += "<li id='regForm'><a href='#'>JOIN US</a></li>"
document.getElementsByClassName('navbar-nav')[0].innerHTML += "<li id='loginForm'><a href='#'>SIGN IN</a></li>"

document.getElementById('regForm').addEventListener('click', function(){
	divGrid[0].style.display = 'block';

});

document.getElementById('loginForm').addEventListener('click', function(){
	divGrid[1].style.display = 'block';

});


var divGrid = document.getElementsByClassName('grid_12');
divGrid[0].className += ' modalw3c container';
divGrid[0].childNodes[1].className += ' modal-contentw3c animating';

document.getElementById('button:ln1').parentNode.innerHTML += "<div id='cancelButton' class='btn btn-danger btn-lg'" +">Cancel</div>"
document.getElementById('button:ln1').className="btn btn-success btn-lg";

document.getElementById('cancelButton').addEventListener('click', function(){
	divGrid[0].style.display = 'none';

});



divGrid[1].className += ' modalw3c container';
divGrid[1].childNodes[1].className += ' modal-contentw3c animating';

document.getElementById('button:ln9').parentNode.innerHTML += "<div id='cancelButton2' class='btn btn-danger btn-lg'" +">Cancel</div>"
document.getElementById('button:ln9').className="btn btn-success btn-lg";

document.getElementById('cancelButton2').addEventListener('click', function(){
	divGrid[1].style.display = 'none';

});


document.getElementById('page1FormBean').setAttribute("onsubmit","return isPwdMatch()");


