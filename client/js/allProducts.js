if (!localStorage.getItem('token')) {
  location.replace('index.html');
}
const userRole = localStorage.getItem('role');
const token = localStorage.getItem('token');

const displayProducts = () => {
  // const productsUrl = 'https://yourstoremanager.herokuapp.com/api/v1/products/';
  const productsUrl = 'http://localhost:3000/api/v1/products/';

  return fetch(productsUrl, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  })
    .then(response => response.json())
    .then((response) => {
      if (userRole === 'admin' || userRole === 'superadmin' && response.success === true) {
        const rows = response.data;
        for (let i = 0; i < rows.length; i++) {
          const {
            productname,
            price,
            productimage,
          } = rows[i];

          const boxes = document.getElementsByClassName('boxes')[0];
          const boxDiv = document.createElement('div');
          boxDiv.className = 'box';
          const image = document.createElement('img');
          const productNameHeading = document.createElement('h3');
          const priceParagraph = document.createElement('p');
          const button = document.createElement('button');
          button.className = 'cart-btn';
          
          image.src = `${productimage}`;
          const productNameNode = document.createTextNode(`${productname}`);
          const priceNode = document.createTextNode(`$ ${price}`);
          const buttonNode = document.createTextNode('Add to Cart');

          productNameHeading.appendChild(productNameNode);
          priceParagraph.appendChild(priceNode);
          button.appendChild(buttonNode);

          boxDiv.appendChild(image);
          boxDiv.appendChild(productNameHeading);
          boxDiv.appendChild(priceParagraph);
          boxDiv.appendChild(button);

          boxes.appendChild(boxDiv);
        }
      } else if (userRole === 'user' && response.success === true) {
        document.getElementsByClassName('admin')[0].style.display = 'none';
        document.getElementById('admin').style.display = 'none';

        const rows = response.data;
        for (let i = 0; i < rows.length; i++) {
          const {
            productname,
            price,
            productimage,
          } = rows[i];

          const boxes = document.getElementsByClassName('boxes')[0];
          const boxDiv = document.createElement('div');
          boxDiv.className = 'box';
          const image = document.createElement('img');
          const productNameHeading = document.createElement('h3');
          const priceParagraph = document.createElement('p');
          const button = document.createElement('button');
          button.className = 'cart-btn';
          
          image.src = `${productimage}`;
          const productNameNode = document.createTextNode(`${productname}`);
          const priceNode = document.createTextNode(`$ ${price}`);
          const buttonNode = document.createTextNode('Add to Cart');

          productNameHeading.appendChild(productNameNode);
          priceParagraph.appendChild(priceNode);
          button.appendChild(buttonNode);

          boxDiv.appendChild(image);
          boxDiv.appendChild(productNameHeading);
          boxDiv.appendChild(priceParagraph);
          boxDiv.appendChild(button);

          boxes.appendChild(boxDiv);
        }
      }else if (userRole === 'user' && response.success !== true) {
        document.getElementsByClassName('admin')[0].style.display = 'none';
        document.getElementById('admin').style.display = 'none';
        document.getElementById('all-products').style.display = 'none';
        document.getElementsByClassName('error')[0].innerHTML = response.message;
      } else {
        document.getElementById('all-products').style.display = 'none';
        document.getElementsByClassName('error')[0].innerHTML = response.message;
      }
    })
    .catch((error) => {
      const erroMsg = 'Network error: kindly check your network and try again.';
      document.getElementById('all-products').style.display = 'none';
      document.getElementsByClassName('error')[0].innerHTML = erroMsg;
      console.log(error);
    });
};

displayProducts();
