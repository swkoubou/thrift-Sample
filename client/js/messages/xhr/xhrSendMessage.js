function xhrSendMessage() {
    let message = makeMessage();
    client.SendMessage(message).then(sendMessageRes => {
        idController.sendIdAdd();
        console.log("sendRes");
        console.log(sendMessageRes);
    }).catch(err=>{
        console.log(err);
    });
    console.log("end");
}