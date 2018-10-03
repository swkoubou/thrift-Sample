function xhrSendMessage() {
    let message = makeMessage();
    client.SendMessage(message, sendMessageRes =>{
        idController.sendIdAdd();
        console.log("sendRes");
        console.log(sendMessageRes);
    });
    console.log("end");
}