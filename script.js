const switchModes = document.getElementById("switch-modes");

let mode = "dark";

const darkMode = () => {
    document.getElementById("mode-img").src = "./assets/dark.png";
    document.body.classList.replace('bg-purple-100', 'bg-gray-900')
    document.body.classList.add('text-white')
    document.getElementsByTagName("header")[0].classList.replace('after:bg-black', 'after:bg-white')
    mode = "dark";
}

const lightMode = () => {
    document.getElementById("mode-img").src = "./assets/light.png";
    document.body.classList.replace('bg-gray-900', 'bg-purple-100')
    document.body.classList.remove('text-white')
    document.getElementsByTagName("header")[0].classList.replace('after:bg-white', 'after:bg-black')
    mode = "light";
}

// To change to light or dark theme
const changeMode = () => {
    if (mode == "light") {
        darkMode();
    }
    else {
        lightMode()
    }
}

switchModes.addEventListener("click", changeMode)
