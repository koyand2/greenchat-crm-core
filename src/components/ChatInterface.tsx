import React, { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Contact, Message } from '@/types/chat';
import { 
  Send, 
  Paperclip, 
  Mic, 
  MoreVertical, 
  Phone, 
  Video,
  Check,
  CheckCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  contact: Contact;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  contact,
  messages,
  onSendMessage,
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (contact.status === 'typing') {
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
      setNewMessage('');
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
  };

  const MessageBubble: React.FC<{ message: Message }> = ({ message }) => (
    <div
      className={cn(
        "flex mb-4 animate-fade-in",
        message.isFromUser ? "justify-end" : "justify-start"
      )}
    >
      {!message.isFromUser && (
        <Avatar className="h-8 w-8 mr-2 mt-1">
          <AvatarImage src={contact.avatar} alt={contact.name} />
          <AvatarFallback className="bg-gradient-primary text-white text-xs">
            {contact.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={cn(
          "max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm",
          message.isFromUser
            ? "bg-gradient-primary text-white"
            : "bg-card border border-border"
        )}
      >
        <p className="text-sm">{message.content}</p>
        <div className="flex items-center justify-end space-x-1 mt-1">
          <span className={cn(
            "text-xs",
            message.isFromUser ? "text-white/70" : "text-muted-foreground"
          )}>
            {formatTime(message.timestamp)}
          </span>
          {message.isFromUser && (
            <div className="text-white/70">
              {message.status === 'sent' && <Check className="h-3 w-3" />}
              {message.status === 'delivered' && <CheckCheck className="h-3 w-3" />}
              {message.status === 'read' && <CheckCheck className="h-3 w-3 text-blue-300" />}
            </div>
          )}
        </div>
      </div>
      
      {message.isFromUser && (
        <Avatar className="h-8 w-8 ml-2 mt-1">
          <AvatarFallback className="bg-gradient-secondary text-white text-xs">
            You
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );

  const TypingIndicator = () => (
    <div className="flex items-center space-x-2 mb-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src={contact.avatar} alt={contact.name} />
        <AvatarFallback className="bg-gradient-primary text-white text-xs">
          {contact.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="bg-card border border-border rounded-2xl px-4 py-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-typing"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-gradient-chat">
      {/* Chat Header */}
      <div className="flex-shrink-0 border-b border-border bg-card/80 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback className="bg-gradient-primary text-white">
                  {contact.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {contact.status === 'online' && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-white" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{contact.name}</h3>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={contact.status === 'online' ? 'online' : contact.status === 'typing' ? 'typing' : 'offline'}
                  className="text-xs"
                >
                  {contact.status === 'typing' ? 'typing...' : contact.status}
                </Badge>
                {contact.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 min-h-0 relative">
        <ScrollArea className="absolute inset-0">
          <div className="px-4 py-4 space-y-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Message Input */}
      <div className="flex-shrink-0 border-t border-border bg-card/80 backdrop-blur-sm p-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="pr-12"
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
            className="bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;