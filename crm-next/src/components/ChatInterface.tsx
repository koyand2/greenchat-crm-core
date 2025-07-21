'use client'
import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ContactType, Message } from "@/types/chat";
import {
  Send,
  Paperclip,
  Mic,
  CircleCheck,
  ExternalLink,
  Check,
  CheckCheck,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";

interface ChatInterfaceProps {
  contact: ContactType;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  contact,
  messages,
  onSendMessage,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (contact.status === "typing") {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [contact.status]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage("");
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  // Separar mensagens por atendimentos
  const organizeMessages = () => {
    const organized = [];

    // Sessão de início do atendimento
    organized.push({
      type: 'session-start',
      title: 'Atendimento iniciado',
      subtitle: `Por Levi em ${formatDate(new Date())} - 11:19`,
      color: 'blue',
      messages: messages
    });

    // Sessão de conclusão do atendimento  
    organized.push({
      type: 'session-end',
      title: 'Atendimento concluído',
      subtitle: `Por Elen Farias em ${formatDate(new Date())} - 12:54`,
      color: 'green',
      messages: []
    });

    return organized;
  };

  const MessageBubble: React.FC<{ message: Message }> = ({ message }) => (
    <div
      className={cn(
        "flex mb-4",
        message.isFromUser ? "justify-end" : "justify-start"
      )}
    >
      {!message.isFromUser && (
        <Avatar className="h-8 w-8 mr-2 mt-1">
          <AvatarImage src={contact.avatar} alt={contact.name} />
          <AvatarFallback className="bg-primary text-white text-xs">
            {contact.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm",
          message.isFromUser
            ? "bg-ghost text-accent-foreground"
            : "bg-card border border-border"
        )}
      >
        <p className="text-sm">{message.content}</p>
        <div className="flex items-center justify-end space-x-1 mt-1">
          <span
            className={cn(
              "text-xs",
              message.isFromUser ? "text-accent-foreground" : "text-accent-foreground"
            )}
          >
            {formatTime(message.timestamp)}
          </span>
          {message.isFromUser && (
            <div className="text-white/70">
              {message.status === "sent" && <Check className="h-3 w-3" />}
              {message.status === "delivered" && (
                <CheckCheck className="h-3 w-3" />
              )}
              {message.status === "read" && (
                <CheckCheck className="h-3 w-3 text-blue-300" />
              )}
            </div>
          )}
        </div>
      </div>
      {message.isFromUser && (
        <Avatar className="h-8 w-8 ml-2 mt-1">
          <AvatarFallback className="bg-primary text-white text-xs">
            You
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );

  const SessionHeader: React.FC<{ session: any }> = ({ session }) => (
    <div className="flex items-center mb-4 pl-0"> 
      <div className="flex-1">
        <div className={cn(
          "text-sm font-medium",
          session.color === 'blue' ? "text-primary" : "text-green-600"
        )}>
          {session.title}
        </div>
        <div className="text-xs text-muted-foreground">
          {session.subtitle}
        </div>
      </div>
    </div>
  );

  const TypingIndicator = () => (
    <div className="flex items-center space-x-2 mb-4 pl-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src={contact.avatar} alt={contact.name} />
        <AvatarFallback className="bg-primary text-foreground text-xs">
          {contact.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="bg-card border border-border rounded-2xl px-4 py-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-typing"></div>
          <div
            className="w-2 h-2 bg-primary rounded-full animate-typing"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-primary rounded-full animate-typing"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );

  const organizedSessions = organizeMessages();

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-64px-48px)] overflow-hidden bg-gradient-chat">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border bg-card/80 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback className="bg-primary text-white">
                  {contact.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {contact.status === "online" && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{contact.name}</h3>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    contact.status === "online"
                      ? "default"
                      : contact.status === "offline"
                        ? "destructive"
                        : "default"
                  }
                  className="text-xs text-white"
                >
                  {contact.status === "typing" ? "digitando..." : contact.status}
                </Badge>
                {contact.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <div className="flex items-center space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <CircleCheck className="h-4 w-4 text-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Finalizar Atendimento</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <ExternalLink className="h-4 w-4 text-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Transferir Atendimento</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:text-foreground cursor-pointer"
                    >
                      <Search className="h-4 w-4 text-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Buscar mensagens</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="py-4 space-y-6 px-4"> 
            <div className="border-l-2 border-primary/70 ml-2 pl-4"> 
              {organizedSessions.map((session, sessionIndex) => (
                <div key={sessionIndex} className="space-y-4">
                  <SessionHeader session={session} />
                  <div className="pl-0 space-y-2">
                    {session.messages.map((message) => (
                      <MessageBubble key={message.id} message={message} />
                    ))}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="pl-4">
                  <TypingIndicator />
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>
      <div className="flex-shrink-0 border-t border-border bg-card/80 backdrop-blur-sm p-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="flex-1 relative">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite uma mensagem..."
              className="pr-12 resize-none"
              rows={1}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-primary cursor-pointer"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;