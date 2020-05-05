---
title:  Chat Room 
script: chatroom
name:   chat
order:  4
app:    false
---

<div class="flex-h"> 
{% include_relative includes/app_div.html id="bob" %}  
{% include_relative includes/app_div.html id="alice" %}  
</div> 

IO streams effectively channel interactions between isolated components. 



<style> 
.msgs {
    overflow-y: auto;
    height: 250px;
}

.chat {
    padding: 10px;
    min-width: 80%;
}

.input {
    display: flex;
    flex-flow: row;
}
.input textarea {
    font-family: "iosevka light";
    font-size: 14px;
    flex-grow: 1;
    color:  #555;
}
.msg-sent, .msg-received {
    padding-bottom: 15px;
}
.msg-body {
    padding: 6px; 
    margin: 2px;
    font-size: 16px;
    border: 1px solid #dde;
    border-radius: 6px;
}
.msg-body.sent {
    margin-right: 0;
    margin-left: auto;
}
.msg-body.received {
    margin-left: 0;
    margin-right: auto;
}

.msg-head {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    font-size: 10px;
}
.msg-head .date {
    color: #bbc;
}
.msg-body {
    max-width: 60%;
}
</style> 
