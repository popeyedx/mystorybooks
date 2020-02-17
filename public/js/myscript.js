const closeBtn = document.getElementById('myCloseBtn');

const myFunc = () => {
  const div = document.getElementsByClassName('message-wrapper')[0];

  div.classList.add('fadeout');
  setTimeout(function(){ 
    div.parentNode.removeChild(div);
  }, 200);
  
};

closeBtn.addEventListener('click', myFunc);