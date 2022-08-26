# Chat room

## Description
Application allows you to have a chat in rooms. It is written in NodeJS and uses WebSocket and Bootstrap libraries.

## Technologies
- NodeJS
- Moustache
- Bootstrap
- Docker

## Installation
There are two ways to install this application. You can do it 
 1. directly on your machine or you can run it as a 
 2. Docker container.

### 1. Installation directly on your machine
#### Requirements:
 - NodeJS 12 or later
 - git (not required)

#### Installation steps:
1.1 Clone application by git or download it as ZIP and unpack it
```
git clone https://github.com/Bartosz95/chat-room.git
cd chat-room && npm install --production
```
1.2 Set an environment. You can use what port you want. By default it run on port 80.
```
export PORT=80
```
1.3 Launch
Run the application.
```
npm start
```
### 2. Installation as a docker container
#### Requirements
 - docker run environment

#### 2.1 Installation steps
Run the docker with a setting port
```
docker run -p 80:80 -d bartosz95/chat-room
```
2. Set an environment. You can use what port you want. By default it run on port 80.
```
export PORT=80
```

## Examples how to use it
Open a web browser on http://localhost/ . You should see welcome page like below.

![](doc/welcome1.png)

Now you have to fill fields. You should choose your name and room name. You cannot get access to a room if your name is already in use in a particular room. 
![](doc/welcome2.png)
After pressing the Join button you will redirect to room chat. Page will look like below.
![](doc/chat1.png)
If another user joins the room you will get a message about it and you will see his username on the sidebar on the left side.
![](doc/chat2.png)
You can send messages to others in the room. New messages will appear on the bottom of the messages view unless you scroll the window.
![](doc/chat3.png)
You can also send your localisation. After the user clicks on the link, a new tab will open and he sees you localisation.

## Summary
Application allowed to get familiar with WebSocket in Node JS.

### Addition info:
*Application was based on tutorial The Complete Node.js Developer Course (3rd Edition) which was created by Andrew Mead, Rob Percival and published by Packt Publishing*

