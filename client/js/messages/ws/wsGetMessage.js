function wsGetMessage() {
    thriftWSConnection.seqid++;
    thriftWSConnection.GetMessage(idController.getId.value, getMessageRes => {
        idController.getIdAdd();
        console.log("getRes");
        console.log(getMessageRes);
    })
}