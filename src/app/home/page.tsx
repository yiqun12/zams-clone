"use client";

import { useState } from "react";
import { HomeHeader } from "@/components/HomeHeader";
import { ChatInput } from "@/components/ChatInput";
import { HomeFooter } from "@/components/HomeFooter";
import { MessageList, Message } from "@/components/MessageList";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue),
        role: "assistant",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  // Simple AI response generator
  const getAIResponse = (userInput: string): string => {
    const responses = [
      "I understand your question about '" + userInput + "'. Let me help you with that.",
      "Thanks for asking about '" + userInput + "'. Here's what I know.",
      "That's an interesting question about '" + userInput + "'. Let me provide some information.",
      "I've analyzed your query about '" + userInput + "' and here's my response.",
      "Regarding '" + userInput + "', I can offer the following insights."
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* On small screens, the main content area doesn't fill the entire height to leave space for the bottom input box */}
      <main className={`flex-1 flex flex-col p-4 md:p-8 ${messages.length > 0 ? 'pb-42 md:pb-42' : 'pb-24'} ${messages.length === 0 ? 'items-center justify-center' : ''}`}>
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex flex-col space-y-8">
            {messages.length === 0 ? (
              <>
                <HomeHeader />
                {/* Input area displayed on medium and larger screens when no messages */}
                <div className="hidden md:block">
                  <ChatInput
                    value={inputValue}
                    onChange={handleInputChange}
                    onSend={handleSendMessage}
                    onKeyDown={handleKeyDown}
                    isMobile={isMobile}
                  />
                </div>
              </>
            ) : (
              <MessageList
                messages={messages}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </main>

      {/* Input area fixed at the bottom on all screens when there are messages */}
      {messages.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t">
          <div className="p-4 max-w-2xl mx-auto">
            <ChatInput
              value={inputValue}
              onChange={handleInputChange}
              onSend={handleSendMessage}
              onKeyDown={handleKeyDown}
              isMobile={isMobile}
            />
          </div>
        </div>
      )}

      {/* Input area fixed at the bottom on small screens when no messages */}
      {messages.length === 0 && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t">
          <div className="p-4">
            <ChatInput
              value={inputValue}
              onChange={handleInputChange}
              onSend={handleSendMessage}
              onKeyDown={handleKeyDown}
              isMobile={isMobile}
            />
          </div>
        </div>
      )}

      <HomeFooter />
    </div>
  );
}
