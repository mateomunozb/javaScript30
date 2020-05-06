const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

const list = document.querySelector('.suggestions')

const data = async (url) => {
  try {
    const result = await fetch(url)
    return result.json()
  } catch (error) {
    console.log(error)
  }
}

const findMatches = async (wordMatches) => {
  const cities = await data(endpoint)
  return cities.filter((place) => {
    const regex = new RegExp(wordMatches, 'gi')
    return place.city.match(regex) || place.state.match(regex)
  })
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const displayMatches = async (e) => {
  const key = e.currentTarget.value
  const matchArr = await findMatches(key)
  console.log('TLC: displayMatches -> matchArr', matchArr)
  const html = matchArr
    .map((place) => {
      const regex = new RegExp(key, 'gi')

      const cityName = place.city.replace(regex, `<span class="hl">${key}</span>`)
      const stateName = place.city.replace(regex, `<span class="hl">${key}</span>`)

      return `<li>
        <span>
          ${cityName}, ${stateName}
        </span>
        <span>${numberWithCommas(place.population)}</span>
      </li>`
    })
    .join('')

  list.innerHTML = html
}

const search = document.querySelector('.search')
search.addEventListener('keyup', displayMatches)
