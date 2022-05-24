const gameApp = {};

gameApp.clientId = `G3733FStWX`
gameApp.endPoint = `https://api.boardgameatlas.com/api/search`

gameApp.init = () => {
    gameApp.giveResult();
}

gameApp.getGame = () => {
    const atlasUrl = new URL(gameApp.endPoint)

    atlasUrl.search = new URLSearchParams({
        skip: arraySkip(),
        order_by: 'rank',
        limit: 100,
        client_id: gameApp.clientId
    })
    fetch(atlasUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            gameApp.displayGames(data.games)
        });
}


const arraySkip = () => {
    return Math.floor(Math.random() * 400);
}

const getRandomItem = (array) => {
    const RandomIndex = Math.floor(Math.random() * array.length)
    return array[RandomIndex];
}


function openPopup(){
    document.querySelector(".popup").style.display = "block";
        }


const closeButton = document.querySelector('#okayButton');

closeButton.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(".popup").style.display = "none";
});



gameApp.displayGames = (gameArray) => {
    const playerAmount = document.querySelector('select[name=players]').value;
    const timeLimit = document.querySelector('select[name=time]').value;

    if (playerAmount === '' || timeLimit === '') {  
        return openPopup()
    } else {
        
        console.log(playerAmount, timeLimit)
        const playerFilter = gameArray.filter(function (games) {
            return games.max_players >= playerAmount && games.max_playtime <= timeLimit && games.type === "game";
        })
        console.log(playerFilter);
        const selectedGame = getRandomItem(playerFilter)
        
        
        const gameDisplay = document.querySelector('.gameDisplay');
        const gameImage = document.querySelector('.gameImage');
        const gameInfo = document.querySelector('.gameInfo');
        const gamePackaging = document.querySelector('.gamePackaging')
        const gameName = document.querySelector('.gameName');
        const gameDescription = document.createElement('p');
        gameName.innerHTML = `${selectedGame.name}`;
        gamePackaging.setAttribute('src', selectedGame.image_url);
        gameInfo.innerHTML = ` <h3> Game Description:</h3> ${selectedGame.description}`;
    }
    };
    

gameApp.giveResult = () => {
    const form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
        // location.reload();
        e.preventDefault()
        gameApp.getGame()
    })
}

gameApp.init();






