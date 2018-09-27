all:
	@cd server && env GOOS=linux go build -o bin/server-linux
	@cd server && env GOOS=darwin go build -o bin/server-mac

mac-build:
	@cd server && env GOOS=darwin go build -o bin/server-mac

linux-build:
	@cd server && env GOOS=linux go build -o bin/server-linux
