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

const bookmarks = [{"id":"rG2RBVq2dOgspmR4","label":"reddit","bookmarks":[{"id":"QrzgYzSewgP4uZvV","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"nqRW9waT0xB8FEw4","label":"r/unixporn","url":"https://www.reddit.com/r/unixporn/"}]},{"id":"2lrHQ0PNGQB9qpCr","label":"Learning Tools","bookmarks":[{"id":"H7WlnMm63ltIYplc","label":"Sima","url":"https://sima.unicartagena.edu.co/my/"},{"id":"NekZLcYsgns31I7O","label":"ChatGPT","url":"https://chat.openai.com/chat"},{"id":"IClEIxZ8isvKZktE","label":"Github","url":"https://github.com/Asuncion09"}]},{"id":"gds1ImyNLLxFLWXD","label":"sources","bookmarks":[{"id":"Bnbe2EF05owOjcqP","label":"Nerd icons","url":"https://www.nerdfonts.com/cheat-sheet"},{"id":"sGI7HCEjHBgcf8Pv","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"16","label":"Typingclub","url":"https://www.typingclub.com/sportal/program-54.game"}]}]

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
