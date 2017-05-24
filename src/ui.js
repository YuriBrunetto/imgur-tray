// ui
const showTab = require('./showTab')
const tabs_item = document.querySelectorAll('.tabs-item')

tabs_item.forEach(tab => {
  tab.addEventListener('click', e => showTab(e.target.id))
})

showTab('new')
