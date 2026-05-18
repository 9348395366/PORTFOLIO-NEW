import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

const BOT_ICON_GIF =
  "https://www.bacancytechnology.com/blog/wp-content/uploads/2019/08/ezgif.com-optimize-5.gif";

const getTimeGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const withClosingGreeting = (message) => `${message} THANK YOU, have a nice day.`;

const hasAnyKeyword = (value, keywords) =>
  keywords.some((keyword) => value.includes(keyword));

const botReplyFor = (input) => {
  const value = input.toLowerCase().trim();

  if (
    value === "hi" ||
    value === "hii" ||
    value === "hiii" ||
    value === "hello" ||
    value === "hey"
  ) {
    return withClosingGreeting("Hlo, how can I help you?");
  }

  if (hasAnyKeyword(value, ["application", "app", "website", "portfolio"])) {
    return withClosingGreeting(
      "This portfolio application showcases my projects, skills, resume, and contact details."
    );
  }

  if (hasAnyKeyword(value, ["about me", "about", "who are you", "yourself"])) {
    return withClosingGreeting(
      "I am Chandan's assistant. You can explore the About section to know more about Chandan Kumar Nanda."
    );
  }

  if (hasAnyKeyword(value, ["project", "projects", "work", "build"])) {
    return withClosingGreeting("You can check the Projects section for my latest work.");
  }

  if (hasAnyKeyword(value, ["resume", "cv"])) {
    return withClosingGreeting("Open the Resume section to view details and download my CV.");
  }

  if (
    hasAnyKeyword(value, [
      "contact",
      "email",
      "phone",
      "reach",
      "social",
      "linkedin",
      "github",
    ])
  ) {
    return withClosingGreeting(
      "You can contact me from the Socials section for email and profile links."
    );
  }

  if (hasAnyKeyword(value, ["skill", "skills", "tech", "technology"])) {
    return withClosingGreeting(
      "Please visit the Skills section to see technical skills and tools."
    );
  }

  return withClosingGreeting("Thanks for your message. I will get back to you soon.");
};

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "bot",
      text: `${getTimeGreeting()}! Jay Jagannath / \u091c\u092f \u091c\u0917\u0928\u094d\u0928\u093e\u0925! \u{1F64F} How can I help you?`,
    },
  ]);
  const listRef = useRef(null);

  const toggleChat = () => setIsOpen((prev) => !prev);
  const closeChat = () => setIsOpen(false);

  const sendMessage = () => {
    const value = text.trim();
    if (!value) return;

    const userMessage = {
      id: Date.now(),
      from: "user",
      text: value,
    };
    const botMessage = {
      id: Date.now() + 1,
      from: "bot",
      text: botReplyFor(value),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setText("");
  };

  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [isOpen, messages]);

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === "Escape") {
        closeChat();
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  return (
    <div className="floating-chatbot">
      {isOpen && (
        <div className="floating-chatbot-panel">
          <div className="floating-chatbot-header">
            <div className="title-wrap">
              <MessageCircle size={16} />
              <span>Chat Bot</span>
            </div>
            <button
              type="button"
              className="panel-close-btn"
              onClick={closeChat}
              aria-label="Close chatbot"
            >
              <X size={16} />
            </button>
          </div>

          <div className="floating-chatbot-messages" ref={listRef}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-msg ${message.from === "user" ? "user" : "bot"}`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="floating-chatbot-input">
            <input
              type="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Type your message..."
            />
            <button type="button" onClick={sendMessage} aria-label="Send message">
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        className="floating-chatbot-fab"
        aria-label="Open chatbot"
        onClick={toggleChat}
      >
        <img src={BOT_ICON_GIF} alt="Chatbot icon" />
      </button>
    </div>
  );
};

export default FloatingChatbot;
