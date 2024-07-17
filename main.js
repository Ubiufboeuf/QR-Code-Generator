function $(el) { return document.querySelector(el) }

const main = $("main")
const inp = $("#input")
const btn = $("#btn")
let url

function isValidURL(url) {
  return Boolean(new URL(url))
}

function newQR() {
  if (!isValidURL(url)) return
  const section = document.createElement("section");
  section.classList.add("section-main")
  document.body.classList.add("qr")
  main.children[1].remove()

  let uuid = crypto.randomUUID()
  console.log(uuid)

  section.innerHTML = `
    <div id="fondo-qr">
      <div id="fondo2-qr">
        <!-- QR -->
      </div>
    </div>
    <section id="section-btns">
      <a id="download" download=${"qr-code-" + uuid}>Download</a>
      <a id="share">Share</a>
    </section>
  `


  main.append(section)

  const share = document.querySelector("a#share");
  const download = document.querySelector("a#download")
  share.addEventListener("click", () => {
    navigator.clipboard.writeText(url)
  })
  download.addEventListener("click", (e) => {
    let sect = document.querySelector("section")
    let qr_img = sect.children[0].children[0].children[1]
    e.target.setAttribute("href", qr_img.src)
    console.log(e.target)

  })

  console.log(section)
  new QRCode(section.children[0].children[0], url)
  // new QRCode(main, url);
}

inp.addEventListener("input", () => {
  url = inp.value
  // console.log(isValidURL(url))
  // if (inp.value !== "" && inp.value)
})

inp.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    newQR()
  }
})
btn.addEventListener("click", newQR)

function handleInput(e) {
  inp = e.target
  return inp
}

function handleClick(e, inp) {
  console.log(e)
  inp = document.querySelector("#input")
  console.log(inp)
}