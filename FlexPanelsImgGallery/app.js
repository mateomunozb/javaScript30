const panels = document.querySelectorAll('.panel')
console.log('TLC: panels', panels)

const openPanel = (e) => {
  const panel = e.currentTarget
  panel.classList.toggle('open')
}
const activeOpen = (e) => {
  const panel = e.currentTarget
  if (e.propertyName.includes('flex')) {
    panel.classList.toggle('open-active')
  }
}

panels.forEach((panel) => {
  panel.addEventListener('click', openPanel)
})

panels.forEach((panel) => {
  panel.addEventListener('transitionend', activeOpen)
})
