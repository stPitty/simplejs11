const xhr = new XMLHttpRequest();
const card = document.querySelector('.card');
document.querySelector('.poll').remove();

function showResults(id, index) {
  const xhr = new XMLHttpRequest;
  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE) {
      document.getElementById('poll__answers').remove();
      for (let stat of JSON.parse(xhr.response).stat) {
        console.log(stat);
        const poll = document.querySelector('.poll');
        const answer = document.createElement('div');
        answer.style.marginBottom = '0px';
        answer.classList.add('poll__title');
        answer.innerHTML = `${stat.answer}: <b>${stat.votes}</b>`;
        poll.insertAdjacentElement('beforeend', answer);
      }
    }
  })

  xhr.open( 'POST', 'https://netology-slow-rest.herokuapp.com/poll.php' );
  xhr.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
  xhr.send( `vote=${id}&answer=${index}` );
}


xhr.addEventListener('readystatechange', () => {
  if (xhr.readyState === xhr.DONE) {
    const response = JSON.parse(xhr.response);
    const question = document.createElement('div');
    question.classList.add('poll');
    question.innerHTML = `
    <div class="poll__title" id="poll__title">${response.data.title}</div>
    <div class="poll__answers poll__answers_active" id="poll__answers"></div>
    `
    const answers = question.querySelector('.poll__answers')
    for (let answer of response.data.answers) {
      const button = document.createElement('button');
      button.classList.add('poll__answer');
      button.textContent = answer;
      button.addEventListener('click', () => {
        alert('Спасибо, ваш голос засчитан!');
        const index = response.data.answers.indexOf(answer);
        showResults(response.id, index);
      })
      answers.insertAdjacentElement('beforeend', button)
    }
    card.insertAdjacentElement('beforeend', question);
  }
})

xhr.open('GET', ' https://netology-slow-rest.herokuapp.com/poll.php');
xhr.send();

