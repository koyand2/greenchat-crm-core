export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  senderId: string;
  senderName: string;
  type: 'text' | 'image' | 'file' | 'audio';
  status: 'sent' | 'delivered' | 'read';
  isFromUser: boolean;
}

export interface ContactType {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  status: 'online' | 'offline' | 'typing';
  lastSeen: Date;
  unreadCount: number;
  lastMessage: Message | null;
  tags: string[];
  isActive: boolean;
}

export interface ChatState {
  selectedContact: ContactType | null;
  messages: Record<string, Message[]>;
  contacts: ContactType[];
  isLoading: boolean;
}