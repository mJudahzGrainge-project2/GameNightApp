const gameApp = {};

gameApp.clientId = `G3733FStWX`
gameApp.endPoint = `https://api.boardgameatlas.com/api/search`

gameApp.init = () => {
    gameApp.getGame()
}

gameApp.getGame = () => {
    const atlasUrl = new URL(gameApp.endPoint)

    atlasUrl.search = new URLSearchParams({
        limit: 100,
        client_id: gameApp.clientId
    })
    fetch(atlasUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            gameApp.displayGames(data.games)
        });
}

const playerAmount = document.querySelector('select[name=players]').value;
const timeLimit = document.querySelector('select[name=time]').value;

const getRandomItem = (array) => {
    const RandomIndex = Math.floor(Math.random() * array.length)
    return array[RandomIndex];
}
gameApp.displayGames = (gameArray) => {
    const playerFilter = gameArray.filter(function (games) {
        return games.max_players >= playerAmount && games.max_playtime <= timeLimit;
    })
    const selectedGame = getRandomItem(playerFilter)
    console.log(selectedGame.name)


    const testDiv = document.querySelector('.test')
    const gameName = document.createElement('h4')
    const gameImg = document.createElement('img')
    const gameDescription = document.createElement('p')
    testDiv.append(gameName)
    testDiv.append(gameImg)
    testDiv.append(gameDescription)
    gameName.innerHTML = `${selectedGame.name}`;
    gameImg.setAttribute('src', selectedGame.image_url)
    gameDescription.innerHTML = `${selectedGame.description}`
};

function refreshPage ()

const button = document.querySelector('button');
button.addEventListener('click', function(displayGames) {
console.log(displayGames);

function refreshPage(){
    window.location.reload();
}
});



gameApp.init();