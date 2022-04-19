const xhr = new XMLHttpRequest();
const items = document.getElementById('items');
const loader = document.querySelector('.loader');

function renderCurrency(currency) {

  const item = `
                <div class="item">
                  <div class="item__code">${currency.CharCode}</div>
                  <div class="item__value">${currency.Value}</div>
                  <div class="item__currency">руб.</div>
                </div>`;

  items.insertAdjacentHTML('beforeend', item);
  return true
}


xhr.addEventListener('readystatechange', () => {
  if (xhr.readyState === xhr.DONE) {
    loader.classList.remove('loader_active');

    const response = JSON.parse(xhr.responseText);

    for (let currency in response.response.Valute) {
      renderCurrency(response.response.Valute[currency]);
    }
  }
})

xhr.open('GET', 'https://netology-slow-rest.herokuapp.com/');
xhr.send()