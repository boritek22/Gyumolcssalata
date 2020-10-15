//Gyümölcsök
let pakli = ['apple', 'banana', 'cherry', 'lemon', 'melon', 'orange', 'peach', 'pineapple', 'plum', 'strawberry'];

var activeElem = null;
var object2 = { kosar1: 2, kosar2: 2, kosar3: 2 };
var darabGyumolcs = { kosar1: 0, kosar2: 0, kosar3: 0 };
var elerhetoP = [];

window.addEventListener('load', init);

function init() {
    parancsgenerator();
    document.getElementById("kartyak").style.display = "table";
    document.getElementById("valasztott").style.display = "table";
}

//kiválasztok random 6 db kártyát a 10-ből
function parancsgenerator() {
    var cardDiv = document.getElementById("kartyak");
    valasztottP = [];
    for (var i = 0; i < 6; ++i) {
        var index = Math.floor(Math.random() * pakli.length);
        var elem = pakli.splice(index, 1)[0];
        elerhetoP.push(elem);
        cardDiv.innerHTML += `<input id='${elem}' onclick='hozzaad(this)' class="kartya" style='background-image: url("media/${elem}_group.png")' type='button'/>`;
    }
}

//Kijelölöm az elemet
function hozzaad(elem) {
    var kijelolt = document.getElementsByClassName("active");
    if (kijelolt.length > 0) {
        kijelolt[0].classList.remove("active");
    }
    valasztottP.push(elem.value);
    elem.classList.add("active");

    activeElem = elem.id;
}

//Berakom a kosárba a gyümölcsöket
function kosarkatt(elem) {
    if (activeElem != null) {
        //Első gyümölcs berakása
        if (darabGyumolcs[elem.id] == 0) {
            var gyumolcsId = elem.id + "_1";
            document.getElementById(gyumolcsId).style.backgroundImage = `url("media/${activeElem}_1.png")`;
            document.getElementById(gyumolcsId).style.display = "inherit";
            kijelolt = document.getElementsByClassName("active");
            kijelolt[0].disabled = true;
            kijelolt[0].style = `filter: grayscale(100%);`
            kijelolt[0].classList.remove("active");
            activeElem = null;
            darabGyumolcs[elem.id]++;

            //Második gyümölcs berakása
        } else if (darabGyumolcs[elem.id] == 1) {
            var elsoGyumolcsId = elem.id + "_1";
            var gyumolcsId = elem.id + "_2";
            document.getElementById(gyumolcsId).style.backgroundImage = `url("media/${activeElem}_1.png")`;
            document.getElementById(gyumolcsId).style.display = "inherit";
            kijelolt = document.getElementsByClassName("active");
            kijelolt[0].disabled = true;
            kijelolt[0].style = `filter: grayscale(100%);`;
            kijelolt[0].classList.remove("active");
            document.getElementById(elsoGyumolcsId).classList.remove("egyedul");
            document.getElementById(elsoGyumolcsId).classList.add("elso_ketten");
            activeElem = null;
            darabGyumolcs[elem.id]++;

            //Leellenőrzöm, nyert-e a játékos
            var winning = (JSON.stringify(darabGyumolcs) === JSON.stringify(object2));
            if (winning == true) {
                document.getElementById("csillag").style.display = "inherit";
            }
        }
    }
}
