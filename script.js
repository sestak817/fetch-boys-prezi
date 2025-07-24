function updateSlidePosition(slides, current, bullets) {
    slides.style.transform = `translateX(-${current * 100}vw)`;
    bullets.forEach(b => b.classList.remove('active'));
    bullets[current].classList.add('active');

    document.querySelectorAll('.slide').forEach((slide, index) => {
        slide.classList.toggle('active', index === current);
    });
}

function main() {
   const slides = document.getElementById('slides');
   const totalSlides = document.querySelectorAll('.slide').length;
   const bulletContainer = document.getElementById('bullets');

   const codeSnippets = [
    `function filterCapitals(capitalList, searchValue) {
      return capitalList.filter(item =>
        item.capital.toLowerCase().includes(searchValue.toLowerCase())
      );
    }`,
    
    `function updateButtons() {
        const currentCity = document.getElementById('currentCity').innerText;
        currentCityIndex = capitalList.findIndex(obj => obj.capital === currentCity);

    prevBtn.disabled = currentCityIndex === 0;
    nextBtn.disabled = currentCityIndex === capitalList.length - 1;
  }`,
    
    `async function getCountriesCurrencies(cc3Url, cc3) {
  const currenciesUrl = cc3Url + cc3;
  const data = await fetchData(currenciesUrl);
  const currencies = data.currencies;
  const currencyDiv = document.getElementById('currency-list');
  
  for (const code in currencies) {
    const currency = currencies[code];
    const currencyEl = document.createElement('p');
    currencyEl.textContent = $ {code} – $ {currency.name} ($ {currency.symbol});
    currencyDiv.appendChild(currencyEl);
  }
}`,
    
    `function renderCapitalsAndCountries(countries){
  const countriesList = document.getElementById('countries-list');
  countries.forEach((country, index) => {
    const countryStructure = 
    <li id="country-$ {index}" class="country-card">
    <h2 id='capital-$ {index}' data-cca3=$ {country.cca3}>$ {country.capital} ($ {country.country})</h2>
    </li>;
    countriesList.insertAdjacentHTML('beforeend', countryStructure);
  });
}`
    ];

   let current = 0;
   const bullets = [];

   document.querySelectorAll('.interactive-list li').forEach(item => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-code-id');
      const codeDisplay = document.getElementById('codeDisplay');
      codeDisplay.textContent = codeSnippets[id];
    });
    });

   for (let i = 0; i < totalSlides; i++) {
    const b = document.createElement('div');
    b.classList.add('bullet');
    bulletContainer.appendChild(b);

    b.addEventListener('click', () => {
        current = i;
        updateSlidePosition(slides, current, bullets);
    });

    bullets.push(b);
   }

   document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && current < totalSlides - 1) {
        current++;
        updateSlidePosition(slides, current, bullets);
    } else if (e.key === 'ArrowLeft' && current > 0) {
        current--;
    } else {
        return;
    }
    updateSlidePosition(slides, current, bullets);
   });

   setTimeout(() => {
        updateSlidePosition(slides, current, bullets);
    }, 100);
}

window.addEventListener('load', main);