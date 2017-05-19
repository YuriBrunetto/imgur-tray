const load = require('./load')

const save = (name, data) => {
  let old = localStorage.getItem(name) || '[]'
  let oldObj = JSON.parse(old) || []
  let merged = oldObj.concat(data)

  window.localStorage.setItem(name, JSON.stringify(merged))
  load()
}

module.exports = save
