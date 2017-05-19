const saveTo = 'ImgurTray1'

const load = () => {
  let local = window.localStorage.getItem(saveTo), data

  if (local) {
    data = JSON.parse(local)
    console.log('load data', data)
  }
}

module.exports = load
