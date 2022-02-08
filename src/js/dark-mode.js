const $html = document.querySelector('html')
const $btnDarkMode = document.querySelector('#switch')

$btnDarkMode.addEventListener('click', function(){
  $html.classList.toggle('dark-mode')
})