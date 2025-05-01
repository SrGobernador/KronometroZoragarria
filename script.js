// 1. Segunduen kronometroa
let segKrono = 0, intervalSegKrono;

function hasiSegKrono() {
 if (!intervalSegKrono) {
  intervalSegKrono = setInterval(() => {
   segKrono++;
   document.getElementById('segKrono').textContent = segKrono;
  }, 1000);
 }
}

function geldituSegKrono() {
 clearInterval(intervalSegKrono);
 intervalSegKrono = null;
}

function berrezarriSegKrono() {
 geldituSegKrono();
 segKrono = 0;
 document.getElementById('segKrono').textContent = '0';
}

// 2. Kronometro luzea
let kronoLuzea = 0, intervalLuzea;

function hasiKronoLuzea() {
 if (!intervalLuzea) {
  intervalLuzea = setInterval(() => {
   kronoLuzea++;
   const egunak = Math.floor(kronoLuzea / 86400);
   const orduak = String(Math.floor((kronoLuzea % 86400) / 3600)).padStart(2, '0');
   const minutuak = String(Math.floor((kronoLuzea % 3600) / 60)).padStart(2, '0');
   const segunduak = String(kronoLuzea % 60).padStart(2, '0');
   document.getElementById('kronoluzea').textContent = `${egunak}d ${orduak}:${minutuak}:${segunduak}`;
  }, 1000);
 }
}

function geldituKronoLuzea() {
 clearInterval(intervalLuzea);
 intervalLuzea = null;
}

function berrezarriKronoLuzea() {
 geldituKronoLuzea();
 kronoLuzea = 0;
 document.getElementById('kronoluzea').textContent = '0d 00:00:00';
}

// 🔊 Alarma berria atzerako kontaketarako (segunduak)
const alarmaFinala = new Audio("UndertaleOST_ 080-Finale.mp3");
alarmaFinala.loop = true;  // 🔁 Buclean jartzeko

// 🎵 Musika objektua lehenago sortu
let musika = new Audio();
const tinbrea = new Audio("TIMBREA.mp3");
tinbrea.loop = true;

// ⬇️ AUKERATUTAKO ABESTIAREN ALDAKETA
document.getElementById('abestia').addEventListener('change', function () {
 const abestia = this.value;
 if (abestia) {
  musika.src = abestia;
  musika.load();

  // 🎵 Victory izeneko abestiarentzat bolumena murriztu
  if (abestia.includes("Victory")) {
   musika.volume = 0.6;
  } else {
   musika.volume = 1.0;
  }
 }
});

// 3. Atzerako kontaketa (segunduetan)
let atzeraSeg = 0, intervalAtzeraSeg;
let atzeraSegInputa = 0;

function hasiAtzeraSeg() {
 if (intervalAtzeraSeg) return;

 if (atzeraSeg === 0) {
  atzeraSeg = parseInt(document.getElementById('atzeraSegInput').value) || 0;
  atzeraSegInputa = atzeraSeg;
 }

 eguneratuAtzeraSeg();
 const atzeraDiv = document.getElementById('atzeraSeg');
 atzeraDiv.classList.add('atzera-normal');
 atzeraDiv.classList.remove('kolore-aldaketa'); // Eliminar la clase de animación infinita

 intervalAtzeraSeg = setInterval(() => {
  if (atzeraSeg > 0) {
   atzeraSeg--;

   const atzeraDiv = document.getElementById('atzeraSeg');
   atzeraDiv.classList.remove('atzera-normal', 'atzera-hamar', 'atzera-bost', 'atzera-hiru', 'atzera-zero'); // Eliminar clases previas

   if (atzeraSeg >= 6 && atzeraSeg <= 10) {
    atzeraDiv.classList.add('atzera-hamar');
   } else if (atzeraSeg >= 4 && atzeraSeg <= 5) {
    atzeraDiv.classList.add('atzera-bost');
   } else if (atzeraSeg <= 3 && atzeraSeg > 0) {
    atzeraDiv.classList.add('atzera-hiru');
   } else if (atzeraSeg === 0) {
    atzeraDiv.classList.add('atzera-zero');
    clearInterval(intervalAtzeraSeg);
    intervalAtzeraSeg = null;
    alarmaFinala.play();
    atzeraDiv.classList.remove('kolore-aldaketa'); // Ya no necesitamos esta clase
   } else {
    atzeraDiv.classList.add('atzera-normal'); // Estilo por defecto
   }

   eguneratuAtzeraSeg();
  }
 }, 1000);
}

function eguneratuAtzeraSeg() {
 document.getElementById('atzeraSeg').textContent = String(atzeraSeg).padStart(2, '0');
}

function geldituAtzeraSeg() {
 clearInterval(intervalAtzeraSeg);
 intervalAtzeraSeg = null;
 alarmaFinala.pause();      // 🔇 Musikaren etenaldia
 alarmaFinala.currentTime = 0;      // 🔁 Hasierara buelta
}

