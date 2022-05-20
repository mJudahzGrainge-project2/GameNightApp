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
        .then((jsonData) => {
            console.log(jsonData);
        })
}



gameApp.init();