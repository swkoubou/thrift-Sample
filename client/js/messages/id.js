class IdController {
    constructor() {
        this.sendId = document.querySelector("#message-send-id");
        this.getId = document.querySelector("#message-get-id");
        this.sendId.value = 0;
        this.getId.value = 0;
    }

    sendIdAdd(){
        this.sendId.value++;
    }

    getIdAdd(){
        this.getId.value++;
    }
}

let idController = new IdController();