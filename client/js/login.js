const url = 'https://yourstoremanager.herokuapp.com/api/v1/auth/login/';
const username = document.getElementById('username').value;
const password = document.getElementById('password').value;

const data = {username, password}

const loginBtn = document.querySelector('.button-1');

fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:', error));

loginBtn.addEventListener('click', fetch);

