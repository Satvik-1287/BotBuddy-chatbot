const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");

// Check if the user's name is stored in local storage
let userName = localStorage.getItem("userName");
if (!userName) {
    userName = "User"; // Default name if not found in local storage
}

const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent =
        className === "outgoing"
            ? `<p></p>`
            : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
};

const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
};

const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const getCurrentDay = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const now = new Date();
    const dayIndex = now.getDay();
    return days[dayIndex];
};

function detectNumberInTextarea() {
    const value = userMessage;
    return /\d+/.test(value);
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    if (userMessage.toLowerCase() === "hello") {
        const response = createChatLi(
            `Hello, ${userName}, I'm BotBuddy, your AI companion. How may I assist you?`,
            "incoming"
        );
        chatbox.appendChild(response);
    } else if (userMessage.toLowerCase() === "what is your name") {
        const response = createChatLi("My name is BotBuddy.", "incoming");
        chatbox.appendChild(response);
    } else if (detectNumberInTextarea(userMessage)) {
        try {
            let result;
            if (userMessage.includes("+")) {
                const [num1, num2] = userMessage.split("+");
                result = parseFloat(num1) + parseFloat(num2);
            } else if (userMessage.includes("-")) {
                const [num1, num2] = userMessage.split("-");
                result = parseFloat(num1) - parseFloat(num2);
            } else if (userMessage.includes("*")) {
                const [num1, num2] = userMessage.split("*");
                result = parseFloat(num1) * parseFloat(num2);
            } else if (userMessage.includes("/")) {
                const [num1, num2] = userMessage.split("/");
                result = parseFloat(num1) / parseFloat(num2);
            }
            else {
                throw new Error("Unsupported operation");
            }

            const response = createChatLi(`Result: ${result}`, "incoming");
            chatbox.appendChild(response);
        } catch (error) {
            const response = createChatLi("Sorry, there was an error in your expression.", "incoming");
            chatbox.appendChild(response);
        }
    } else if (userMessage.toLowerCase().includes("what is my name")) {
        const response = createChatLi(`Your name is ${userName}.`, "incoming");
        chatbox.appendChild(response);
    } else if (userMessage.toLowerCase().includes("set my name")) {
        const newName = userMessage.slice(11).trim();
        userName = newName;
        localStorage.setItem("userName", newName);
        const response = createChatLi(`Your name is now set to ${newName}.`, "incoming");
        chatbox.appendChild(response);
    } else if (userMessage.toLowerCase().includes("time")) {
        const currentTime = getCurrentTime();
        const response = createChatLi(`The current time is ${currentTime}.`, "incoming");
        chatbox.appendChild(response);
    } else if (userMessage.toLowerCase().includes("date")) {
        const currentDate = getCurrentDate();
        const response = createChatLi(`Today's date is ${currentDate}.`, "incoming");
        chatbox.appendChild(response);
    } else if (userMessage.toLowerCase().includes("day")) {
        const currentDay = getCurrentDay();
        const response = createChatLi(`Today is ${currentDay}.`, "incoming");
        chatbox.appendChild(response);
    } else {
        const response = createChatLi("Sorry, I didn't understand that.", "incoming");
        chatbox.appendChild(response);
    }
};

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleChat();
    }
});

const sendbtn = document.getElementById("send-btn");

sendbtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleChat();
});
