import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'

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
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', function (event){
  event.stopPropagation()
  hideSearch()
})
searchShadowEl.addEventListener('click', hideSearch)

function showSearch() {
  headerEl.classList.add('searching')
  stopScroll()
  headerMenuEls.reverse().forEach(function (el, index){
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.forEach(function (el, index){
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  setTimeout(function () {
    searchInputEl.focus()
  }, 600)
}
function hideSearch() {
  headerEl.classList.remove('searching')
  playScroll()
  headerMenuEls.reverse().forEach(function (el, index){
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.forEach(function (el, index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  searchDelayEls.reverse()
  searchInputEl.value = ''
}
function playScroll(){
  document.documentElement.classList.remove('fixed')
}
function stopScroll(){
  document.documentElement.classList.add('fixed')
}

// Header search
const searchTextFieldEl = document.querySelector('header .textfield')
const searchCancelEl = document.querySelector('header .search-canceler')
searchTextFieldEl.addEventListener('click', () => {
  headerEl.classList.add('searching--mobile')
  searchInputEl.focus()
})
searchCancelEl.addEventListener('click', () => {
  headerEl.classList.remove('searching--mobile')
})

// Exit the search mode when the screen size changes
window.addEventListener('resize', event => {
  if (window.innerWidth <= 740) {
    headerEl.classList.remove('searching')
  } else {
    headerEl.classList.remove('searching--mobile')
  }
})

// Header menu toggle
const menuStarterEl = document.querySelector('header .menu-starter')
menuStarterEl.addEventListener('click', function() {
  if(headerEl.classList.contains('menuing')){
    headerEl.classList.remove('menuing')
    searchInputEl.value = ''
    playScroll()
  }else{
    headerEl.classList.add('menuing')
    stopScroll()
  }
})


// Intersection Observer
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function(entry){
    if (!entry.isIntersecting) {
      return
    }
    entry.target.classList.add('show')
  })
})
const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function (el){
  io.observe(el)
})

// Playing Video
const video = document.querySelector('.stage video') 
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function(){
  video.play()
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})
pauseBtn.addEventListener('click', function(){
  video.pause()
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
})

// Compare section rendering
const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(ipad => {
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

  let colorList = ''
  ipad.colors.forEach(color => {
    colorList += `<li style="background-color: ${color};"></li>`
  })

  // VS Code 확장 프로그램 - Comment tagged templates
  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `

  itemsEl.append(itemEl)
})

const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function(nav){
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(function(map) {
    mapList += /* html */ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`
  })

  mapEl.innerHTML = /* html */ `
  <h3>
    <span class="text">${nav.title}</span>
  </h3>
  <ul>
    ${mapList}
  </ul>
  `

  navigationsEl.append(mapEl)
})

const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear()