const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click', function(){
  if (basketEl.classList.contains('show')){
    // if class 'show' exists in basketEl hide the basketEl
    basketEl.classList.remove('show')
  }else{
    // else show it
    basketEl.classList.add('show')
  }
})

