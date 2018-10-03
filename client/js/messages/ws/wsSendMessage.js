function wsSendMessage() {
    let message = makeMessage();
    thriftWSConnection.seqid++;
    thriftWSConnection.SendMessage(message, sendMessageRes => {
        idController.sendIdAdd();
        console.log("sendRes");
        console.log(sendMessageRes);
    });
}
