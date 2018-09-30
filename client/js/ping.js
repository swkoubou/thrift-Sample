function callbackPing() {
    let client = thriftHelper.thriftClient();
    client.Ping(res => {
        console.log(res);
    });
    console.log("end");
}

function callbackWSPing() {
    thriftWSConnection.Ping(res => {
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
    new Promise((resolve) => {
        resolve(client.Ping());
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
    console.log("end");
}

function promiseWSPing() {
    new Promise((resolve) => {
        thriftWSConnection.Ping(res => {
            resolve(res);
        });
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
    console.log("end");
}
