$(function () {});

function subcheck(e) {
  var passnew = $("#pwdIp").val();
  var namenew = $("#nameIp").val();
  var cardnew = $("#cardIp").val();
  var pass = $("#pwd").val();

  var errorMessage = document.getElementById("errorname");
  var errorMessage1 = document.getElementById("errorpass");
  var errorMessage2 = document.getElementById("errorcredit");

  var namee = new RegExp("^[A-Z]+$");

  if (!namee.test(namenew)) {
    console.log("Incorrect name");
    errorMessage.innerText = "Enter Uppercase Letters Only";
    e.preventDefault();
  } else {
    errorMessage.innerText = " ";
  }

  if (cardnew.length > 16 || cardnew.length < 16) {
    console.log("Incorrect number");
    errorMessage2.innerText = "Kindly enter correct correct credit card number";
    e.preventDefault();
  } else {
    errorMessage2.innerText = " ";
  }

  var uppercase = new RegExp("[A-Z]");
  var numbers = new RegExp("[0-9]{2}");

  if (!uppercase.test(passnew) || !numbers.test(passnew)) {
    console.log("Incorrect password");
    errorMessage1.innerText =
      "Make sure you enter uppercase letters and atleast two numeric values";
    e.preventDefault();
  } else {
    errorMessage1.innerText = " ";
  }

  if (passnew != pass) {
    console.log("Mismatched Passwords");
    errorMessage1.innerText = "The passwords you entered do not match";
    e.preventDefault();
  } else {
    errorMessage1.innerText = " ";
  }

  return true;
}
