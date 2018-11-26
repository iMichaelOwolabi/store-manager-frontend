// import validations from './validations';

if (!localStorage.getItem('token')) {
  location.replace('index.html');
}
const userRole = localStorage.getItem('role');
const token = localStorage.getItem('token');

const createBtn = document.getElementById('create-account');

const createUser = () => {
  // const url = 'https://yourstoremanager.herokuapp.com/api/v1/auth/signup/';
  const url = 'http://localhost:3000/api/v1/auth/signup/';

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const comparePassword = document.getElementById('re-password').value.trim();
  if (password !== comparePassword) {
    const erroMsg = 'Password and Confirm password must be the same';
    const errorDiv = document.getElementsByClassName('error')[0];
    errorDiv.innerHTML = erroMsg;
    return errorDiv;
  }


  const data = { username, password };

  return fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then((response) => {
      if (response.success === true) {
        document.getElementsByClassName('error')[0].style.display = 'none';
        document.getElementsByClassName('success')[0].innerHTML = response.message;
        document.getElementsByClassName('success')[0].style.display = 'block';
        console.log(response.message);
      } else if (userRole === 'user') {
        document.getElementsByClassName('admin')[0].style.display = 'none';
        document.getElementById('account').style.display = 'none';
        document.getElementsByClassName('error')[0].innerHTML = response.message;
        console.log(response.message);
      } else {
        document.getElementsByClassName('success')[0].style.display = 'none';
        document.getElementsByClassName('error')[0].innerHTML = response.message;
        document.getElementsByClassName('error')[0].style.display = 'block';
        console.log(response);
      }
    })
    .catch((error) => {
      const erroMsg = 'Network error: kindly check your network and try again.';
      document.getElementById('attendants').style.display = 'none';
      document.getElementsByClassName('error')[0].innerHTML = erroMsg;
      console.log(error);
    });
};


/* const validateInput = () => {
  const erroMsg = 'Password and Confirm password must be the same';
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const comparePassword = document.getElementById('re-password').value.trim();
  if (!validations.passwordCompare(password, comparePassword)) {
    const errorDiv = document.getElementsByClassName('error')[0];
    errorDiv.innerHTML = erroMsg;
    return errorDiv;
  }
  return createUser();
}; */

createBtn.addEventListener('click', createUser);
