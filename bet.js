let gameTypes = [] 
let selectedButton = null 
let selectedNumbers = []
let currentType = null
let totalValue = 0

async function getAllGames() { 
    try{ 
        const result = await fetch('games.json')    
        if(!result.ok) { 
            throw new Error('Erro ao carregar o arquivo JSON') 
        }
        const data = await result.json()    
        if(!data.types) {
            throw new Error('Erro ao carregar o arquivo JSON')
            }  
        gameTypes = data.types
        createFilterButtons(gameTypes)
    }
 catch (error) {
    console.error('Erro:', error.message)
  }
}   
getAllGames()

function createDescription(type) {
    const descriptionContainer = document.querySelector('.div_description2')

    descriptionContainer.innerHTML = ''

    const description = document.createElement('p')
    description.innerText = type.description

    descriptionContainer.appendChild(description)
    description.className = 'p_description'
}

function createNumbers(type) {
    const numbersContainer = document.querySelector('.Number_Buttons')

    numbersContainer.innerHTML = ''  

    Array.from({length: type.range}).map((_,number) =>{
        const button = document.createElement('button')
        button.innerText = number + 1   
        button.className = 'button_bet'

        button.addEventListener('click', () => {
            choseNumbers(button)
        })
        numbersContainer.appendChild(button)
    })
}

function click(button, type) {

    if (selectedButton) {
        selectedButton.style.background = 'white'
        selectedButton.style.color = selectedButton.style.borderColor
    }
    button.style.background = type.color
    button.style.color = 'white'

    selectedButton = button
    currentType = type
    selectedNumbers = []

    createDescription(type)
    createNumbers(type)
}

function createFilterButtons(types) { 

    const buttonsContainer = document.querySelector('.buttons1')

    types.map((type, index) => {

        const button = document.createElement('button')

        button.innerText = type.type
        button.style.background = 'white'
        button.style.border = 'solid'
        button.style.borderColor = type.color
        button.style.borderRadius = '100px'
        button.style.borderWidth = '2px'
        button.style.fontFamily = 'Arial'
        button.style.color = type.color
        button.style.fontSize = '14px'
        button.style.fontWeight = 'bold'
        button.style.width = '113px'
        button.style.height = '34px'

        button.classList.add('button')

        if (index === 0) {
            button.style.background = type.color
            button.style.color = 'white'
            selectedButton = button
            currentType = type
            createDescription(type)
            createNumbers(type)
        }
        button.addEventListener('click', () => {
            click(button, type)
        })
        buttonsContainer.appendChild(button)
    })
}
    const completeButton = document.querySelector('.complete')
    const clearButton = document.querySelector('.clear')
    const addCart = document.querySelector('.button_add')

    clearButton.addEventListener('click', () => {
        clearNumbers()
    })
    completeButton.addEventListener('click', () => {
        completeNumbers()
    })
    addCart.addEventListener('click', () => {
        addToCard()
    })

function choseNumbers(button) {
   
    const number = Number(button.innerText)
    const max = currentType["max-number"]

    const index = selectedNumbers.indexOf(number)

    if (index !== -1) {
        selectedNumbers.splice(index, 1)
        button.style.background = ''
        button.style.color = ''
        return
    }

    if (selectedNumbers.length >= max) {
        alert(`Você só pode selecionar ${max} números.`)
        return
    }
    selectedNumbers.push(number)
    button.style.background = currentType.color
    button.style.color = 'white'
}

function clearNumbers() {
    selectedNumbers = []
    const numbers = document.querySelectorAll('.button_bet')

    numbers.forEach(button => {
        button.style.background = ''
        button.style.color = ''
    })  
}

function completeNumbers() {

    const max = currentType["max-number"]
    const range = currentType.range

    if (selectedNumbers.length === max) {
        clearNumbers()
    }

    while (selectedNumbers.length < max) {  
        const randomNumber = Math.floor(Math.random() * range) + 1

        if (!selectedNumbers.includes(randomNumber)) {
            selectedNumbers.push(randomNumber)
        }
    }

    const buttons = document.querySelectorAll('.button_bet')

    buttons.forEach(button => {
        const number = Number(button.innerText)

        if (selectedNumbers.includes(number)) {
            button.style.background = currentType.color
            button.style.color = 'white'
        }
    })
}

