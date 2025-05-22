let can = document.querySelector("#gra");
let opis = document.getElementsByName("opis")
let ctx = can.getContext("2d");


const graczT = [];
let pole = [];
let znaki= ['a','b','c','d','e','f','g','h','v','x','y','z','1','2','3','4','5','6','7','8','9','0']
let licz = 0;

function gracz(nazwa, sila, liczba, x, y, x1, y1) {
    this.nazwa = nazwa;
    this.sila = sila;
    this.liczba = liczba;
    this.x = x,
    this.y = y;
    this.x1 = x1;
    this.y1 = y1;
}

for (var i = 0; i < can.width; i++) {
    pole[i] = [];
}


const angleToRadian = function (angle) {
    return Math.PI / 180 * angle;
}

const rand = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function nowylosowygracz() {
    graczT.push(new gracz(znaki[rand(0, znaki.length - 1)] + znaki[rand(0, znaki.length - 1)] + znaki[rand(0, znaki.length - 1)], rand(300, 600), rand(40, 60), rand(0, can.width - 1), rand(0, can.height - 1), rand(0, can.width - 1), rand(0, can.height - 1)));
}

function nowygracz(nazwa, sila, liczba, px, py, px1, py1) {
    graczT.push(new gracz(nazwa, sila, liczba, px, py, px1, py1));
}

function zmianaStanu(gracz,x ,y) {
    gracz.sila--;
    gracz.sila = gracz.sila + pole[x][y];
    if (gracz.sila / gracz.liczba > 10) gracz.liczba++;
    if (gracz.sila / gracz.liczba < 4)
    {
        gracz.liczba--;
        gracz.sila = gracz.sila + 10;
    }
}

function pisz_na_dole(tekst) {
    opis.te
}

function rozmnoz(gracz, x, y) {
    console.log(graczT);
    nowygracz(gracz.nazwa + znaki[rand(0, znaki.length - 1)], Math.floor(gracz.sila / 2), Math.floor(gracz.liczba / 2), gracz.x, gracz.y, rand(0, can.width - 1), rand(0, can.height - 1));
    gracz.sila = Math.floor(gracz.sila / 2);
    gracz.liczba = Math.floor(gracz.liczba / 2);
    pisz_na_dole("Mnozy sie: " + gracz.nazwa + ". Urodzil sie: " + graczT[graczT.length-1].nazwa + ".Teraz jest " + graczT.length + " graczy.")
    }

function ruchgracza() {
    for (let i = 0; i < graczT.length; i++) {
        let x3 = graczT[i].x - graczT[i].x1;
        let y3 = graczT[i].y - graczT[i].y1;
        if (Math.abs(x3) >= Math.abs(y3)) {
            if (x3 > 0) graczT[i].x--
            else
                graczT[i].x++;
        }
        else {
            if (y3 > 0) graczT[i].y--
            else
                graczT[i].y++;
        }

        if (graczT[i].x == graczT[i].x1 && graczT[i].y == graczT[i].y1) {
            graczT[i].x1 = rand(0, can.width - 1);
            graczT[i].y1 = rand(0, can.height - 1);
        }

        zmianaStanu(graczT[i], graczT[i].x, graczT[i].y);

        if (graczT[i].liczba > 100) rozmnoz(graczT[i], graczT[i].x, graczT[i].y);

        if (graczT[i].sila <= 0 || graczT[i].liczba <= 0) {
            pisz_na_dole("Zginal gracz: " + graczT[i].nazwa + ". Teraz jest o jednego mniej");
            graczT.splice(i, 1);
        }
        for (let j = 0; j < graczT.length; j++) {
            pisz_na_dole(graczT[i].x + ":" + graczT[i].y + "---" + graczT[j].x + ":" + graczT[j].y + "        " + i + "    " + j);
        }
    }
}

function spotkanie(tekst) {
    pisz_na_dole(tekst);
}

function rysujgracza() {
    for (let i = 0; i < graczT.length; i++)
    {
        ctx.font = "normal 12px Arial red";
        ctx.fillText(graczT[i].nazwa, graczT[i].x - 5, graczT[i].y - 15);
        ctx.fillText(graczT[i].sila, graczT[i].x-5, graczT[i].y - 5);
        ctx.fillText(graczT[i].liczba, graczT[i].x - 5, graczT[i].y + 15);

        ctx.beginPath();
        ctx.arc(graczT[i].x, graczT[i].y, 4, 0, angleToRadian(360));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(graczT[i].x, graczT[i].y);
        ctx.lineTo(graczT[i].x1, graczT[i].y1);
        ctx.stroke();
    }
}

function rysuj()
{
    ctx.clearRect(0, 0, can.width, can.height);
    ruchgracza();
    rysujgracza();
  
}

function losowaniePierwsze()
{
    stan = false;
    if (stan == false) {
        for (let j = 1; j < can.width; j++)
            for (let k = 1; k < can.width; k++)
                pole[j][k] = 0;

        for (let i = 1; i < (can.width * can.height / 100); i++)
        {
            a = rand(1, can.width-2);
            b = rand(1, can.width-2);
            c = rand(50, 150);
            pole[a][b] = c;
            ctx.fillText(pole[a][b], a,b);

        }
    }
}

function cykl() {

    rysuj();
    licz++;
    if (licz % 100 == 0) {
        
    }
}


losowaniePierwsze();
nowygracz('Pie', 500, 50, 10, 10, 300, 250);
nowylosowygracz();
nowylosowygracz();
nowylosowygracz();
nowylosowygracz();

setInterval(cykl, 100);
