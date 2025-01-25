"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { PuffLoader } from "react-spinners";
import { handleRequest, METHODS } from "../utils/general.utils";
import { API_CHAT } from "../constants/endpoints.constants";
import { CHAT_ID } from "../constants/storage.constants";
import { IChatHistoryList, IMessage } from "../interfaces/chat.interface";

export default function Chat() {
  const [ input, setInput ] = useState("");
  const [ chatId, setChatId ] = useState<string | null>(null);
  const [ loading, setLoading ] = useState(false);
  const [ messages, setMessages ] = useState<IMessage[]>([]);
  const [ chatHistoryList, setChatHistoryList ] = useState<IChatHistoryList>({});
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const storedChatId = localStorage.getItem(CHAT_ID);
      if (storedChatId) {
        setChatId(storedChatId);
        getChatHistory(storedChatId);
      }
      const chat = await handleRequest(API_CHAT, METHODS.GET);
      setChatHistoryList(chat);
    })();
  }, []);

  useEffect(() => {
    if (chatId) localStorage.setItem(CHAT_ID, chatId);
    if (chatId && chatHistoryList[chatId]) {
      setMessages(chatHistoryList[chatId]);
    }
  }, [ chatId, chatHistoryList ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ messages ]);

  const getChatHistory = async (id: string) => {
    const chat = await handleRequest(API_CHAT, METHODS.GET);
    setChatHistoryList(chat);
    if (chat[id]) setMessages(chat[id]);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages([ ...messages, userMessage ]);
    setInput("");
    setLoading(true);

    try {
      const response = await handleRequest(API_CHAT, METHODS.POST, {
        messages: [ ...messages, userMessage ],
        chatId
      });
      setChatId(response.chatId);
      getChatHistory(response.chatId);

    } catch (error) {
      console.error(error);
      setMessages(prevMessages => [ ...prevMessages, { role: "model", content: "Error communicating with the AI." } ]);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setChatId(null);
    localStorage.removeItem(CHAT_ID);
  };

  return (
    <div className="chat-container">
      <button onClick={startNewChat}>New Chat</button>
      <div className="message-list">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <ReactMarkdown
              remarkPlugins={[ remarkGfm ]}
              components={{
                //@ts-expect-error
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      //@ts-expect-error
                      style={dark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        ))}
        {loading && <div className="loading"><PuffLoader color="#36d7b7" /></div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={(e) => {
            const keyCode = e.code || e.key;
            if (keyCode == "Enter") {
              sendMessage();
            }
          }} />
        <button onClick={sendMessage} disabled={loading}>Send</button>
      </div>
      <div className='chat-history'>
        <h2>Chat History</h2>
        {Object.entries(chatHistoryList).map(([ id ]) => (
          <div key={id} onClick={() => setChatId(id)}>Chat {id}</div>
        ))}
      </div>
    </div>
  );
}
