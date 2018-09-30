function init() {
    let pingCallback = document.querySelector("#ping-callback");
    let pingReturn = document.querySelector("#ping-return");
    let pingPromise = document.querySelector("#ping-promise");
    let pingCallbackWS = document.querySelector("#ping-callback-ws");
    let pingReturnWS = document.querySelector("#ping-return-ws");
    let pingPromiseWS = document.querySelector("#ping-promise-ws");

    let messageCallback = document.querySelector("#message-callback");
    let messageReturn = document.querySelector("#message-return");
    let messagePromise = document.querySelector("#message-promise");
    let messageCallbackWS = document.querySelector("#message-callback-ws");
    let messageReturnWS = document.querySelector("#message-return-ws");
    let messagePromiseWS = document.querySelector("#message-promise-ws");

    pingCallback.addEventListener("click", callbackPing);
    pingReturn.addEventListener("click", returnPing);
    pingPromise.addEventListener("click", promisePing);
    pingCallbackWS.addEventListener("click", callbackWSPing);
    pingReturnWS.addEventListener("click", returnWSPing);
    pingPromiseWS.addEventListener("click", promiseWSPing);

    messageCallback.addEventListener("click", callbackMessage);
    messageReturn.addEventListener("click", returnMessage);
    messagePromise.addEventListener("click", promiseMessage);
    messageCallbackWS.addEventListener("click", callbackWSMessage);
    messageReturnWS.addEventListener("click", returnWSMessage);
    messagePromiseWS.addEventListener("click", promiseWSMessage);
}

init();