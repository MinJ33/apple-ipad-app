// Basket !!
const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click', function(event){
  event.stopPropagation()
  if (basketEl.classList.contains('show')){
    // if class 'show' exists in basketEl hide the basketEl
    hideBasket()
  }else{
    // else show it
    showBasket()
  }
})

basketEl.addEventListener('click', function (event){
  event.stopPropagation()
})

window.addEventListener('click', function(){
  hideBasket()
})

function showBasket(){
  basketEl.classList.add('show')
}
function hideBasket(){
  basketEl.classList.remove('show')
}

// Search !!
const headerEl = document.querySelector('header')
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter') 
const searchCloserEl = searchWrapEl.querySelector('.search-closer') 
const searchShadowEl = searchWrapEl.querySelector('.shadow') 
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearch)
searchShadowEl.addEventListener('click', hideSearch)

function showSearch() {
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed')
  headerMenuEls.reverse().forEach(function (el, index){
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.forEach(function (el, index){
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
}
function hideSearch() {
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
  headerMenuEls.reverse().forEach(function (el, index){
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.forEach(function (el, index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  searchDelayEls.reverse()
}