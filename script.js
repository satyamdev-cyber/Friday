const chat = document.getElementById("chat");

let memory = JSON.parse(localStorage.getItem("fridayMemory")) || [];

function addMessage(text, cls){
    const div = document.createElement("div");
    div.className = cls;
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function speak(text){
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    speech.pitch = 1;
    speechSynthesis.speak(speech);
}

function fridayReply(msg){

    let reply = "I'm listening.";

    if(msg.includes("hello") || msg.includes("hi")){
        reply = "Hello Satyam. Nice to see you.";
    }
    else if(msg.includes("how are you")){
        reply = "I'm doing great. Ready to help you.";
    }
    else if(msg.includes("who are you")){
        reply = "I am Friday, your AI best friend.";
    }
    else{
        reply = "You said: " + msg;
    }

    addMessage("Friday: " + reply,"bot");
    speak(reply);

    memory.push({
        user: msg,
        friday: reply
    });

    localStorage.setItem(
        "fridayMemory",
        JSON.stringify(memory)
    );
}

function sendMessage(){

    const input = document.getElementById("message");

    let msg = input.value.trim();

    if(!msg) return;

    addMessage("You: " + msg,"user");

    fridayReply(msg.toLowerCase());

    input.value = "";
}

function startVoice(){

    if(!('webkitSpeechRecognition' in window)){
        alert("Speech recognition not supported");
        return;
    }

    const recognition =
        new webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.onresult = (event)=>{
        document.getElementById("message").value =
            event.results[0][0].transcript;

        sendMessage();
    };

    recognition.start();
}

addMessage(
"Friday: Hello Satyam. I am online.",
"bot"
);
