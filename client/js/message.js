function makeMessage() {
    let messageElm = document.querySelector("#message-box");
    return new Message({
        id: idController.sendId.value,
        type: MessageType.NORMAL,
        Content: messageElm.value,
    });
}