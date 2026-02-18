let gameTypes = [] 
let selectedButton = null 
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
    }
 catch (error) {
    console.error('Erro:', error.message)
  }
createButtons(gameTypes)
}
getAllGames()

function click(button, type) {

    if (selectedButton) {
        selectedButton.style.background = 'white'
        selectedButton.style.color = selectedButton.style.borderColor
    }
    button.style.background = type.color
    button.style.color = 'white'

    selectedButton = button
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
        }
        button.addEventListener('click', () => {
            click(button, type)
        })
        buttonsContainer.appendChild(button)
    })
}


