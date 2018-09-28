package main

import (
	"../gen-go/goSample"
	"context"
	"fmt"
)

type Default struct {
	sendMessages map[int32]*goSample.Message
}

func NewDefault() *Default {
	return &Default{
		make(map[int32]*goSample.Message, 0),
	}
}

func (d *Default) Ping(ctx context.Context) (message string, err error) {
	return "pong", nil
}

func (d *Default) SendMessage(ctx context.Context, message *goSample.Message) (err error) {
	if _, ok := d.sendMessages[message.ID]; ok {
		re := goSample.NewDefaultException()
		re.ErrorCode = 400
		re.Text = fmt.Sprintf("指定されたIDのメッセージはすでに存在します")
		return re
	}

	d.sendMessages[message.ID] = message
	return nil
}

func (d *Default) GetMessage(ctx context.Context, id int32) (r *goSample.Message, err error) {
	if msg, ok := d.sendMessages[id]; !ok {
		_err := goSample.NewDefaultException()
		_err.ErrorCode = 404
		_err.Text = "指定されたメッセージがありません"

		return nil, _err
	} else {
		return msg, nil
	}
}
