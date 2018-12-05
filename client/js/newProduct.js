if (!localStorage.getItem('token')) {
  location.replace('index.html');
}

const userRole = localStorage.getItem('role');
const token = localStorage.getItem('token');

const body = document.getElementsByTagName('body');


const checkRole = () => {
  if (userRole === 'user') {
    document.getElementsByClassName('admin')[0].style.display = 'none';
    document.getElementsById('create-product')[0].style.display = 'none';
    document.getElementsByClassName('success')[0].style.display = 'none';
    // document.getElementsById('big-error').innerHTML = response.message;
    document.getElementsById('big-error').style.display = 'block';
  }
};
checkRole();
body.addEventListener('load', checkRole);

const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/imichaelowolabi/image/upload';
const cloudinaryPreset = 'd9rczfim';

const createProductBtn = document.getElementById('create-product');
const imageUpload = document.getElementById('product-img-upload');

let imageUrl;
imageUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const formData = new FormData();

  formData.append('file', file);
  formData.append('upload_preset', cloudinaryPreset);

  return fetch(cloudinaryUrl, {
    method: 'POST',
    mode: 'cors',

    body: formData,
  }).then(res => res.json())
    .then((response) => {
      if (response.secure_url) {
        imageUrl = response.secure_url;
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

const createProduct = () => {
  // const productsUrl = 'https://yourstoremanager.herokuapp.com/api/v1/products/';
  const productsUrl = 'http://localhost:3000/api/v1/products/';

  const productName = document.getElementById('product-name').value.trim();
  const price = parseFloat(document.getElementById('price').value.trim(), 10);
  const quantity = parseInt(document.getElementById('quantity').value.trim(), 10);
  const minQty = parseInt(document.getElementById('min-quantity').value.trim(), 10);
  const productImage = imageUrl;

  const data = {
    productName,
    price,
    quantity,
    minQty,
    productImage,
  };

  return fetch(productsUrl, {
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
      if (response.success === true && userRole === 'admin' || userRole === 'superadmin') {
        document.getElementsByClassName('error')[0].style.display = 'none';
        document.getElementsByClassName('success')[0].innerHTML = response.message;
        document.getElementsByClassName('success')[0].style.display = 'block';
      } else if (userRole === 'user') {
        document.getElementsByClassName('admin')[0].style.display = 'none';
        document.getElementsById('create-product')[0].style.display = 'none';
        document.getElementsByClassName('success')[0].style.display = 'none';
        document.getElementsById('big-error').innerHTML = response.message;
        document.getElementsById('big-error').style.display = 'block';
      } else {
        document.getElementsByClassName('success')[0].style.display = 'none';
        document.getElementsByClassName('error')[0].innerHTML = response.message;
        document.getElementsByClassName('error')[0].style.display = 'block';
        console.log(response.error);
      }
    })
    .catch((error) => {
      const erroMsg = 'Network error: kindly check your network and try again.';
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

createProductBtn.addEventListener('click', createProduct);
