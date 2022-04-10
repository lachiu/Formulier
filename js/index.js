// https://eduweb.thomasmore.be/r0903794/js-pe/js-pe-r0903794-thomas_more.html
// https://github.com/lachiu/Formulier
// Var declaratie
var errors = [];

function checkEmptyField(veld, melding) {    
    if (veld != 0 && veld) {
        return false;
    } else {        
        errors.push(melding);
        return true;
    }
}

function validateEmail(email) {
    // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    var result = regex.test(email.value);
    if (!checkEmptyField(email.value, "Het veld email-adres is verplicht.<br>")) {
        if (result) {
            // geldig
            return true;
        } else {
            // ongeldig        
            errors.push("E-mailadres is niet correct.<br>");
            return false;
        }   
    }    
}

function validatePassword(pwd, hhpwd) {
    if (!checkEmptyField(pwd.value, "Het veld wachtwoord is vereist.<br>") && !checkEmptyField(hhpwd.value, "Het veld herhaal wachtwoord is vereist.<br>")) {
        if (pwd.value == hhpwd.value) {
            if (pwd.value.length < 8) {
                errors.push("Uw wachtwoord is te kort.<br>")
            }
        } else {
            errors.push("Uw wachtwoorden zijn niet gelijk.<br>");
        }    
    }
}

function validatePayment(veld) {
    if (veld.checked) {
        document.getElementById("paymentoption").textContent = "Je hebt gekozen om de betaling te voltooien via " + veld.value + ".";    
    }
}

function checkPC(veld) {
    if (!checkEmptyField(veld.value, "Het veld postcode is vereist.<br>")) {
        console.log(veld.value);
        if (parseInt(veld.value) < 1000 || parseInt(veld.value) > 9999) {
            errors.push("De waarde van postcode moet tussen 1000 en 9999 liggen.<br>");
        }
    }
}

function checkedConditions(conditions) {
    if (!conditions) {
        errors.push("Je moet de algemene voorwaarden accepteren.<br>");
    }
}

function validateForm() {
    var fname = document.getElementById("fname");
    var lname = document.getElementById("lname");
    var uname = document.getElementById("username");
    var mail = document.getElementById("mail");
    var pwd = document.getElementById("pwd");
    var hhpwd = document.getElementById("hhpwd");
    var adres = document.getElementById("adres");
    var country = document.getElementById("country");
    var province = document.getElementById("province");
    var zip = document.getElementById("zip");
    var news = document.getElementById("news").checked;
    var conditions = document.getElementById("conditions").checked;
    var app = document.getElementById("app");
    var bank = document.getElementById("bank");
    var visa = document.getElementById("visa");
    var paypal = document.getElementById("paypal");
    var standaard = document.getElementById("default");
    var error = document.getElementById("error");
    var errormessages = document.getElementById("errormeldingen");
    var succes = document.getElementById("succes");
    var betalingswijze = document.getElementById("betalingswijze");
    standaard.classList.add("visually-hidden");
    const paymentoptions = [
        app,
        bank,
        visa,
        paypal
    ];

    const toCheckFields = [
        fname,
        lname,
        uname,
        adres,
        country,
        province
    ]

    // Functie validatie
    toCheckFields.forEach(element => {
        checkEmptyField(element.value, "Het veld " + element.name + " is vereist.<br>");    
    });
    validateEmail(mail);
    validatePassword(pwd, hhpwd);
    checkPC(zip);
    checkedConditions(conditions);

    // De magic
    if (errors[0]) {        
        error.classList.remove("visually-hidden");
        succes.classList.add("visually-hidden");
        betalingswijze.classList.add("visually-hidden");
        errormessages.innerHTML = "";
        errors.forEach(element => {
            errormessages.innerHTML += element;
        });
        errors = [];
    } else {
        paymentoptions.forEach(element => {
            validatePayment(element);
        });

        error.classList.add("visually-hidden");
        succes.classList.remove("visually-hidden");
        betalingswijze.classList.remove("visually-hidden");
    }    
}