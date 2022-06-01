function cssVar(name, value) {
    var r = document.querySelector(':root')
    var rs = getComputedStyle(r)
    // console.log(value)
    if (name[0] != '-') name = '--' + name //allow passing with or without --
    if (value) r.style.setProperty(name, value)
    return rs.getPropertyValue(name);
}







setTimeout(runonload, 400)

function runonload() {

    var themeSliders = document.getElementsByClassName("themeslider")
    for (i = 0; i < themeSliders.length; i++) {
        var slider = themeSliders[i]
        slider.addEventListener("input", (e) => {
            cssVar(`--${e.target.id}`, e.target.value)
            document.getElementById(`${e.target.id}Disp`).innerHTML = e.target.value
        })
    }


    var elem = document.getElementById("fontSize")
    elem.oninput = function () {
        var currentValue = this.value
        document.getElementById("fontSizeDisp").innerHTML = currentValue
        cssVar("fontSize", currentValue)
        document.body.style.fontSize = currentValue * 16 + "px"
        // changeBodyFont()
    }


    var themeSliders = document.getElementsByClassName("themeslider")
    for (i = 0; i < themeSliders.length; i++) {
        var slider = themeSliders[i]
        document.getElementById(`${themeSliders[i].id}Disp`).value = cssVar(`--${themeSliders[i].id}`)
    }





    if (window.DEBUG == 1 || window.DEBUG == true) showCustomizer()




}

if (sessionStorage.getItem("colorConfig") == null) saveTheme()
if (sessionStorage.getItem("colorConfig") != null) {
    var savedConfig = JSON.parse(sessionStorage.getItem("colorConfig"))
    loadColorConfig(savedConfig)
}
function loadColorConfig(inputConfig = JSON.parse(sessionStorage.getItem("colorConfig"))) {
    cssVar("--hue", inputConfig[0])
    cssVar("--hueAscent", inputConfig[1])
    cssVar("--fontSize", inputConfig[2])
    cssVar("--font-body", inputConfig[3])
    changeBodyFont(inputConfig[3])
    closecustomizer()
}




function closecustomizer() {
    document.getElementById("app").style.gridTemplateAreas = '"app app"'
    document.getElementById("customizer").style.display = "none";
    // document.getElementById("customizer").style.gridArea = '"sidebarHidden"'
    // document.getElementById("maincontent").style.gridColumn = "1 / 2"
    // document.getElementById("showCustomizer").onclick = "showCustomizer"
    saveTheme()
}

function showCustomizer() {
    document.getElementById("app").style.gridTemplateAreas = '"sidebar app"'
    // document.getElementById("customizer").style.gridArea = "sidebar"
    // document.getElementById("maincontent").style.gridArea = "app"
    document.getElementById("customizer").style.display = "inline-grid";
    // document.getElementById("customizer").style.gridArea = `"sidebar";
    // "sidebar app"`
    // // document.getElementById("showCustomizer").onclick = "closecustomizer()"
    // document.getElementById("maincontent").style.gridArea = "app"

}

function saveTheme() {
    var colorConfig = [
        cssVar("--hue"),
        cssVar("--hueAscent"),
        cssVar("--fontSize"),

        cssVar("--font-body")
        // document.getElementById("FontSelect").value
    ]
    sessionStorage.removeItem("colorConfig")
    sessionStorage.setItem("colorConfig", JSON.stringify(colorConfig))
}

function resetFunction() {
    cssVar("--light", cssVar("--lightDefault"))
    cssVar("--sat", cssVar("--satDefault"))
    cssVar("--hu", cssVar("--hueDefault"))
    localStorage.clear()
    sessionStorage.clear()
    reloadAll()
    loadColorConfig()
}

function changeBodyFont(fontselecteled = document.getElementById("FontSelect").value) {
    document.body.style.fontFamily = fontselecteled
    var all_headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6")
    for (i = 0; i < all_headings.length; i++) {
        cssVar("--font-body", `"${fontselecteled}"; `)
        all_headings[i].style.fontFamily = fontselecteled
    }
}


function darkMode() {
    cssVar("--light", "5%")
    cssVar("--sat", "85%")
    cssVar("--darkmode", "dark")
    localStorage.removeItem("darkmode")
    localStorage.setItem("darkmode", "true")
}

function darkModeDisable() {
    cssVar("--light", cssVar("--lightDefault"))
    cssVar("--sat", cssVar("--satDefault"))
    cssVar("--darkmode", "--light")

    localStorage.removeItem("darkmode")
}


const copyright = `< div id = "copyright" >
<span id="copyurl">Designed with
    <a href="https://generatorjs.mgeek.in">GeneratorJs</a>
    &copy; 2022
    <a href="http://mgeek.in" class="none">mGeek.in</a>
    <a href="http://mnnit.ac.in.in">MNNIT</a>
</span>
<span id="copyauthor">Designed by
    <a href="http://mgeek.in/webmaster">Dr. Prateek Raj Gautam</a>
</span>
</div > `

if (localStorage.getItem("darkmode") === "true") {
    document.getElementById("darkmodeswitch").checked = true
    darkMode()
}


// document.getElementById("darkmodeswitch").addEventListener("click", toggleDarkMode(e))

function toggleDarkMode() {
    darkmode = document.getElementById("darkmodeswitch")
    console.log("e.target")
    var state = darkmode.checked
    if (state == true) darkMode()
    if (state == false) darkModeDisable()

}

