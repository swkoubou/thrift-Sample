function wsGetMessage() {
    thriftWSConnection.seqid++;
    thriftWSConnection.GetMessage(idController.id.value).then(getMessageRes => {
        idController.add();
        console.log("getRes");
        console.log(getMessageRes);
    }).catch(err => {
        console.error(err);
    });
}