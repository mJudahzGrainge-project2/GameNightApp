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
        return games.max_players >= playerAmount && games.max_playtime <= timeLimit && games.type === "game";
    })
    const selectedGame = getRandomItem(playerFilter)
    console.log(selectedGame.name)


    const gameDisplay = document.querySelector('.gameDisplay');
    const gameImage = document.querySelector('.gameImage');
    const gameInfo = document.querySelector('.gameInfo');
    const gameName = document.createElement('h2')
    const gameImg = document.createElement('img')
    const gameDescription = document.createElement('p')
    gameDisplay.append(gameName)
    gameImage.append(gameImg)
    gameInfo.append(gameDescription)
    gameName.innerHTML = `${selectedGame.name}`;
    gameImg.setAttribute('src', selectedGame.image_url)
    gameDescription.innerHTML = `${selectedGame.description}`


};
const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    location.reload();


})


gameApp.init();