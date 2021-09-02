// Service worker register
if ('serviceWorker' in navigator) navigator
  .serviceWorker
  .register('./sw.js')
  .then((registration) => {
    console.log('SERVICE WORKER REGISTERED')
    console.log(registration);
  });

const buttonStyled = {
  padding: '16px',
  margin: 'auto',
  borderRadius: '8px',
  backgroundColor: '#6a3280',
  border: 0,
  color: 'white',
  cursor: 'pointer',
};

// before install app manager
// all this run only if the PWA isn't installed
window.addEventListener('beforeinstallprompt', beforeinstallpromptEvent => {
  console.log('APP NOT INSTALLED');

  document.querySelector('#btnDispatcher')?.remove();

  // prevent event dispatch
  beforeinstallpromptEvent.preventDefault();

  // button creation
  const btnDispatcher = document.createElement('button');
  btnDispatcher.id = 'btnDispatcher';
  btnDispatcher.innerHTML = 'Click here to install';
  Object.keys(buttonStyled).forEach(key => {
    btnDispatcher.style[key] = buttonStyled[key];
  })

  btnDispatcher.addEventListener('click', () => {
    // prompt trigger
    beforeinstallpromptEvent.prompt();

    // do something with one or another option
    beforeinstallpromptEvent.userChoice.then(result => {
      const consoleMessage = result.outcome === 'accepted' ? 'Accepted' : 'Not accepted';
      console.log(consoleMessage);
    });
  });

  // insert button
  document.querySelector('#installer').appendChild(btnDispatcher);
});