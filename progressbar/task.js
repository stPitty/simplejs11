const form = document.forms.form;
const progress = document.getElementById('progress');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const xhr = new XMLHttpRequest();
  xhr.upload.addEventListener('progress', event => {
    progress.value = event.loaded / event.total;
  })

  xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/upload.php');
  xhr.send(new FormData(form));
})