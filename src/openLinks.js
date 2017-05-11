const open = require('open')

let links = document.querySelectorAll('a')
links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    open(e.target.href)
  })
})
