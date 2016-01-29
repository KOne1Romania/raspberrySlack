const controller = require('./controller');
const fetch = require('isomorphic-fetch');

const getProduct = function(user, product, location) {

  console.log('Trimitem comanda la:', process.env.URL, ' cu user / produs / location: ', user, product, location);

  fetch(process.env.URL, {
    method: 'post',
    mode: 'cors',
    headers: new Headers({
		  'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      fromUser: user,
      toUser: user,
      product: product,
      location: location,
    }),
  });
}

var location = '.';

controller.bindCallback((action) => {

  if(action === 'lb:press') {
    location = 'bar';
  } else if (action === 'rb:press') {
    location = 'birou'
  }
  else if(action === 'lb:up' || action === 'rb:up'){
    location = '.'
  }

  switch(action) {
    case 'a:up':
      getProduct('@Radu Paraschiv', 'Limonada', location);
      break;

    case 'b:up':
      getProduct('@Radu Paraschiv', 'Fresh de portocale', location);
      break;

    case 'x:up':
      getProduct('@Radu Paraschiv', 'Cafea mare cu lapte', location);
      break;

    case 'y:up':
      getProduct('@Radu Paraschiv', 'Expresso', location);
      break;

    default:
      break;
  }
});
