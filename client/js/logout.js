const logoutLink = document.querySelector('.logout');

const logout = () => {
  localStorage.removeItem('token');
  location.reload(true);
};

logoutLink.addEventListener('click', logout);
