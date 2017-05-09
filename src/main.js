let file = document.getElementById('image')

file.addEventListener('change', function(e) {
  let files = e.target.files, file, len, i

  for (i = 0, len = files.length; i < len; i++) {
    file = files[i]

    if (file.type.match(/image.*/)) {
      uploadFile(file)
      console.log('loading...')
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
      console.log('success!', res)
    }
  }
  
  xhttp.send(fd)
}
