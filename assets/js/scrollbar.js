function updateScrollbar() {
    console.log("scrollUpdating")
    var sectionlist = document.querySelectorAll("div h1", "section h1", "footer h1")
    sidenav.innerHTML = ""
    sectionlist.forEach(element => {
        var newli = `<li><a href="#${element.parentElement.id}" class="hoverblock">${element.innerHTML}
        </a> </li>`
        console.log()
        sidenav.innerHTML += newli

    });

    document.getElementById("appheader").addEventListener('click', updateScrollbar)
}

setTimeout(updateScrollbar, 2000)
// ('click', updateScrollbar)

