const sections = document.querySelectorAll('.section')
const tabs_item = document.querySelectorAll('.tabs-item')
const main = document.querySelector('.main')

const showTab = (currentTab) => {
  sections.forEach(section => section.style.display = 'none')

  if (currentTab === 'new' || currentTab === 'uploads') {
    tabs_item.forEach(tab => tab.classList.remove('active'))

    document.querySelector(`#${currentTab}`).classList.add('active')
  }

  main.querySelector(`#section-${currentTab}`).style.display = 'block'
}

module.exports = showTab
