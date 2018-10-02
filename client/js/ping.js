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
