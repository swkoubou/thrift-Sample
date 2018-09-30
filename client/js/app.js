class thriftHelper {
    static thriftClient() {
        let endpoint = `http://localhost:9999/thrift`;
        let transport = new Thrift.TXHRTransport(endpoint);
        let protocol = new Thrift.TJSONProtocol(transport);
        return new DefaultClient(protocol);
    }
    static thriftWSClient(){
        let endpoint = `ws://localhost:9999/wsThrift`;
        let transport = new Thrift.TWebSocketTransport(endpoint);
        let protocol = new Thrift.TJSONProtocol(transport);
        transport.open();
        return new DefaultClient(protocol);
    }
}

let thriftWSConnection = thriftHelper.thriftWSClient();

let id = 0;
function makeMessage() {
    let messageElm = document.querySelector("#message-box");
    return new Message({
        id: id,
        type: MessageType.NORMAL,
        Content: messageElm.value,
    });
}

function callbackPing() {
    let client = thriftHelper.thriftClient();
    client.Ping(res=>{
        console.log(res);
    });
    console.log("end");
}

function callbackWSPing() {
    thriftWSConnection.Ping(res=>{
        console.log(res);
    });
    console.log("end");
}

function returnPing() {
    let client = thriftHelper.thriftClient();
    let res = client.Ping();
    console.log(res);
    console.log("end");
}

function returnWSPing() {
    let res = thriftWSConnection.Ping();
    console.log(res);
    console.log("end");
}

function promisePing() {
    let client = thriftHelper.thriftClient();
    new Promise( (resolve) => {
        let res = client.Ping();
        resolve(res);
    }).then(res => {
        console.log(res);
    }).catch(err =>{
        console.log(err);
    });
    console.log("end");
}

function promiseWSPing() {
    new Promise((resolve) => {
        thriftWSConnection.Ping(res=>{
            resolve(res);
        });
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
    console.log("end");
}

function callbackMessage() {
    let client = thriftHelper.thriftClient();
    let message = makeMessage();
    client.SendMessage(message,(res)=>{
        console.log("sendRes");
        console.log(res);
    });
    client.GetMessage(id,(res)=>{
        console.log("getRes");
        console.log(res);
    });
    id++;
    client.GetMessage(id,(res)=>{
        console.log("getRes");
        console.log(res);
    });
    console.log("end");
}

function callbackWSMessage() {
    let message = makeMessage();
    thriftWSConnection.SendMessage(message,(res)=>{
        console.log("sendRes");
        console.log(res);
    });
    thriftWSConnection.GetMessage(id,(res)=>{
        console.log("getRes");
        console.log(res);
    });
    id++;
    thriftWSConnection.GetMessage(id,(res)=>{
        console.log("getRes");
        console.log(res);
    });
    console.log("end");
}

function returnMessage() {
    let client = thriftHelper.thriftClient();
    let message = makeMessage();
    let res = client.SendMessage(message);
    console.log("sendRes");
    console.log(res);
    res = client.GetMessage(id);
    console.log("getRes");
    console.log(res);
    id++;
    res = client.GetMessage(id);
    console.log("getRes");
    console.log(res);
    console.log("end");
}

function returnWSMessage() {
    let message = makeMessage();
    let res = thriftWSConnection.SendMessage(message);
    console.log("sendRes");
    console.log(res);
    res = thriftWSConnection.GetMessage(id);
    console.log("getRes");
    console.log(res);
    id++;
    res = thriftWSConnection.GetMessage(id);
    console.log("getRes");
    console.log(res);
    console.log("end");
}

function promiseMessage() {
    let client = thriftHelper.thriftClient();
    let message = makeMessage();
    new Promise((resolve) =>{
        let res = client.SendMessage(message);
        console.log(res);
        resolve(res);
    }).then(res =>{
        console.log("sendRes");
        console.log(res);
        client.GetMessage(id,res=>{
            return res;
        });
    }).then(res => {
        console.log("getRes");
        console.log(res);
        id++;
        client.GetMessage(id,(res)=>{
            return res;
        });
    }).then(res=>{
        console.log("getRes");
        console.log(res);
    }).catch(err=>{
        console.log(err);
    });
    console.log("end");
}

function promiseWSMessage() {
    let message = makeMessage();
    new Promise((resolve)=>{
        thriftWSConnection.SendMessage(message,res => {
            console.log(res);
            resolve(res);
        });
    }).then(res=>{
        console.log("sendRes");
        console.log(res);
        thriftWSConnection.GetMessage(id,res => {
            return res;
        });
    }).then(res=>{
        console.log("getRes");
        console.log(res);
        id++;
        thriftWSConnection.GetMessage(id,res => {
            return res;
        });
    }).then(res=>{
        console.log("getRes");
        console.log(res);
    }).catch(err=>{
        console.log(err);
    });
    console.log("end");
}

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