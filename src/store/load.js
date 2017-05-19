const KEY = require('./key')
const openLinks = require('./../openLinks')

const my_uploads = document.querySelector('#my-uploads')

const load = () => {
  let local = window.localStorage.getItem(KEY), data

  if (local) {
    data = JSON.parse(local)

    data.forEach(img => {
      let item = `
        <div class="item">
          <div class="item-img" style="background-image:url(${img.link})"></div>
          <div class="item-description">
            <a href="${img.link}" title="${img.link}" class="item-a item-uploaded">${img.link}</a>
            <button type="button" class="item-clipboard">Copy to clipboard</button>
          </div>
        </div>
      `

      my_uploads.innerHTML += item

      let items = document.querySelectorAll('.item-uploaded')
      openLinks(items)
    })
  } else {
    my_uploads.innerHTML = `<p>You haven't uploaded any files yet.</p>`
  }
}

module.exports = load
