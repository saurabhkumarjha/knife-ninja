const queryParams = {};
(() => {
    try {
        let url = window.location.search;
        if (url) {
            url = decodeURIComponent(url);
        }
        const temp1 = url.split("?");
        if (temp1 && temp1.length > 1) {
            const temp2 = temp1[1].split("&");
            if (temp2 && temp2.length) {
                temp2.forEach((arr) => {
                    const temp3 = arr.split("=");
                    if (temp3 && temp3.length === 2) {
                        queryParams[temp3[0]] = temp3[1];
                    }
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
})();

function sendScore(gameScore, duration) {
    // return 0;
    const url = `https://api.mintavibe.com/games/v1/games/scores?sessionid=${queryParams.sessionid}&userid=${queryParams.userid}&score=${gameScore}&duration=${duration}&game_id=${queryParams.game_id}&env=${queryParams.env}`;

    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
}


function sendPostMessage(message) {
    window.parent.postMessage(String(message));
    console.log("post message: ", message)
}


// const scriptsInEvents = {

// 	async Game_Event66_Act1(runtime, localVars)
// 	{
// 		let messageObj = {
// 		gameState: runtime.globalVars.gameStates,
// 		totalPoint: runtime.globalVars.gamePoints
// 		}
// 		sendPostMessage(messageObj);
		
// 	},

// 	async Game_Event68_Act1(runtime, localVars)
// 	{
// 		sendScore(runtime.globalVars.gamePoints);
		
// 	}

// };

// self.C3.ScriptsInEvents = scriptsInEvents;




const scriptsInEvents = {

	async Game_Event66_Act1(runtime, localVars)
	{
		let messageObj = {
		gameState: runtime.globalVars.gameStates,
		totalPoint: runtime.globalVars.gamePoints,
		}
		sendPostMessage(messageObj);
		
	},

	async Game_Event68_Act1(runtime, localVars)
	{
		sendScore(runtime.globalVars.gamePoints, runtime.globalVars.gameDuration);
		
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

