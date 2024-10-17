const inputField = document.getElementById("input-field")
const submitButton = document.getElementById("submit-button");
const removeAll = document.querySelector(".remove");
const list = document.getElementById("list");
const error = document.getElementById("error")

function outPutData() {
    inputField.focus();
    let inputValue = inputField.value;
    if (inputValue.length > 0) {
        inputField.value = '';
        const text = document.createTextNode(inputValue)
        const div = document.createElement('div');
        const removeButton = document.createElement('button');
        const strikeButton = document.createElement('input');
        strikeButton.setAttribute('id', 'strike')
        strikeButton.setAttribute('class', 'strike')
        strikeButton.setAttribute('type', 'checkbox')
        div.setAttribute('class', 'list-item');
        removeButton.setAttribute('class', 'remove-note fa-solid fa-x');

        div.appendChild(strikeButton)
        div.appendChild(removeButton)
        div.appendChild(text)
        list.appendChild(div);

        let data = list.innerHTML;
        localStorage.setItem('storedData', data);
    }
    else {
        error.innerText = " You have to type something";
    }
}


function fremoveAll() {
    localStorage.clear()
    list.innerHTML = "";
}


function fremoveNote(e) {
    if (e.target.classList.contains('remove-note')) {
        e.target.closest('.list-item').remove();
        localStorage.removeItem('storedData')
        let newData = list.innerHTML;
        localStorage.setItem('newStoredData', newData);
    }
}


function strikeText(e) {
    if (e.target.checked) {
        e.target.closest('.list-item').setAttribute('style', 'text-decoration:line-through');
        
        localStorage.removeItem('storedData')
        e.target.setAttribute('checked', '')
        let newData = list.innerHTML;
        localStorage.setItem('storedData', newData);
    } else {
        e.target.removeAttribute('checked', '')
        e.target.closest('.list-item').removeAttribute('style');
        localStorage.removeItem('storedData')
        let newData = list.innerHTML;
        localStorage.setItem('storedData', newData);
    }
}


function getElement() {
    const interval = setInterval(() => {
        if (document.querySelectorAll('.strike')) {
            console.log(document.querySelectorAll('.strike'))
            for (let i = 0; i < document.querySelectorAll('.strike').length; i++) {
                document.querySelectorAll('.strike')[i].addEventListener('click', strikeText)
            }
            clearInterval(interval);
        }
    }, 100)
}



inputField.addEventListener('input', () => {
    error.innerText = '';
})

submitButton.addEventListener('click', outPutData)
document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        outPutData();
        getElement()
    }
})

list.innerHTML = localStorage.getItem('storedData');


getElement();
submitButton.addEventListener('click', getElement)


list.addEventListener('click', fremoveNote)




removeAll.addEventListener('click', fremoveAll);



if (localStorage.getItem('storedData') == null) {
    list.innerHTML = localStorage.getItem('newStoredData');
} else {
    list.innerHTML = localStorage.getItem('storedData');
}

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState == 'visible') {
        document.title = "Keep Infos Safe"
    }
    if (document.visibilityState == 'hidden') {
        document.title = 'Wanna add something?'
    }
})