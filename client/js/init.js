function init() {
    let ping = document.querySelector("#test-ping");
    let sendMessage = document.querySelector("#test-send");
    let getMessage = document.querySelector("#test-get");

    ping.addEventListener("click", ()=>{
        handler.pingHandle();
    });
    sendMessage.addEventListener("click", ()=>{
        handler.sendHandle();
    });
    getMessage.addEventListener("click", ()=>{
        handler.getHandle();
    });
}

init();