namespace go goSample

enum MassageType {
	NORMAL = 1;
	IMAGE = 2;
	VIDEO = 3;
}

struct Message {
	1: i32 id;
	2: MassageType type,
	3: string Content,
}

exception DefaultException {
    1: i32 ErrorCode,
    2: string Text
}

service Default {
	string Ping();
	void SendMessage(1: Message message) throws(1:DefaultException error);
	Message GetMessage(1: i32 id) throws(1:DefaultException error);
}