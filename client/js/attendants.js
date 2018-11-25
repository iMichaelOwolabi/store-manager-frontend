if (!localStorage.getItem('token')) {
  location.replace('index.html');
}

const userRole = localStorage.getItem('role');
const token = localStorage.getItem('token');

const displayUsers = () => {
  // const url = 'https://yourstoremanager.herokuapp.com/api/v1/users/';
  const url = 'http://localhost:3000/api/v1/users/';

  return fetch(url, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  })
    .then(response => response.json())
    .then((response) => {
      if (response.success === true) {
        const rows = response.data;
        rows.forEach((attendant) => {
          const { userid, username, role } = attendant;
          const tr = document.createElement('tr');
          const td1 = document.createElement('td');
          const td2 = document.createElement('td');
          const td3 = document.createElement('td');
          const td4 = document.createElement('td');
          const td5 = document.createElement('td');
          const td6 = document.createElement('td');
          const makeAdminBtn = document.createElement('button');
          makeAdminBtn.className = 'attendant-btn';
          const revertBtn = document.createElement('button');
          revertBtn.className = 'attendant-btn';
          const deactivateBtn = document.createElement('button');
          deactivateBtn.className = 'attendant-btn';
          const node1 = document.createTextNode(`${userid}`);
          const node2 = document.createTextNode(`${username}`);
          const node3 = document.createTextNode(`${role}`);
          const makeAdminNode = document.createTextNode('Make Admin');
          const revertNode = document.createTextNode('Revert');
          const deactivateNode = document.createTextNode('Deactivate');
          makeAdminBtn.appendChild(makeAdminNode);
          revertBtn.appendChild(revertNode);
          deactivateBtn.appendChild(deactivateNode);

          td1.appendChild(node1);
          td2.appendChild(node2);
          td3.appendChild(node3);
          td4.appendChild(makeAdminBtn);
          td5.appendChild(revertBtn);
          td6.appendChild(deactivateBtn);

          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          tr.appendChild(td5);
          tr.appendChild(td6);
          const table = document.getElementById('usersTable');
          table.appendChild(tr);
        });
      } else if (userRole === 'user') {
        document.getElementsByClassName('admin')[0].style.display = 'none';
        document.getElementById('attendants').style.display = 'none';
        document.getElementsByClassName('error')[0].innerHTML = response.message;
      } else {
        document.getElementById('attendants').style.display = 'none';
        document.getElementsByClassName('error')[0].innerHTML = response.message;
      }
    })
    .catch((error) => {
      const erroMsg = 'Network error: kindly check your network and try again.';
      document.getElementById('attendants').style.display = 'none';
      document.getElementsByClassName('error')[0].innerHTML = erroMsg;
    });
};

displayUsers();
