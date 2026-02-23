let gameTypes = [] 
let selectedButton = null 
let selectedNumbers = []
let currentType = null

async function getAllGames() { 
    try{ 
        const result = await fetch('games.json')    
        console.log(result)
        if(!result.ok) { 
            throw new Error('Erro ao carregar o arquivo JSON') 
        }
        const data = await result.json()    
        console.log(data)
        if(!data.types) {
            throw new Error('Erro ao carregar o arquivo JSON')
            }  
        gameTypes = data.types
        createButtons(gameTypes)
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
    }
    )
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
    selectedNumbers = [] // limpa seleção ao trocar jogo

    createDescription(type)
    createNumbers(type)
}
function createButtons(types) { 

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

function choseNumbers(button) {

    const number = Number(button.innerText) // Conversão de string para número
    const max = currentType["max-number"] // Define o limite de números que podem ser selecionados para o jogo atual.

    const index = selectedNumbers.indexOf(number) // Procura um valor dentro da lista
    // Se já está selecionado → desmarca
    if (index !== -1) {
        selectedNumbers.splice(index, 1) //Remova 1 elemento a partir da posição index
        button.style.background = ''
        button.style.color = ''
        return
    }
    // Se atingiu limite
    if (selectedNumbers.length >= max) { 
        alert(`Você só pode selecionar ${max} números em ${currentType.type}`) 
        return // Impede que o número seja selecionado além do limite.
    }
    // Marca número
    selectedNumbers.push(number) //Adiciona número como selecionado
    button.style.background = currentType.color
    button.style.color = 'white'
}
