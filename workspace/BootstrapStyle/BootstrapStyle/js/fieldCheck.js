function isPwdMatch() {

    var psw1 = document.getElementById("fld5").value;
    var psw2 = document.getElementById("fld6").value;
    
    var fn = document.getElementById("fld1").value;
    var ln = document.getElementById("fld2").value;
    var email = document.getElementById("fld3").value;
    var usrname = document.getElementById("fld4").value;
    var userpwd = document.getElementById("fld5").value;
   
    console.log(psw1);
    console.log(psw2);
    var ok = true;
    if (psw1 != psw2) {
        alert("Passwords Do Not Match");
        document.getElementById("fld5").style.borderColor = "#E34234";
        document.getElementById("fld6").style.borderColor = "#E34234";
        ok = false;
    }
    if(fn === ''){
    	
        document.getElementById("fld1").style.borderColor = "#E34234";
        ok = false;
    	
    }

    else if(ln === ''){
        
        document.getElementById("fld2").style.borderColor = "#E34234";
        ok = false;

    }

    else if(email === ''){
       
        document.getElementById("fld3").style.borderColor = "#E34234";
        ok = false;

    }

    else if(usrname === ''){
        
        document.getElementById("fld4").style.borderColor = "#E34234";
        ok = false;

    }
    
    return ok;
}