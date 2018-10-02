function wsSendMessage() {
    let message = makeMessage();
    new Promise((resolve) => {
        thriftWSConnection.seqid++;
        thriftWSConnection.SendMessage(message, sendMessageRes => {
            resolve(sendMessageRes);
        });
    }).then(sendMessageRes=> {
        idController.sendIdAdd();
        console.log("sendRes");
        console.log(sendMessageRes);
    }).catch(err=>{
        console.error(err);
    });
}
