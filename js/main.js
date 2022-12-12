const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click', function(event){
  event.stopPropagation()
  if (basketEl.classList.contains('show')){
    // if class 'show' exists in basketEl hide the basketEl
    basketEl.classList.remove('show')
  }else{
    // else show it
    basketEl.classList.add('show')
  }
})

basketEl.addEventListener('click', function (event){
  event.stopPropagation()
})

window.addEventListener('click', function(){
    basketEl.classList.remove('show')
})