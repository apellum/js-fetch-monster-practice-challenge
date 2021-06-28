//node getters
const nameInput = () => document.querySelector('#name-input');
const ageInput = () => document.querySelector('#age-input');
const descriptionInput = () => document.querySelector('#description-input');
const monsterForm = () => document.querySelector('#monster-form');
const monsterList = () => document.querySelector('#monster-container');
const forwardButton = () => document.querySelector('#forward');
const backButton = () => document.querySelector('#back');

//global variable
let startingIndex = 0;

const displayFiftyMonsters = () => {
    fetch("http://localhost:3000/monsters")
    .then(resp => resp.json())
    .then(data => {
        for(let i = startingIndex; i < startingIndex + 50; i++) {
            displayMonster(data[i])
            }
    })
}

const createMonster = () => {
    const monster = {}
    monster.name = nameInput().value;
    monster.age = ageInput().value;
    monster.description = descriptionInput().value;

    fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(monster)
    })
    .then(resp => resp.json())
    .then(data => {
        monsterList().innerHTML = ""
        displayMonster(data)
    })
}

monsterForm().addEventListener('submit', (event) => {
    event.preventDefault();
    createMonster();
})

const displayMonster = (monster) => {
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const h4 = document.createElement('h4');
    const p = document.createElement('p');
    const pId = document.createElement('p');

    h2.innerText = monster.name;
    h4.innerText = monster.age;
    p.innerText = monster.description;
    pId.innerText = monster.id;

    div.appendChild(h2);
    div.appendChild(h4);
    div.appendChild(p);
    div.appendChild(pId);

    monsterList().appendChild(div);
}

forwardButton().addEventListener('click', (e) => {
    monsterList().innerHTML = "";
    e.preventDefault();
    if (startingIndex > 950) {
        displayFiftyMonsters();
    } else {
    startingIndex += 50;
    displayFiftyMonsters();
    }
})

backButton().addEventListener('click', (e) => {
    monsterList().innerHTML = "";
    e.preventDefault();
    if (startingIndex < 50) {
        displayFiftyMonsters();
    } else {
    startingIndex -= 50;
    displayFiftyMonsters();
    }
})

document.addEventListener('DOMContentLoaded', () => {
    displayFiftyMonsters();
})
