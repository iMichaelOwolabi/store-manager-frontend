const loginBtn = document.querySelector('.button-1');

const login = () => {
const url = 'https://yourstoremanager.herokuapp.com/api/v1/auth/login/';
//const url = 'http://localhost:3000/api/v1/auth/login/';
const username = document.getElementById('username').value.trim();
const password = document.getElementById('password').value.trim();

const data = {username, password}

return fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(response => {
    if(response.success === true){
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('username', response.data.rows[0].username);
    localStorage.setItem('role', response.data.rows[0].role);
    const toks = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    // console.log('Success:', response.message);
    // console.log(toks + username);
    location = 'dashboard.html';
    }
    else{
      document.getElementsByClassName('error')[0].innerHTML = response.message;
      console.log(JSON.stringify({Success: response.success, message: response.message}));
    }
  })
  .catch(error => console.error('Error:', error));

}

loginBtn.addEventListener('click', login);

