"use client";

import { useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
  userAvatarSrc?: string;
  assistantAvatarSrc?: string;
}

export function MessageList({
  messages,
  isLoading = false,
  userAvatarSrc = "/user-avatar.png",
  assistantAvatarSrc = "/ai-avatar.png"
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);
  
  if (messages.length === 0 && !isLoading) {
    return null;
  }
  
  return (
    <div className="flex-1 overflow-y-auto space-y-4">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
            <Avatar className={`h-8 w-8 ${message.role === "user" ? "ml-2" : "mr-2"}`}>
              <AvatarFallback>{message.role === "user" ? "U" : "A"}</AvatarFallback>
              <AvatarImage src={message.role === "user" ? userAvatarSrc : assistantAvatarSrc} />
            </Avatar>
            <div 
              className={`rounded-lg p-3 ${
                message.role === "user" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted"
              }`}
            >
              <p>{message.content}</p>
              <div className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex justify-start">
          <div className="flex max-w-[80%] flex-row">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarFallback>A</AvatarFallback>
              <AvatarImage src={assistantAvatarSrc} />
            </Avatar>
            <div className="rounded-lg p-3 bg-muted">
              <div className="flex space-x-2">
                <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce"></div>
                <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce delay-75"></div>
                <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
} 