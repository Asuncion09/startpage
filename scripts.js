/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"IwLCVoOSQ0w42uZD","label":"Sosial","bookmarks":[{"id":"vmiuTPz84BuKZHmM","label":"Startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"Mit0MmR2P2UvrlVr","label":"Github","url":"https://github.com/Asuncion09"},{"id":"LPsNiEzZq22g4Xd9","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"fxFilPO0T1nSNoQs","label":"Uni","bookmarks":[{"id":"Px0FjInb1epFFycp","label":"Sima","url":"https://sima.unicartagena.edu.co/login/index.php"},{"id":"yORLSCkqMuWB9jla","label":"Sma","url":"https://sma.unicartagena.edu.co:8443/Smaix12/"}]},{"id":"mwhmjZWluJxTnbsi","label":"Tools","bookmarks":[{"id":"oAgiScck3TCQtRrY","label":"ChatGPT","url":"https://chat.openai.com/"},{"id":"7k0dCsikAJYWFw9y","label":"Django","url":"https://docs.djangoproject.com/en/4.2/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
