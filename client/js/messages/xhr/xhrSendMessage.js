function xhrSendMessage() {
    let message = makeMessage();
    new Promise((resolve) => {
        client.SendMessage(message, sendMessageRes =>{
            resolve(sendMessageRes);
        });
    }).then(sendMessageRes => {
        idController.sendIdAdd();
        console.log("sendRes");
        console.log(sendMessageRes);
    }).catch(err=>{
        console.log(err);
    });
    console.log("end");
}