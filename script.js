const switchModes = document.getElementById("switch-modes");
const gradeInput = document.getElementById("input-grade");
const creditInput = document.getElementById("input-credit");
const subjectInput = document.getElementById("input-subject")
const addSubjectBtn = document.getElementById("add-subject");
const showOuterContainer = document.getElementById("outer-show-container")

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

// Function to display the entered subjects by user
const createSubject = () => {
    const card = document.createElement("div");
    card.classList.add('show-container')
    card.id = "show-container";

    const subject = document.createElement('p')
    subject.innerText = subjectInput.value
    subject.classList.add('subject')

    const grade = document.createElement("p")
    grade.classList.add("grade")
    grade.innerText = `Grade : ${gradeInput.value}`;

    const credit = document.createElement("p")
    credit.classList.add("credit")
    credit.innerText = `Credit : ${creditInput.value}`;

    card.append(subject,credit,grade)

    showOuterContainer.appendChild(card);
}

// Checks if the value enter by user is not empty or null
function checkVaild(input) {
    return input.value !== null && input.value !== ''
}

switchModes.addEventListener("click", changeMode)
addSubjectBtn.addEventListener("click", () => {
    if (checkVaild(subjectInput) && checkVaild(gradeInput) && checkVaild(creditInput)) {
        createSubject()
    } else {
        alert("Grade or Credit or Subject must be enter.")
    }
})