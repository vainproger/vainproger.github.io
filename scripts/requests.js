let promiseCount = 0;
let itemOnWindow = 0;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function serialize(data){
    let userinfo = [];
    userinfo[0] = data['username'];
    userinfo[1] = data['name'];
    userinfo[2] = data['email'];
    userinfo[3] = data['address']['city'];
    userinfo[4] = data['phone'];
    userinfo[5] = data['website'];
    userinfo[6] = data['company']['name'];
    return userinfo;
}

function testPromise() {
    let card = document.getElementsByClassName("userCardDiv");
    if (card.length > 0)
    {
        card[0].remove();
    }
    let error = document.getElementsByClassName("errorMessageDiv");
    if (error.length > 0)
    {
        error[0].remove();
    }
    let promise_block = document.getElementById("log");
    let gifLoad = document.createElement("img");
    gifLoad.id = "gif";
    gifLoad.src = "C://Users/Вадим/Desktop/web/Lab1/img/loading3.gif";
    promise_block.appendChild(gifLoad);
    let p1 = new Promise(async (resolve, reject) => {
        let tmp = getRandomInt(1, 11);
        let url = `https://jsonplaceholder.typicode.com/users/${tmp}`;
        let response;
        try{
            response = await fetch(url);
        } catch (e) {
            reject(new Error("network error"));
        }

        if (response.ok) {
            let commits = await response.json();
            let userData = serialize(commits);
            resolve(userData);
        }
        reject(new Error("network error"));
    });
    p1.then(function(val) {
        let child = document.getElementById("gif");
        promise_block.removeChild(child);
        let card = document.getElementById("userCard");
        var clone = card.content.cloneNode(true);
        for (i = 1; i <= val.length; i++){
            clone.childNodes[1].childNodes[i * 4 - 1].textContent = val[i - 1];
        }
        promise_block.appendChild(clone);
    }).catch((reason) => {
        let child = document.getElementById("gif");
        promise_block.removeChild(child);
        let error_card = document.getElementById("errorMessage");
        var error_clone = error_card.content.cloneNode(true);
        error_clone.childNodes[1].childNodes[0].textContent = `${reason}`;
        promise_block.appendChild(error_clone);
    });
}

document.addEventListener('DOMContentLoaded', LoadPromise, false);

function LoadPromise() {
    let btn = document.getElementById("promise-button");
    btn.addEventListener("click", testPromise);
}