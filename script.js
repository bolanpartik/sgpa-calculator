const switchModes = document.getElementById("switch-modes");
const gradeInput = document.getElementById("input-grade");
const creditInput = document.getElementById("input-credit");
const subjectInput = document.getElementById("input-subject")
const addSubjectBtn = document.getElementById("add-subject");
const showOuterContainer = document.getElementById("outer-show-container")
const clearInputs=document.getElementById("clear-inputs");

let mode = "dark";
let calBtnExists = false
const allCredits = []
const allGrades = []

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

//  To show the final sgpa on screen
const showSPGA=(sgpa)=>{
    const showFinalResult=document.createElement("div")
    showFinalResult.classList.add('final-result')

    const resultSGPA=document.createElement('p')
    resultSGPA.classList.add('result-sgpa')
    resultSGPA.innerText=`Your SPGA is : ${sgpa}`;

    const cancelButton=document.createElement('button')
    cancelButton.innerText='Cancel'
    cancelButton.classList.add('cancel-button')

    showFinalResult.appendChild(resultSGPA)
    showFinalResult.appendChild(cancelButton)

    document.body.appendChild(showFinalResult)
    document.getElementsByTagName('main')[0].classList.add('non-active')
    
    cancelButton.addEventListener('click',()=>{
        document.body.removeChild(showFinalResult)
        document.getElementsByTagName('main')[0].classList.remove('non-active')
    })
}

// Round off value up to two decimals
const roundOffValue=(num)=>{
    return Math.round(num*100)/100
}

// Covert grades in points
const gradeToPoints=(grade)=>{
    switch(grade){
        case 'A+' : return 10
        case 'A' : return 9
        case 'B+' : return 8
        case 'B' : return 7
        case 'C+' : return 6
        case 'C' : return 5
        case 'D' : return 4
        case 'E' : return 0
        case 'F' : return 0
        default : return 0
    }
}

// To calculate overall 
const calculateAll = () => {
    let sum = 0;
    let totalCredit = 0;
    const allSubjects = document.getElementsByClassName("show-container")
    for (i = 0; i < allSubjects.length; i++) {
        const credit = parseFloat(allCredits[i])
        const grade =gradeToPoints(allGrades[i])
        sum +=credit*grade
        totalCredit += credit
    }
    const userSGPA = sum / totalCredit;
    const roundOFFSgpa=roundOffValue(userSGPA);
    showSPGA(roundOFFSgpa)
}

// Check total subjects if it is greater than one then add a calculate button
const checkTotalSubjects = () => {
    const totalSubjects = document.getElementsByClassName("show-container").length
    if (!calBtnExists && totalSubjects > 1) {
        const calculateBtn = document.createElement('button')
        calculateBtn.classList.add('calculate-button')
        calculateBtn.innerText = "Calculate"
        calculateBtn.addEventListener("click", calculateAll) 
        showOuterContainer.appendChild(calculateBtn)
        calBtnExists = true;
    }else if(totalSubjects<=1 && calBtnExists){
            showOuterContainer.removeChild(document.getElementsByClassName('calculate-button')[0])
            calBtnExists=false
    }
}

// Function to reset the input values.
const resetInputs = () => {
    subjectInput.value = ''
    creditInput.value = ''
    gradeInput.value = ''
    subjectInput.focus()
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

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add('delete-button')
    deleteBtn.innerText = "Delete"

    card.append(subject,credit,grade,deleteBtn)

    deleteBtn.addEventListener('click', () => {
        showOuterContainer.removeChild(card)
        checkTotalSubjects()
    })
    showOuterContainer.appendChild(card);
}

// Checks if the value enter by user is not empty or null
function checkVaild(input) {
    return input.value !== null && input.value !== ''
}

switchModes.addEventListener("click", changeMode)

clearInputs.addEventListener('click',resetInputs)

addSubjectBtn.addEventListener("click", () => {
    if (checkVaild(subjectInput) && checkVaild(gradeInput) && checkVaild(creditInput)) {
        allCredits.push(creditInput.value)
        allGrades.push(gradeInput.value)
        createSubject()
        resetInputs()
        checkTotalSubjects()
    } else {
        alert("Grade or Credit or Subject must be enter.")
    }
})

// commit - show final result