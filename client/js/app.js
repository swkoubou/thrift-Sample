class thriftHelper {
    static thriftClient() {
        let endpoint = `http://localhost:9999/thrift`;
        let transport = new Thrift.TXHRTransport(endpoint);
        let protocol = new Thrift.TJSONProtocol(transport);
        return new DefaultClient(protocol);
    }

    static thriftWSClient() {
        let endpoint = `ws://localhost:9999/wsThrift`;
        let transport = new Thrift.TWebSocketTransport(endpoint);
        let protocol = new Thrift.TJSONProtocol(transport);
        transport.open();
        return new DefaultClient(protocol);
    }
}

let thriftWSConnection = thriftHelper.thriftWSClient();