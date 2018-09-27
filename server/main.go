package main

import (
	"../gen-go/goSample"
	"bufio"
	"bytes"
	"context"
	"git.apache.org/thrift.git/lib/go/thrift"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/labstack/gommon/log"
	"io/ioutil"
	"net/http"
)

// WebSocketの設定
var wsUpgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	// CORSを無視して許可するように設定
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func main() {
	// ThriftのHandler
	handler := NewDefault()
	processor := goSample.NewDefaultProcessor(handler)
	factory := thrift.NewTJSONProtocolFactory()

	// Ginの初期化
	r := gin.Default()

	// ThriftのHTTPの受け口
	r.POST("thrift", NewThriftHandlerFunc(processor, factory, factory))

	// ThriftのWebSocketの受け口
	r.GET("wsThrift", func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		NewThriftWebSocketHandlerFunc(processor, factory, factory)(c.Writer, c.Request)
	})

	// CORSのリクエスト用
	r.OPTIONS("thrift", AllowCrossOrigin)
	r.OPTIONS("wsThrift", AllowCrossOrigin)

	// サーバーを起動させる
	r.Run("0.0.0.0:9999")
}

// どのドメインだろうとCORSを許可させる
func AllowCrossOrigin(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "X-Access-Token, Origin, Content-Type")
	c.String(http.StatusNoContent, "")
}

// ThriftのHTTPの受け口
func NewThriftHandlerFunc(processor thrift.TProcessor, inPfactory, outPfactory thrift.TProtocolFactory) func(c *gin.Context) {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		transport := thrift.NewStreamTransport(c.Request.Body, c.Writer)
		ctx := context.Background()
		processor.Process(ctx, inPfactory.GetProtocol(transport), outPfactory.GetProtocol(transport))
	}
}

// ThriftのWebSocketの受け口
func NewThriftWebSocketHandlerFunc(processor thrift.TProcessor, inPfactory, outPfactory thrift.TProtocolFactory) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		// WSのUpgrade
		conn, err := wsUpgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Printf("Failed to set websocket upgrade: %+v\n", err)
			return
		}

		// メッセージループ
		for {
			// Clientから送られてきたメッセージを読み取る
			t, msg, err := conn.ReadMessage()
			// メッセージ読み取りに失敗したらループ破棄
			if err != nil {
				break
			}

			// ReaderをmessageのByte[]から作成
			r := bytes.NewReader(msg)

			// WriteBufferを作成
			var wb bytes.Buffer
			// Writerを作成
			w := bufio.NewWriter(&wb)

			// ThriftのTransportを Reader/Writer を作成
			transport := thrift.NewStreamTransport(r, w)
			// contextは特に使わないのでbackgroundに指定し、作成
			ctx := context.Background()
			// Thriftを実行させる
			processor.Process(ctx, inPfactory.GetProtocol(transport), outPfactory.GetProtocol(transport))

			// Thriftにより書き込まれたWriterをByte[]として読み取り
			thriftResult, err := ioutil.ReadAll(&wb)
			if err != nil {
				log.Printf("thriftResult ioutil.ReadAll error: %+v\n", err)
			}

			// WSのConnectionにThriftの実行結果を書き込み
			conn.WriteMessage(t, thriftResult)
		}
	}
}
