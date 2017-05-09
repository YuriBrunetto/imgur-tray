// ui
let tabs_item = document.querySelectorAll('.tabs-item')

tabs_item.forEach(function(tab) {
  tab.addEventListener('click', function(e) {
    showTab(e.target.id)
  })
})

let main = document.querySelector('.main')
let sections = document.querySelectorAll('.section')

function showTab(currentTab) {
  sections.forEach(function(section) {
    section.style.display = 'none'
  })

  if (currentTab === 'new' || currentTab === 'uploads') {
    tabs_item.forEach(function(tab) {
      tab.classList.remove('active')
    })

    document.querySelector(`#${currentTab}`).classList.add('active')
  }

  main.querySelector(`#section-${currentTab}`).style.display = 'block'
}

showTab('new')


// upload
let file = document.getElementById('image')

file.addEventListener('change', function(e) {
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
  xhttp.setRequestHeader('Authorization', 'Client-ID e57becf7e161301')
  xhttp.onreadystatechange = function () {
    if (xhttp.status === 200 && xhttp.readyState === 4) {
      let res = JSON.parse(xhttp.responseText)
      showTab('uploaded')
      console.log('success!', res)
    }
  }

  xhttp.send(fd)
}
