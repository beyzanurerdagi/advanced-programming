
if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(registration => {
        console.log("SW Registered!");
        console.log(registration);
    }).catch(error => {
        console.log("SW Registration Failed!");
        console.log(error);
    });
}

// Word array
var word = ["hangman", "HTML", "code", "CSS", "javascript", "animation","repository","api"];

// Game keyboard
var keyboard = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// Game memory
var select = []
var wordLeft = []
var fail = 0

// Web-page onload
window.onload = function() {
    gId("moveKeyboard").addEventListener('touchmove', function(e) {
        wH = window.innerHeight
        tY = e.touches[0].clientY
        eL = gId("tastatur")
        resY = wH - tY - eL.offsetHeight
        if(resY < 0) {
            resY = 0
        } else if(resY > wH / 2) {
            resY = wH / 2
        }
        eL.style.bottom = resY + "px"
    }, false)
    createKeyboard()
}

// Start game
function startGame() {
    gId("home").className = "h"
    gId("result").className = "h"
    newGame()
}

// New game
function newGame() {
    clearKeyboard()
    clearPlayer()
    createWord()
}

// Clear keyboard
function clearKeyboard() {
    var e = document.getElementsByClassName("b")
    for(i = 0; i < e.length; i++) {
        e[i].setAttribute("data", "")
    }
}

// Clear player
function clearPlayer() {
    fail = 0
    wordLeft = []
    gId("g0").setAttribute("data", "false")
    gId("g1").setAttribute("data", "false")
    gId("g2").setAttribute("data", "false")
    gId("g3").setAttribute("data", "false")
    gId("g4").setAttribute("data", "false")
    gId("g5").setAttribute("data", "false")
    gId("g5").setAttribute("r", "false")
    gId("g5").setAttribute("l", "false")
    gId("g6").setAttribute("data", "false")
    gId("g6").setAttribute("l", "false")
    gId("g6").setAttribute("r", "false")
}

// Get new word
function createWord() {
    var d = gId("letter");
    d.innerHTML = "";
    select = word[Math.floor(Math.random() * word.length)];
    for(i = 0;i<select.length;i++){
        var tmp = select[i].toUpperCase();
        var x = document.createElement("span");
        x.className = "l" + (x == " " ? " ls" : "")
        x.innerHTML = "&nbsp"
        x.id = "l" + i;
        d.appendChild(x)

        if(tmp != " "){
            if(wordLeft.indexOf(tmp) == -1){
                wordLeft.push(tmp);
            }
        }
    }
}

// Create keyboard
function createKeyboard() {
    var tas = gId("keyboard")
    tas.innerHTML = ""
    for(i = 0; i < keyboard.length; i++) {
        var b = document.createElement("span")
        b.className = "b"
        b.innerText = keyboard[i]
        b.setAttribute("data", "")
        b.onclick = function() {
            bTas(this)
        }
        tas.appendChild(b)
    }
}

// Game check, If show next error / game end
function bTas(a) {
    if(a.getAttribute("data") == "") {
        var x = isExist(a.innerText)
        a.setAttribute("data", x)
        if(x) {
            if(wordLeft.length == 0) {
                gameEnd(true)
            }
        } else {
            showNextFail()
        }
    }
}

// If letter "X" exist
function isExist(e) {
    e = e.toUpperCase()
    var x = wordLeft.indexOf(e)
    if(x != -1) {
        wordLeft.splice(x, 1)
        typeWord(e)
        return true
    }
    return false
}

// Show next fail drawing
function showNextFail() {
    fail++
    switch(fail) {
        case 1:
            gId("g0").setAttribute("data", "true")
            break;
        
        case 2:
            gId("g1").setAttribute("data", "true")
            break;
        
        case 3:
            gId("g2").setAttribute("data", "true")
            break;
        
        case 4:
            gId("g3").setAttribute("data", "true")
            break;
        
        case 5:
            gId("g4").setAttribute("data", "true")
            break;
        
        case 6:
            gId("g5").setAttribute("data", "true")
            break;
        
        case 7:
            gId("g5").setAttribute("l", "true")
            break;
        
        case 8:
            gId("g5").setAttribute("r", "true")
            break;
        
        case 9:
            gId("g6").setAttribute("data", "true")
            gId("g6").setAttribute("l", "true")
            break;
        
        case 10:
            gId("g6").setAttribute("r", "true")
            gameEnd(false)
            break;
    }
}

function typeWord(e) {
    for(i = 0; i < select.length; i++) {
        if(select[i].toUpperCase() == e) {
            gId("l" + i).innerText = e
        }
    }
}

// Game result
function gameEnd(e) {
    var d = gId("result")
    d.setAttribute("data", e)
    if(e) {
        gId("rT").innerText = "You Win!"
        gId("rM").innerHTML = "Congratulations, you found the word!<br/><br/>Good Job!"
    } else {
        gId("rT").innerText = "You Lose!"
        gId("rM").innerHTML = "The word was <br/><br/>\"" + select.toUpperCase() + "\"<br/><br/>Better luck next time."
    }
    d.className = ""
}

// Get HTML ID element by name
function gId(a) {
    return document.getElementById(a)
}
