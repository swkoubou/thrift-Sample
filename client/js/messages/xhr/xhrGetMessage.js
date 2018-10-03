function xhrGetMessage() {
    client.GetMessage(idController.getId.value, getMessageRes => {
        idController.getIdAdd();
        console.log("getRes");
        console.log(getMessageRes);
    });
}