function berrezarriAtzeraSeg() {
 geldituAtzeraSeg();
 atzeraSeg = 0;
 atzeraSegInputa = 0;
 eguneratuAtzeraSeg();
 const atzeraDiv = document.getElementById('atzeraSeg');
 atzeraDiv.classList.remove('atzera-normal', 'atzera-hamar', 'atzera-bost', 'atzera-hiru', 'atzera-zero');
 atzeraDiv.classList.add('atzera-normal');
}

// 4. Atzerako kontaketa (ordu/minutu/segundu)
let atzeraHMS = 0, intervalHMS;
let aurrekoInputa = 0;

function hasiAtzeraHMS() {
 if (intervalHMS) return;

 if (atzeraHMS === 0) {
   const h = parseInt(document.getElementById('ordu').value) || 0;
   const m = parseInt(document.getElementById('minutu').value) || 0;
   const s = parseInt(document.getElementById('segundu').value) || 0;
   atzeraHMS = h * 3600 + m * 60 + s;
   aurrekoInputa = atzeraHMS;
 }

 eguneratuHMS();

 const atzeraHMSDiv = document.getElementById('atzeraHMS');
 atzeraHMSDiv.classList.add('atzera-hms-normal');

 const abestiSelect = document.getElementById('abestia');
 const abestiIzenburua = abestiSelect.options[abestiSelect.selectedIndex].text;

 let abestiHasiera = 318;

 if (abestiIzenburua.includes("Tictac - Pop Rock")) abestiHasiera = 183;
 else if (abestiIzenburua.includes("Tictac - Pop")) abestiHasiera = 172;
 else if (abestiIzenburua.includes("Tictac - Rock Tecno")) abestiHasiera = 146;
 else if (abestiIzenburua.includes("Tictac - Rock")) abestiHasiera = 177;

 intervalHMS = setInterval(() => {
   if (atzeraHMS > 0) {
     atzeraHMS--;

     const atzeraHMSDiv = document.getElementById('atzeraHMS');
     atzeraHMSDiv.classList.remove('atzera-hms-normal', 'atzera-hms-hamar', 'atzera-hms-bost', 'atzera-hms-hiru', 'atzera-hms-zero');

     let h = String(Math.floor(atzeraHMS / 3600)).padStart(2, '0');
     let m = String(Math.floor((atzeraHMS % 3600) / 60)).padStart(2, '0');
     let s = String(atzeraHMS % 60).padStart(2, '0');
     const tiempoFormateado = `${h}:${m}:${s}`;

     console.log(`atzeraHMS: ${atzeraHMS}, h: ${h}, m: ${m}, s: ${s}, tiempoFormateado: ${tiempoFormateado}`);

     // Comprobación para iniciar la canción en cada intervalo
     if (atzeraHMS <= abestiHasiera && musika.paused) {
       musika.currentTime = abestiHasiera - atzeraHMS;
       musika.play();
     }

     if (atzeraHMS >= 6 && atzeraHMS <= 10) {
       atzeraHMSDiv.classList.add('atzera-hms-hamar');
       atzeraHMSDiv.textContent = tiempoFormateado;
     } else if (atzeraHMS >= 4 && atzeraHMS <= 5) {
       atzeraHMSDiv.classList.add('atzera-hms-bost');
       atzeraHMSDiv.textContent = tiempoFormateado;
     } else if (atzeraHMS <= 3 && atzeraHMS > 0) {
       atzeraHMSDiv.classList.add('atzera-hms-hiru');
       atzeraHMSDiv.textContent = tiempoFormateado;
     } else if (atzeraHMS === 0) {
       atzeraHMSDiv.classList.add('atzera-hms-zero');
       atzeraHMSDiv.textContent = "00:00:00";
       clearInterval(intervalHMS);
       intervalHMS = null;
       tinbrea.play();
     } else {
       atzeraHMSDiv.classList.add('atzera-hms-normal');
       atzeraHMSDiv.textContent = tiempoFormateado;
     }

   } else {
     clearInterval(intervalHMS);
     intervalHMS = null;
     tinbrea.play();
   }
 }, 1000);
}

function eguneratuHMS() {
 const h = String(Math.floor(atzeraHMS / 3600)).padStart(2, '0');
 const m = String(Math.floor((atzeraHMS % 3600) / 60)).padStart(2, '0');
 const s = String(atzeraHMS % 60).padStart(2, '0');
 document.getElementById('atzeraHMS').textContent = `${h}:${m}:${s}`;
}

function geldituAtzeraHMS() {
 clearInterval(intervalHMS);
 intervalHMS = null;
 musika.pause();
 tinbrea.pause();
 tinbrea.currentTime = 0;
}

function berrezarriAtzeraHMS() {
 geldituAtzeraHMS();
 atzeraHMS = 0;
 aurrekoInputa = 0;
 eguneratuHMS();
 const atzeraHMSDiv = document.getElementById('atzeraHMS');
 atzeraHMSDiv.classList.remove('atzera-hms-normal', 'atzera-hms-hamar', 'atzera-hms-bost', 'atzera-hms-hiru', 'atzera-hms-zero');
 atzeraHMSDiv.classList.add('atzera-hms-normal');
}