import { active, inactive } from '../data/Active_inactive.js';
import { data } from '../data/data.js';

const extensionContainer = document.querySelector('.main');
const extensionOptionBtn = document.querySelectorAll('.extension-list-option-btn');
const visonMode = document.querySelector('.visual-mode');
const body = document.body;
let previousbtn = document.querySelector('.all-extensions');

let checkbox;
let removeBtn;

displayExtension(data);

function displayExtension(array) {
    setUpHtml(array);

    removeBtn = document.querySelectorAll('.remove');
    checkbox = document.querySelectorAll('.checkboxInput');

    setUpCheckBox(array);
    setActiveInactive();

    removeBtn.forEach(remove => {
        remove.addEventListener('click', () => {
            const removeId = remove.dataset.removeId;

            const index = data.findIndex(item => item.id == removeId);
            if (index !== -1) {
                data.splice(index, 1);
            }

            active.length = 0;
            inactive.length = 0;
            setActiveInactive();

            displayExtension(array);
        });
    });

    checkbox.forEach((check, index) => {
        check.addEventListener('change', () => {
            const item = array[index];
            item.isActive = check.checked;

            if (check.checked) {
                if (!active.includes(item)) active.push(item);
                const idx = inactive.indexOf(item);
                if (idx !== -1) inactive.splice(idx, 1);
            } else {
                if (!inactive.includes(item)) inactive.push(item);
                const idx = active.indexOf(item);
                if (idx !== -1) active.splice(idx, 1);
            }
        });
    });
}

function setUpHtml(array) {
    let html = ``;
    array.forEach((item) => {
        html += `
            <div class="extension-item">
                <label class="extension-item-logo">${item.logo}</label>
                <div class="extension-item-detail">
                    <p class="extension-item-name">${item.name}</p>
                    <p class="extension-item-content">${item.description}</p>
                </div>
                <div class="extension-item-actions">
                    <button class="remove" data-remove-id="${item.id}"><span>Remove</span></button>
                    <input type="checkbox" class="checkboxInput" data-toggle-id="${item.id}">
                </div>
            </div>
        `;
    });
    extensionContainer.innerHTML = html;
}

function setActiveInactive() {
    active.length = 0;
    inactive.length = 0;

    data.forEach((item) => {
        if (item.isActive) {
            active.push(item);
        } else {
            inactive.push(item);
        }
    });
}

function setUpCheckBox(array) {
    checkbox.forEach((check, index) => {
        check.checked = array[index].isActive === true;
    });
}

extensionOptionBtn.forEach(button => {
    button.addEventListener('click', () => {
        if (previousbtn.classList.contains('active')) {
            button.classList.add('active');
            previousbtn.classList.remove('active');
            previousbtn = button;

            if (button.classList.contains('all-extensions')) {
                displayExtension(data);
            } else if (button.classList.contains('active-extensions')) {
                displayExtension(active);
            } else if (button.classList.contains('inactive-extensions')) {
                displayExtension(inactive);
            }
        }
    });
});



visonMode.addEventListener('click' , () => {
    if(body.classList.contains('light-mode')){
        body.classList.remove('light-mode');
        visonMode.innerHTML = `<svg class="visual-mode-logo" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22"><g clip-path="url(#a)"><path stroke="#FBFDFE" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.98" d="M11 1.833v1.834m0 14.666v1.834M3.667 11H1.833m3.955-5.212L4.492 4.492m11.72 1.296 1.297-1.296M5.788 16.215l-1.296 1.296m11.72-1.296 1.297 1.296M20.167 11h-1.834m-2.75 0a4.583 4.583 0 1 1-9.167 0 4.583 4.583 0 0 1 9.167 0Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h22v22H0z"/></clipPath></defs></svg>`

    }

    else{
        body.classList.add('light-mode')
        visonMode.innerHTML = `<svg class="visual-mode-logo" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22"><g clip-path="url(#a)"><path class="path2" stroke="#ffffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.98" d="M20.125 11.877A7.333 7.333 0 1 1 10.124 1.875a9.168 9.168 0 1 0 10.001 10.002Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h22v22H0z"/></clipPath></defs></svg>`
    }
})
