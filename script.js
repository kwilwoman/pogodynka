// let elementDzisTemp = document.querySelector(".pogodaAktualna .temp");
// let elementDzisZachmurzenie = document.querySelector(".pogodaAktualna .zachmurzenie");

// let elementJutroTemp = document.querySelector(".pogodaJutro .temp");
// let elementJutroZachmurzenie = document.querySelector(".pogodaJutro .zachmurzenie");

// let elementPrzycisk = document.querySelector("#przycisk");

// function pobierzDane() {
//   // ...
// }

// document.querySelector("#przycisk").addEventListener("click", pobierzDane);

function pokazSzczegoly(event) {
  console.log(event);

  const obecnieRozwiniety = document.querySelector('.rozwiniety');
  if (obecnieRozwiniety) {
    obecnieRozwiniety.classList.remove('rozwiniety');
  }

  const kliknietyElement = event.target;
  const elementSzczegoly = kliknietyElement.parentNode.querySelector('.szczegoly');
  elementSzczegoly.classList.add('rozwiniety');


}

function ustawPrognoze(idKolumny, obiektPrognozy) {
  document.querySelector(idKolumny + ' .wartoscTemperatura').innerHTML = obiektPrognozy.temperatura;
  document.querySelector(idKolumny + ' .wartoscWiatrPredkosc').innerHTML = obiektPrognozy.wiatrPrędkość;
  document.querySelector(idKolumny + ' .wartoscWiatrKierunek').innerHTML = obiektPrognozy.wiatrKierunek;
  document.querySelector(idKolumny + ' .wartoscWiatrKierunekSlownie').innerHTML = obiektPrognozy.wiatrKierunekSłownie;
  document.querySelector(idKolumny + ' .wartoscOpis').innerHTML = obiektPrognozy.opis;
  document.querySelector(idKolumny + ' .wartoscZachmurzenie').innerHTML = obiektPrognozy.zachmurzenie;
  document.querySelector(idKolumny + ' .wartoscWschodSlonca').innerHTML = obiektPrognozy.wschódSłońca;
  document.querySelector(idKolumny + ' .wartoscZachodSlonca').innerHTML = obiektPrognozy.zachódSłońca;
  document.querySelector(idKolumny + ' .elementIkonka').src = "images/" + obiektPrognozy.ikonka +".png";
}

async function pokazPogode(miasto) {
  // const miasto = document.getElementById('wyszkiwarkaMiastInput').value;
  // if (miasto.length == 0) {
  //   return;
  // }
  
  document.querySelectorAll('.loading').forEach(function(e) {
    e.style.display = 'block';
  });

  const res = await fetch("https://wowapi.pl/pogoda/prognoza?miasto=" + miasto);
  const pogodaJson = await res.json();
  document.getElementById('aktualizacja').innerHTML = pogodaJson.aktualizacja;
  
  document.querySelectorAll('.loading').forEach(function(e) {
    e.style.display = 'none';
  });

  ustawPrognoze('#kolumnaTeraz', pogodaJson.teraz);
  ustawPrognoze('#kolumnaDzis', pogodaJson.prognoza.dziś);
  ustawPrognoze('#kolumnaJutro', pogodaJson.prognoza.jutro);
  ustawPrognoze('#kolumnaPojutrze', pogodaJson.prognoza.pojutrze);
  

  console.log(pogodaJson);
}

async function pobierzMiasta() {
  const res = await fetch("https://www.wowapi.pl/pogoda/miasta");
  const miasta = await res.json();
  miasta.forEach(function(miasto) {
    let przycisk = document.createElement('button');
    przycisk.innerText=miasto.nazwa;
    przycisk.addEventListener('click', function() {
      pokazPogode(miasto.nazwa);
    })
    document.getElementById('miasta').appendChild(przycisk)
  });

 
}

pobierzMiasta();

// document.querySelectorAll(".rozwinSzczegoly").addEventListener("click", pokazSzczegoly);

// rozwinSzczegoly