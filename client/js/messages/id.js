class IdController {
    constructor() {
        this.id = document.querySelector("#message-id");
        this.sendId = 0;
        this.id.value = 0;
    }

    add(){
        this.id.value++;
    }

    sendIdAdd(){
        this.sendId++;
    }
}

let idController = new IdController();