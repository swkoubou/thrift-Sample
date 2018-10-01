let id = 0;

function makeMessage() {
    let messageElm = document.querySelector("#message-box");
    return new Message({
        id: id,
        type: MessageType.NORMAL,
        Content: messageElm.value,
    });
}

function callbackMessage() {
    let client = thriftHelper.thriftClient();
    let message = makeMessage();
    client.SendMessage(message, (res) => {
        console.log("sendRes");
        console.log(res);
    });
    client.GetMessage(id, (res) => {
        console.log("getRes");
        console.log(res);
    });
    id++;
    client.GetMessage(id, (res) => {
        console.log("getRes");
        console.log(res);
    });
    console.log("end");
}

function callbackWSMessage() {
    let message = makeMessage();
    thriftWSConnection.SendMessage(message, (res) => {
        console.log("sendRes");
        console.log(res);
    });
    thriftWSConnection.GetMessage(id, (res) => {
        console.log("getRes");
        console.log(res);
    });
    id++;
    thriftWSConnection.GetMessage(id, (res) => {
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
    new Promise((resolve) => {
        resolve(client.SendMessage(message));
    }).then(res => {
        console.log("sendRes");
        console.log(res);
        return client.GetMessage(id);
    }).then(res => {
        console.log("getRes");
        console.log(res);
        id++;
        return client.GetMessage(id);
    }).then(res => {
        console.log("getRes");
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
    console.log("end");
}

function promiseWSMessage() {
    let message = makeMessage();
    new Promise((resolve) => {
        thriftWSConnection.seqid++;
        thriftWSConnection.SendMessage(message, sendMessageRes => {
            console.log(sendMessageRes);
            resolve(sendMessageRes);
        });
    }).then(sendMessageRes => {
        console.log("sendRes");
        console.log(sendMessageRes);
        thriftWSConnection.seqid++;
        return new Promise((resolve) => {
            thriftWSConnection.GetMessage(id, getMessageRes1 => {
                resolve(getMessageRes1);
            });
        });
    }).then(getMessageRes1 => {
        console.log("getRes");
        console.log(getMessageRes1);
        id++;
        thriftWSConnection.seqid++;
        return new Promise((resolve) => {
            thriftWSConnection.GetMessage(id, getMessageRes2 => {
                resolve(getMessageRes2);
            });
        });
    }).then(getMessageRes2 => {
        console.log("getRes");
        console.log(getMessageRes2);
    }).catch(err => {
        console.error(err);
    });
    console.log("end");
}
