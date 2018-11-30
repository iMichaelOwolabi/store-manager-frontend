if (!localStorage.getItem('token')) {
  location.replace('index.html');
}

const userRole = localStorage.getItem('role');
const token = localStorage.getItem('token');

let makeAdminBtn;
let userId;
let theButtonTd;
let theButton;

const makeAdmin = (thatButton, id) => {
  makeAdminBtn = thatButton;
  makeAdminBtn.onclick = () => {
    // const usersIdUrl = `https://yourstoremanager.herokuapp.com/api/v1/users/${id}/`;
    const usersIdUrl = `http://localhost:3000/api/v1/users/${id}/`;

    const role = 'admin';
    const data = { role };
    return fetch(usersIdUrl, {
      method: 'put',
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
        } else if (userRole === 'user') {
          document.getElementsByClassName('admin')[0].style.display = 'none';
          document.getElementById('account').style.display = 'none';
          document.getElementsByClassName('error')[0].innerHTML = response.message;
        } else {
          document.getElementsByClassName('success')[0].style.display = 'none';
          document.getElementsByClassName('error')[0].innerHTML = response.message;
          document.getElementsByClassName('error')[0].style.display = 'block';
        }
      })
      .catch((error) => {
        const erroMsg = 'Network error: kindly check your network and try again.';
        document.getElementById('attendants').style.display = 'none';
        document.getElementsByClassName('error')[0].innerHTML = erroMsg;
        console.log(error);
      });
  };
};


const displayUsers = () => {
  // const usersUrl = 'https://yourstoremanager.herokuapp.com/api/v1/users/';
  const usersUrl = 'http://localhost:3000/api/v1/users/';

  return fetch(usersUrl, {
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
        for (let i = 0; i < rows.length; i++) {
          const { userid, username, role } = rows[i];
          const tr = document.createElement('tr');
          tr.className = 'teer';
          const td1 = document.createElement('td');
          const td2 = document.createElement('td');
          const td3 = document.createElement('td');
          const td4 = document.createElement('td');
          const td5 = document.createElement('td');
          const td6 = document.createElement('td');
          makeAdminBtn = document.createElement('button');
          makeAdminBtn.className = 'attendant-btn';

          const revertBtn = document.createElement('button');
          revertBtn.className = 'attendant-btn';
          const deactivateBtn = document.createElement('button');
          deactivateBtn.className = 'attendant-btn';
          const userIdNode = document.createTextNode(`${userid}`);
          const usernameNode = document.createTextNode(`${username}`);
          const roleNode = document.createTextNode(`${role}`);
          const makeAdminNode = document.createTextNode('Make Admin');
          const revertNode = document.createTextNode('Revert');
          const deactivateNode = document.createTextNode('Deactivate');
          makeAdminBtn.appendChild(makeAdminNode);
          revertBtn.appendChild(revertNode);
          deactivateBtn.appendChild(deactivateNode);

          td1.appendChild(userIdNode);
          td2.appendChild(usernameNode);
          td3.appendChild(roleNode);
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

          const k = 3;
          const theRow = document.getElementsByClassName('teer')[i];
          theButtonTd = theRow.childNodes[k];
          theButton = theButtonTd.firstChild;

          userId = parseInt(theRow.firstChild.innerHTML, 10);
          makeAdmin(theButton, userId);
        }
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
      console.log(error);
    });
};

displayUsers();
