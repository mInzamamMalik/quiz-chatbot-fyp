


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