function addToCard() {

    const max = currentType["max-number"]

    if (selectedNumbers.length !== max) {
    alert(`Selecione ${max} números antes de adicionar.`)
    return
}
    const gamesContainer = document.querySelector('.games')
    //gamesContainer.innerHTML = ''

    const gameDelete = document.createElement('button')
    const allDiv = document.createElement('div')
    const gameDiv = document.createElement('div')
    const numbersP = document.createElement('h4')
    const gameInfo = document.createElement('h4')
    
    allDiv.className = 'allDiv'
    gameDiv.className = 'div_border1'
    gameDelete.className = 'trash'
    numbersP.className = 'numbers'
    gameInfo.className = 'h4_loto'

    const sortedNumbers = [...selectedNumbers].sort((a, b) => a - b)

    
    gameDiv.style.borderColor = (currentType.color)
    gameDelete.innerHTML = `<svg class="svg_trash1" id="Layer_1" enable-background="new 0 0 512 512" height="24" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m424 64h-88v-16c0-26.467-21.533-48-48-48h-64c-26.467 0-48 21.533-48 48v16h-88c-22.056 0-40 17.944-40 40v56c0 8.836 7.164 16 16 16h8.744l13.823 290.283c1.221 25.636 22.281 45.717 47.945 45.717h242.976c25.665 0 46.725-20.081 47.945-45.717l13.823-290.283h8.744c8.836 0 16-7.164 16-16v-56c0-22.056-17.944-40-40-40zm-216-16c0-8.822 7.178-16 16-16h64c8.822 0 16 7.178 16 16v16h-96zm-128 56c0-4.411 3.589-8 8-8h336c4.411 0 8 3.589 8 8v40c-4.931 0-331.567 0-352 0zm313.469 360.761c-.407 8.545-7.427 15.239-15.981 15.239h-242.976c-8.555 0-15.575-6.694-15.981-15.239l-13.751-288.761h302.44z"/><path d="m256 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"/><path d="m336 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"/><path d="m176 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"/></g></svg>`
    numbersP.innerText = sortedNumbers.join(', ')
    gameInfo.innerHTML = `${currentType.type} <span> R$ ${currentType.price.toFixed(2).replace('.', ',')} </span>`
    gameInfo.style.color = (currentType.color)

    gamesContainer.appendChild(allDiv)
    allDiv.appendChild(gameDelete)
    allDiv.appendChild(gameDiv)
    gameDiv.appendChild(numbersP)
    gameDiv.appendChild(gameInfo)

    totalValue += currentType.price

    const gamePrice = currentType.price

    gameDelete.addEventListener('click', () => {
    allDiv.remove()

    totalValue -= gamePrice

    valueTotal()
    checkCart()
})
    clearNumbers()
    valueTotal()
    checkCart()
}

function valueTotal() {
    const valueContainer = document.querySelector('.totalContainer')

    const total = document.createElement('h3')

    valueContainer.innerHTML = ''
    total.innerHTML = `<b> CART </b> TOTAL: R$ ${totalValue.toFixed(2).replace('.',',')}`

    total.className = 'total'
    valueContainer.appendChild(total)
}

function saveGames () {
    const cart = document.querySelector('.games')

    if (cart.querySelectorAll('.allDiv').length === 0){
        alert('Adicione itens ao carrinho para salva-los!')
    } else {
         alert('Itens salvos com sucesso! ✅')
    }  
}

    const button = document.querySelector('.save')
    button.addEventListener('click', () => {
        saveGames()
    })

function checkCart() {

    const cart = document.querySelector('.games')
    const emptyCart = document.querySelector('.mensagem')

    if (cart.querySelectorAll('.allDiv').length === 0) {
        emptyCart.style.display = 'block'
    } else {
        emptyCart.style.display = 'none'
    }
}