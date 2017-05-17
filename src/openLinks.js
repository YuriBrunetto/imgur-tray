const open = require('open')

const openLinks = (links) => {
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      open(e.target.href)
    })
  })
}

module.exports = openLinks
