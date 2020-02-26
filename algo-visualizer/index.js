let arr;
const list = document.getElementById("elements")
const CONST_SPEED = 1000
let SPEED = CONST_SPEED
const inputField = document.getElementById("searchelement")
const runButton = document.getElementById("runButton")
const algoSelector = document.getElementById("algoSelector")
const generateElementsButton = document.getElementById("generateElementsButton")
const dataSetSizeInput = document.getElementById("dataSetSize")
const defaultDataSetSize = 15
const speedSlider = document.getElementById("speedSlider");
const binarySearchInfo = document.getElementById("binarySearchInfo")

const speedDisplay = document.getElementById("speed");

speedDisplay.innerHTML = speedSlider.value + 'x';

speedSlider.oninput = function() {
  speedDisplay.innerHTML = this.value +'x';
  SPEED  = CONST_SPEED /(Number(this.value))
}

function disableInputs(){
    runButton.disabled = true
    inputField.disabled = true
    algoSelector.disabled = true
    generateElementsButton.disabled = true 
}

function enableInputs(){
    runButton.disabled = false
    algoSelector.disabled = false
    generateElementsButton.disabled = false
    if(algoSelector.value == "binary" || algoSelector.value == "linear")
        inputField.disabled = false 
}


function generateRandomElements(size = defaultDataSetSize, sorted) {
    size = Number(dataSetSizeInput.value)
    console.log("hreer",size)
    list.innerHTML = ""
    console.log("genearte")
    arr = []
    while (size) {
        const randomNumber = Math.ceil(Math.random() * 100);
        arr.push(randomNumber);
        size--;
    }
    if (sorted) {
        arr.sort((a, b) => a - b)
    }
    arr.forEach(element => {
        var entry = document.createElement('li');
        entry.appendChild(document.createTextNode(element));
        list.appendChild(entry);
    });
}

async function checkAlgoAndRun() {
    let e = algoSelector.value;
    console.log(Number(inputField.value))
    if (e == "binary") {
        binarySearch(Number(inputField.value))
        inputField.value = ""
    }
    else if (e == "selectionSort") selectionSort()
    else if (e == "bubbleSort") bubbleSort()
    else {
        linearSearch(Number(inputField.value))
        inputField.value = ""
    }

}

function whichAlgoSelected(that) {
    if (that.value == "binary" || that.value == "linear") {
        if (that.value == "binary"){
            generateRandomElements(0, true)
            binarySearchInfo.style.display = "block"
        } else
        binarySearchInfo.style.display = "none"
        inputField.disabled = false;
    } else {
        inputField.disabled = true;
        binarySearchInfo.style.display = "none"


    }
}


async function linearSearch(x) {
    disableInputs()
    let i;
    for (i = 0; i < list.children.length; i++) {
        if (x === Number(list.children[i].innerHTML)) {
            list.children[i].style.backgroundColor = "#28a745"
            await new Promise(r => setTimeout(r, SPEED / 10));
            break
        }
        list.children[i].style.backgroundColor = "#dc3545"
        await new Promise(r => setTimeout(r, SPEED));
    }
    if (i >= list.children.length) {
        alert("Not found")
        generateRandomElements(defaultDataSetSize)
    } else {
        alert("found at " + (i + 1) + " place")
        generateRandomElements(defaultDataSetSize)
    }
    enableInputs()
}


async function binarySearch(x) {
    disableInputs()
    let start = 0
    let end = list.children.length - 1;
    while (start <= end) {
        let mid = Math.floor((end + start) / 2);
        console.log(start, mid, end)
        list.children[start].style.backgroundColor = "#1F8AC0"
        list.children[end].style.backgroundColor = "#1F8AC0"
        list.children[mid].style.backgroundColor = "#dc3545"
        let midElement = Number(list.children[mid].innerHTML)
        if (x > midElement) {
            await new Promise(r => setTimeout(r, SPEED));
            list.children[start].style.backgroundColor = ""
            list.children[end].style.backgroundColor = ""
            list.children[mid].style.backgroundColor = ""
            start = mid + 1

        }
        else if (x < midElement) {
            await new Promise(r => setTimeout(r, SPEED));
            list.children[start].style.backgroundColor = ""
            list.children[end].style.backgroundColor = ""
            list.children[mid].style.backgroundColor = ""
            end = mid - 1

        }
        else {
            await new Promise(r => setTimeout(r, SPEED));
            list.children[start].style.backgroundColor = ""
            list.children[end].style.backgroundColor = ""
            list.children[mid].style.backgroundColor = "#28a745"
            await new Promise(r => setTimeout(r, SPEED / 10));
            alert("Found at " + (mid + 1))
            generateRandomElements(defaultDataSetSize, true)
            enableInputs()
            return
        }
    }
    list.children[start].style.backgroundColor = ""
    await new Promise(r => setTimeout(r, SPEED / 10));
    alert("Element Not Found")
    generateRandomElements(defaultDataSetSize, true)
    enableInputs()
}

async function selectionSort() {
    disableInputs()
    for (i = 0; i < list.children.length; i++) {
        let min = i;
        list.children[min].style.borderColor = "#1F8AC0"
        for (let j = i + 1; j < list.children.length; j++) {
            list.children[min].style.backgroundColor = "pink"
            list.children[j].style.borderColor = "#1F8AC0"
            await new Promise(r => setTimeout(r, SPEED/2));
            if (Number(list.children[min].innerHTML) > Number(list.children[j].innerHTML)) {
                list.children[min].style.backgroundColor = ""
                min = j;
                await new Promise(r => setTimeout(r, SPEED/2));
                list.children[min].style.backgroundColor = "pink"
            } else {
                list.children[j].style.backgroundColor = ""
            }
            list.children[j].style.borderColor = "black"
        }
        if (min !== i) {
            list.children[i].classList.add("moveUp");
            list.children[min].classList.add("moveUp");
            await new Promise(r => setTimeout(r, SPEED/2));
            list.children[i].classList.remove("moveUp");
            list.children[min].classList.remove("moveUp");
            let tmp = Number(list.children[i].innerHTML);
            list.children[i].innerHTML = Number(list.children[min].innerHTML);
            list.children[min].innerHTML = tmp;
            list.children[min].style.backgroundColor = ""
        }
        list.children[i].style.backgroundColor = "#28a745"
        list.children[i].style.borderColor = "black"

    }
    enableInputs()
}

async function bubbleSort() {
    disableInputs()
    let len = list.children.length;
    for (let i = 0; i < len; i++) {
        let j;
        for (j = 0; j < len - i - 1; j++) {
            list.children[j].style.backgroundColor = "pink"
            list.children[(j + 1)].style.backgroundColor = "pink"
            await new Promise(r => setTimeout(r, SPEED/2));
            if (Number(list.children[j].innerHTML) > Number(list.children[j + 1].innerHTML)) {
                list.children[j].classList.add("moveUp");
                await new Promise(r => setTimeout(r, SPEED/2));
                list.children[j].classList.remove("moveUp");
                let tmp = Number(list.children[j].innerHTML);
                list.children[j].innerHTML = Number(list.children[j + 1].innerHTML);
                list.children[j + 1].innerHTML = tmp;
            } else {
                list.children[j + 1].classList.add("moveUp");
                await new Promise(r => setTimeout(r, SPEED/2));
                list.children[j + 1].classList.remove("moveUp");
            }
            list.children[j].style.backgroundColor = ""
            list.children[j + 1].style.backgroundColor = ""
        }
        list.children[j].style.backgroundColor = "#28a745"
    }
    enableInputs()

}

generateRandomElements(defaultDataSetSize)