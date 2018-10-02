function wsSendMessage() {
    let message = makeMessage();
    thriftWSConnection.seqid++;
    thriftWSConnection.SendMessage(message).then(sendMessageRes => {
        idController.sendIdAdd();
        console.log("sendRes");
        console.log(sendMessageRes);
    }).catch(err => {
        console.error(err);
    });
}
