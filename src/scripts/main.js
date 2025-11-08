'use strict';

let leftClick = false;
let rightClick = false;

const firstPromise = new Promise((resolve, reject) => {
  let resolved = false;

  const handleLeftClick = (e) => {
    if (e.button === 0 && !resolved) {
      resolved = true;
      resolve('First promise was resolved');
      document.removeEventListener('mousedown', handleLeftClick);
    }
  };

  document.addEventListener('mousedown', handleLeftClick);

  setTimeout(() => {
    if (!resolved) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', handleClick);
    }
  };

  document.addEventListener('mousedown', handleClick);
});

const thirdPromise = new Promise((resolve) => {
  const checkBothClicks = () => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  };

  const handleClick = (e) => {
    if (e.button === 0) {
      leftClick = true;
    } else if (e.button === 2) {
      rightClick = true;
    }
    checkBothClicks();
  };

  document.addEventListener('mousedown', handleClick);
});

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

function showNotification(message, inSuccess) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = inSuccess ? 'success' : 'error';
  div.textContent = message;
  document.body.appendChild(div);
}

firstPromise
  .then((message) => {
    // eslint-disable-next-line no-console
    console.log(message);
    showNotification(message, true);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    showNotification(error, false);
  });

secondPromise
  .then((message) => {
    // eslint-disable-next-line no-console
    console.log(message);
    showNotification(message, true);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    showNotification(error, false);
  });

thirdPromise
  .then((message) => {
    // eslint-disable-next-line no-console
    console.log(message);
    showNotification(message, true);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    showNotification(error, false);
  });
