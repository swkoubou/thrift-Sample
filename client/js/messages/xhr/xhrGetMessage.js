function xhrGetMessage() {
    new Promise((resolve) => {
        client.GetMessage(idController.id.value, getMessageRes => {
            resolve(getMessageRes);
        });
    }).then(getMessageRes => {
        idController.add();
        console.log("getRes");
        console.log(getMessageRes);
    }).catch(err => {
        console.error(err);

    });
}
