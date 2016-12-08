document.getElementsByClassName('navbar-nav')[0].innerHTML += "<li id='regForm'><a href='#'><i class='fa fa-user-plus' aria-hidden='true'></i>JOIN US</a></li>"
document.getElementsByClassName('navbar-nav')[0].innerHTML += "<li id='loginForm'><a href='#'><i class='fa fa-sign-in' aria-hidden='true'></i>SIGN IN</a></li>"

document.getElementById('regForm').addEventListener('click', function(){
	document.getElementById('regForm_id').className = '';

});

document.getElementById('pretendReg').addEventListener('click', function(){
	document.getElementById('fld1').value =  document.getElementById('pretendfl1').value;
	document.getElementById('fld2').value =  document.getElementById('pretendfl2').value;
	document.getElementById('fld3').value =  document.getElementById('pretendfl3').value;
	document.getElementById('fld4').value =  document.getElementById('pretendfl4').value;
	document.getElementById('fld5').value =  document.getElementById('pretendfl5').value;
	document.getElementById('fld6').value =  document.getElementById('pretendfl6').value;


	var fn = document.getElementById('pretendfl1').value;
	var ln = document.getElementById('pretendfl2').value;
	var email = document.getElementById('pretendfl3').value;
	var usr = document.getElementById('pretendfl4').value;

	var psw1 = document.getElementById("pretendfl5").value;
	var psw2 = document.getElementById("pretendfl6").value;

	if (psw1 != psw2) {

		document.getElementById("pretendfl5").style.borderColor = "#E34234";
		document.getElementById("pretendfl6").style.borderColor = "#E34234";
		$('#pwdChk').show();

	}

	else{

		document.getElementById("button:ln9").click();
	}



});

document.getElementById('logbox').addEventListener("keypress", function(event){
	if(event.which === 13){
		document.getElementById('pretenderLogin').click();
		document.getElementById('pretendReg').click();

	}
});


document.getElementById('loginForm').addEventListener('click', function(){
	document.getElementById('loginForm_id').className= ' ';
});

document.getElementById('pretenderLogin').addEventListener('click', function(){
	document.getElementById('fld7').value =  document.getElementById('userNameValue').value;
	document.getElementById('fld8').value =  document.getElementById('passwordContent').value;

	var loginUsr = document.getElementById("userNameValue").value;
	var loginPwd = document.getElementById("passwordContent").value;

	if (loginUsr === '') {
		document.getElementById("userNameValue").style.borderColor = "#E34234";
		$('#checkUserName').show();
	}
	else if(loginPwd === ''){
		document.getElementById("passwordContent").style.borderColor = "#E34234";
		$('#checkPwd').show();


	}
	else{

		document.getElementById('button:ln2').click();

	}



});




document.getElementById('userNameValue').addEventListener("keypress", function(event){
	if(event.which === 13){
		document.getElementById('pretenderLogin').click();
	}
});

document.getElementById('passwordContent').addEventListener("keypress", function(event){
	if(event.which === 13){
		document.getElementById('pretenderLogin').click();
	}
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



document.getElementById('pretendfl1').setAttribute('required', '');
document.getElementById('pretendfl2').setAttribute('required', '');
document.getElementById('pretendfl3').setAttribute('required', '');
document.getElementById('pretendfl4').setAttribute('required', '');
document.getElementById('pretendfl5').setAttribute('required', '');
document.getElementById('pretendfl6').setAttribute('required', '');

document.getElementById('pretendfl4').setAttribute('pattern', '^[\\w]{6,20}$');

document.getElementById('createAccount').addEventListener('click', function(){

	document.getElementById('loginForm_id').className= 'modalw3c';
	document.getElementById('regForm_id').className = '';

});

document.getElementById('login_id').addEventListener('click', function(){

	document.getElementById('regForm_id').className= 'modalw3c';
	document.getElementById('loginForm_id').className = '';

});

document.getElementById('closeSpan').addEventListener('click', function(){

	document.getElementById('regForm_id').className= 'modalw3c';
});



document.getElementById('closeSpan').addEventListener('click', function(){

		document.getElementById('regForm_id').className= 'modalw3c';
	});

document.getElementById("cancelLoginForm").addEventListener('click', function(){

		document.getElementById("loginForm_id").className= 'modalw3c';

	});


document.getElementById("pretendfl6").addEventListener("keyup", function(){

	var pretendPassword = document.getElementById('pretendfl5').value;
	var confirmPassword = document.getElementById('pretendfl6').value;

	if(pretendPassword === confirmPassword){
		$("#pretendfl6").css({"background":"url('BootstrapStyle/css/imgs/valid.png') no-repeat 98% center"})
		$('#pwdChk').hide();
	}
	else{
		$("#pretendfl6").css({"background":"url('BootstrapStyle/css/imgs/invalid.PNG') no-repeat 98% center"})
		$('#pwdChk').show();
	}


})
