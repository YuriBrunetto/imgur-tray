// modules
const openLinks = require('./openLinks')
const showTab = require('./showTab')
const save = require('./store/save')
const load = require('./store/load')
const Clipboard = require('clipboard')

// elements
const file = document.querySelector('#image')
const uploaded_items = document.querySelector('#uploaded-items')
const links = document.querySelectorAll('a')
const more_items = `<div class="more-items">Scroll to see all</div>`

// misc
const CLIENTID = 'e57becf7e161301'
const KEY = require('./store/key')

openLinks(links)

file.addEventListener('change', (e) => {
  let files = e.target.files, file, len, i

  for (i = 0, len = files.length; i < len; i++) {
    file = files[i]

    if (file.type.match(/image.*/)) {
      uploadFile(file)
      showTab('uploading')
    }
  }
}, false)

function uploadFile(file) {
  let xhttp = new XMLHttpRequest()
  let fd = new FormData()
  let self = this

  fd.append('image', file)

  xhttp.open('POST', 'https://api.imgur.com/3/image')
  xhttp.setRequestHeader('Authorization', `Client-ID ${CLIENTID}`)
  xhttp.onreadystatechange = () => {
    if (xhttp.status === 200 && xhttp.readyState === 4) {
      let notif = new Notification('Imgur-Tray', {
        title: 'Imgur-Tray',
        body: 'Upload completed!'
      })

      let res = JSON.parse(xhttp.responseText), data, item
      showTab('uploaded')

      data = res.data
      item = `
        <div class="item">
          <div class="item-img" style="background-image:url(${data.link})"></div>
          <div class="item-description">
            <a href="${data.link}" title="${data.link}" class="item-a">${data.link}</a>
            <button type="button" class="item-clipboard" data-clipboard-text="${data.link}">Copy to clipboard</button>
            <span class="item-copied">Copied!</span>
          </div>
        </div>
      `

      uploaded_items.innerHTML += item

      // save it!
      let upLinks = { link: data.link }
      save(KEY, upLinks)

      let items = document.querySelectorAll('.item-a')
      openLinks(items)

      let clipboard = new Clipboard('.item-clipboard')
      clipboard.on('success', (e) => {
        let copied = e.trigger.nextElementSibling
        copied.style.opacity = 1
        copied.addEventListener('transitionend', () => {
          copied.style.opacity = 0
        })
      })
    }
  }

  xhttp.send(fd)
}

load()
