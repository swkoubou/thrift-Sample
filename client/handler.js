class Handler {
    constructor(){
        this.xhr = document.querySelector("#method-xhr");
        this.ws = document.querySelector("#method-ws");
    }

    pingHandle() {
        if(this.xhr.checked){
            promisePing();
        }else if(this.ws.checked){
            promiseWSPing();
        }
    }

    sendHandle() {
        if(this.xhr.checked){
            xhrSendMessage();
        }else if(this.ws.checked){
            wsSendMessage();
        }
    }

    getHandle() {
        if(this.xhr.checked){
            xhrGetMessage();
        }else if(this.ws.checked){
            wsGetMessage();
        }
    }
}

let handler = new Handler();