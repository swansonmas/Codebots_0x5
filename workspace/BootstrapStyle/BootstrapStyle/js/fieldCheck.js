function isPwdMatch() {

    var psw1 = document.getElementById("pretendfl5").value;
    var psw2 = document.getElementById("pretendfl6").value;

    var ok = true;
    if (psw1 != psw2) {
        alert("Passwords Do Not Match");
        document.getElementById("pretendfl5").style.borderColor = "#E34234";
        document.getElementById("pretendfl6").style.borderColor = "#E34234";
        ok = false;
    }

    return ok;
}