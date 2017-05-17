const showTab = require('./showTab')
const file = document.querySelector('#image')
const uploaded_items = document.querySelector('#uploaded-items')
const more_items = `<div class="more-items">Scroll to see all</div>`
const CLIENTID = 'e57becf7e161301'

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
      let res = JSON.parse(xhttp.responseText), data, item
      showTab('uploaded')

      data = res.data
      item = `
        <div class="item">
          <div class="item-img" style="background-image:url(${data.link})"></div>
          <div class="item-description">
            <a href="${data.link}" title="${data.link}" class="item-a">${data.link}</a>
          </div>
        </div>
      `

      uploaded_items.innerHTML += item
    }
  }

  xhttp.send(fd)
}
