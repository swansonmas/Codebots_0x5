document.getElementsByClassName('navbar-nav')[0].innerHTML += "<li id='regForm'><a href='#'><i class='fa fa-user-plus' aria-hidden='true'></i>JOIN US</a></li>"
document.getElementsByClassName('navbar-nav')[0].innerHTML += "<li id='loginForm'><a href='#'><i class='fa fa-sign-in' aria-hidden='true'></i>SIGN IN</a></li>"

document.getElementById('regForm').addEventListener('click', function(){
	divGrid[0].style.display = 'block';

});

document.getElementById('loginForm').addEventListener('click', function(){
	divGrid[1].style.display = 'block';

});


var divGrid = document.getElementsByClassName('grid_12');
divGrid[0].className += ' modalw3c container';
divGrid[0].childNodes[1].className += ' modal-contentw3c animating';

document.getElementById('button:ln9').parentNode.innerHTML += "<div id='cancelButton' class='btn btn-danger btn-lg'" +">Cancel</div>"
document.getElementById('button:ln9').className="btn btn-success btn-lg";

document.getElementById('cancelButton').addEventListener('click', function(){
	divGrid[0].style.display = 'none';

});



divGrid[1].className += ' modalw3c container';
divGrid[1].childNodes[1].className += ' modal-contentw3c animating';

document.getElementById('button:ln2').parentNode.innerHTML += "<div id='cancelButton2' class='btn btn-danger btn-lg'" +">Cancel</div>"
document.getElementById('button:ln2').className="btn btn-success btn-lg";

document.getElementById('cancelButton2').addEventListener('click', function(){
	divGrid[1].style.display = 'none';

});

document.getElementById('page1FormBean').setAttribute("onsubmit","return isPwdMatch()" );



	document.getElementById('fld1').setAttribute('required', '');
	document.getElementById('fld2').setAttribute('required', '');
	document.getElementById('fld3').setAttribute('required', '');
	document.getElementById('fld4').setAttribute('required', '');
	document.getElementById('fld5').setAttribute('required', '');
	document.getElementById('fld6').setAttribute('required', '');
	
	
	document.getElementById('fld1').setAttribute('placeholder', 'example: John');
	document.getElementById('fld2').setAttribute('placeholder', 'example: Doe');
	document.getElementById('fld3').setAttribute('placeholder', 'example: JohnDoe@gmail.com');
	document.getElementById('fld4').setAttribute('placeholder', 'username');
	document.getElementById('fld5').setAttribute('placeholder', 'strong password');
	document.getElementById('fld6').setAttribute('placeholder', 'repeat password');
	document.getElementById('fld7').setAttribute('placeholder', 'type your username');
	document.getElementById('fld8').setAttribute('placeholder', 'enter your password');
	