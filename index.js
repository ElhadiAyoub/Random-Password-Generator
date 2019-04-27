//Controls
var result = document.getElementById("result-label");
var val = document.getElementById("val");
var strength = document.getElementById("strength-label");
var toast = document.getElementById("toast");
var regenerate = document.getElementById("refresh");

//Default values

//initializing Parameters
var includeNumbers = true;
var includeLowerCase = true;
var includeUpperCase = true;
var includeSymbols = true;

var passwordLength = 10;

//Character strings
var initialCharStrings = [
    "0123456789",
    "abcdefghijklmnopqrstuvwxyz",
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
];

var charStrings = initialCharStrings.slice();

//UI selection
function select(value, obj) {
    if (!value) {
        obj.style.backgroundColor = "white";
        obj.style.color = "black";
    }
    else {
        obj.style.backgroundColor = "black";
        obj.style.color = "white";
    }
}

//Copy to clipboard
function copy() {
    result.select();
    document.execCommand("copy");
    clearSelection();
    showMessage("Copied to clipboard");
}

//Event listners
var numbersButton = document.getElementById("numbers-button");
numbersButton.addEventListener("click", function () {
    select(includeNumbers, this);
    includeNumbers = !includeNumbers;
    let value = initialCharStrings[0];
    if (includeNumbers)
        charStrings.push(value);
    else
        charStrings.splice(charStrings.indexOf(value), 1);
    getPassword();
    result.value = word;
    check();
});
var lowerCaseButton = document.getElementById("lowercase-button");
lowerCaseButton.addEventListener("click", function () {
    select(includeLowerCase, this);
    includeLowerCase = !includeLowerCase;
    let value = initialCharStrings[1];
    if (includeLowerCase)
        charStrings.push(value);
    else
        charStrings.splice(charStrings.indexOf(value), 1);
    getPassword();
    result.value = word;
    check();
});
var upperCaseButton = document.getElementById("uppercase-button");
upperCaseButton.addEventListener("click", function () {
    select(includeUpperCase, this);
    includeUpperCase = !includeUpperCase;
    let value = initialCharStrings[2];
    if (includeUpperCase)
        charStrings.push(value);
    else
        charStrings.splice(charStrings.indexOf(value), 1);
    getPassword();
    result.value = word;
    check();
});
var symbolsButton = document.getElementById("symbols-button");
symbolsButton.addEventListener("click", function () {
    select(includeSymbols, this);
    includeSymbols = !includeSymbols;
    let value = initialCharStrings[3];
    if (includeSymbols)
        charStrings.push(value);
    else
        charStrings.splice(charStrings.indexOf(value), 1);
    getPassword();
    result.value = word;
    check();
});

//Fisher-Yates shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(charStrings);

//Password generator
function objectExtract(array) {
    return (array[Math.floor(Math.random() * array.length)]);
}

var word;
function getPassword() {
    if (parseInt(val.innerHTML) > 0)
        passwordLength = parseInt(val.innerHTML);
    word = "";
    for (let i = 0; i < passwordLength; i++) {
        word += objectExtract(objectExtract(charStrings));
    }
}

var up = document.getElementById("up");
up.addEventListener("click", function f() {
    if (passwordLength < 20)
        passwordLength++;
    val.innerHTML = passwordLength;
    getPassword();
    result.value = word;
    check();
});

var down = document.getElementById("down");
down.addEventListener("click", function f() {
    if (passwordLength > 0)
        passwordLength--;
    val.innerHTML = passwordLength;
    getPassword();
    result.value = word;
    check();
});

//Clear selection
function clearSelection() {
    var sel;
    if ((sel = document.selection) && sel.empty) {
        sel.empty();
    } else {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        var activeEl = document.activeElement;
        if (activeEl) {
            var tagName = activeEl.nodeName.toLowerCase();
            if (tagName == "textarea" ||
                (tagName == "input" && activeEl.type == "text")) {
                // Collapse the selection to the end
                activeEl.selectionStart = activeEl.selectionEnd;
            }
        }
    }
}

//Check password
function check() {
    if (includeLowerCase && includeUpperCase && includeNumbers && includeSymbols && passwordLength > 7) {
        strength.innerHTML = "STRONG ✓";
        strength.style.color = "#00b894";
    }
    else {
        strength.innerHTML = "WEAK ✗";
        strength.style.color = "#d63031";
    }
}

//On load
getPassword();
result.value = word;
//copy();
check();
showMessage("Touch to copy it :)")

result.addEventListener("click", function () {
    copy();
});

//Print message
function showMessage(message) {
    toast.innerHTML = message;
    toast.style.display = "block";
    toast.style.webkitAnimation = 'none';
    setTimeout(function () {
        toast.style.webkitAnimation = '';
    }, 10);
    setTimeout(function () {
        toast.style.display = "none";
    }, 3000);
}

regenerate.addEventListener("click", function () {
    getPassword();
    result.value = word;
})