


# talk to chatbot

`POST /talk`

### **request header:**

```
Content-Type: application/json
```


### **request body:**
```
{
	"query": string,
	"sessionId": srting (userid-convId)
}
```
### **response:**

```
{
    "messages": [
        {
            "speech": "Text response",
            "type": 0 // text
        },
        {
            "title": string,
            "replies": string[],
            "type": 2 //quick reply
        },        
        {
            "imageUrl": "http://urltoimage.com",
            "type": 3 //image
        },
        {
            "imageUrl": "http://urltoimage.com",
            "subtitle": "Card Subtitle",
            "title": "Card Title",
            "type": 1
        },
        {
            "actionName": string,
            "action": BUTTON,
            "actionType": UPLOAD_FILE
            "type": 11
        }

    ]
}
```



# awais version:


base url: https://us-central1-heluss-ai-project.cloudfunctions.net


# talk

`POST /task`


### **request body:**
```
{
	"query": string,
	"sessionId": srting
}

```
### **response:**

```
{
         "timestamp": "2018-10-16T09:14:45.119Z",
         "from": "chatbot",
         "text": "text",
         "ssml": "ssml"
}
```

# write message

`POST /getallmessages`


### **request body:**
```
{
	"email": string,
	"token": string 
}

```
### **response:**

```
[
    {
        "timestamp": "2018-10-16T08:25:34.914Z",
        "from": "abc@abc.com",
        "text": "hi"
    },
    {
        "timestamp": "2018-10-16T09:14:45.119Z",
        "from": "chatbot",
        "text": "hello do you want to start quiz"
    },
    {
        "timestamp": "2018-10-16T08:26:28.410Z",
        "from": "abc@abc.com",
        "text": "yes"
    },
    {
        "timestamp": "2018-10-16T09:14:45.119Z",
        "from": "chatbot",
        "text": "ok, there are ### question..... ..... ... .."
    }
    ...
]
```