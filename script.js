const lista = document.getElementById('autok');
const adatlap = document.getElementById('adatlap');
const API_URL = 'https://iit-playground.arondev.hu/api/SKHEMO/car';


//Autók listázása
fetch(API_URL)
  .then(res => res.json())
  .then(autok => {
    autok.forEach(auto => {
      const li = document.createElement('li');
      li.textContent = `${auto.brand} ${auto.model}`;
      li.addEventListener('click', () => megjelenitAdatlap(auto.id));
      lista.appendChild(li);
    });
  })
  .catch(error => {
    lista.innerHTML = '<li>Hiba a lista betöltésekor.</li>';
    console.error('Hiba a lista betöltésekor:', error);
  });

// Adatlap megjelenítése
function megjelenitAdatlap(id) {
  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(auto => {
      adatlap.innerHTML = `
        <p><strong>Gyártó:</strong> ${auto.brand}</p>
        <p><strong>Modell:</strong> ${auto.model}</p>
        <p><strong>Tulajdonos:</strong> ${auto.owner}</p>
        <p><strong>Forgalomba helyezés:</strong> ${auto.dayOfCommission}</p>
        <p><strong>Elektromos:</strong> ${auto.electric ? 'Igen' : 'Nem'}</p>
        <p><strong>Fogyasztás:</strong> ${auto.electric ? '0 (elektromos)' : auto.fuelUse + ' l/100km'}</p>
      `;
    })
    .catch(error => {
      adatlap.innerHTML = '<p>Nem sikerült betölteni az autó adatlapját.</p>';
      console.error('Adatlap-hiba:', error);
    });
}
