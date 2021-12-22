(function getSpeedInfo(){
    window.addEventListener("load", () => {
        let endTime = performance.now();
        let speedInfo = document.getElementById("speed");
        speedInfo.innerHTML += endTime + " ms"
    })
})();