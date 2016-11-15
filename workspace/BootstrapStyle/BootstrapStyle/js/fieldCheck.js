function isPwdMatch() {
    var psw1 = document.getElementById("fld13").value;
    var psw2 = document.getElementById("fld14").value;
    console.log(psw1);
    console.log(psw2);
    var ok = true;
    if (psw1 != psw2) {
        alert("Passwords Do Not Match");
        document.getElementById("fld13").style.borderColor = "#E34234";
        document.getElementById("fld14").style.borderColor = "#E34234";
        ok = false;
    }

    console.log(ok);
    return ok;
}