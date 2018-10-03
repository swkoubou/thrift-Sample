function promisePing() {
    client.Ping(res=>{
        console.log(res);
    });
    console.log("end");
}

function promiseWSPing() {
    thriftWSConnection.Ping(res => {
        console.log(res);
    });
    console.log("end");
}
