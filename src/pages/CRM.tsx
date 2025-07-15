import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import ContactSidebar from '@/components/ContactSidebar';
import ChatInterface from '@/components/ChatInterface';
import Dashboard from '@/components/Dashboard';
import { Contact, Message } from '@/types/chat';
import { mockContacts, mockMessages } from '@/data/mockData';
import { LayoutDashboard, MessageCircle } from 'lucide-react';

const CRM = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [contacts] = useState<Contact[]>(mockContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    setActiveTab('chat');
  };

  const handleSendMessage = (content: string) => {
    if (!selectedContact) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      timestamp: new Date(),
      senderId: 'admin',
      senderName: 'Admin',
      type: 'text',
      status: 'sent',
      isFromUser: true,
    };

    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage],
    }));

    // Simulate message delivery after a short delay
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [selectedContact.id]: prev[selectedContact.id].map(msg =>
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        ),
      }));
    }, 1000);

    // Simulate read receipt after another delay
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [selectedContact.id]: prev[selectedContact.id].map(msg =>
          msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
        ),
      }));
    }, 2000);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      
      <div className="flex-1 flex overflow-hidden">
        <ContactSidebar
          contacts={contacts}
          selectedContact={selectedContact}
          onSelectContact={handleSelectContact}
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <main className="flex-1 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="border-b border-border px-6 py-2">
              <TabsList className="grid w-fit grid-cols-2">
                <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat</span>
                  {selectedContact && (
                    <span className="text-xs text-muted-foreground">
                      - {selectedContact.name}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="dashboard" className="flex-1 m-0">
              <Dashboard />
            </TabsContent>

            <TabsContent value="chat" className="flex-1 m-0 h-0 overflow-hidden">
              {selectedContact ? (
                <ChatInterface
                  contact={selectedContact}
                  messages={messages[selectedContact.id] || []}
                  onSendMessage={handleSendMessage}
                />
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gradient-secondary">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Select a conversation
                      </h3>
                      <p className="text-muted-foreground">
                        Choose a contact from the sidebar to start chatting
                      </p>
                    </div>
                    <Button
                      onClick={() => setActiveTab('dashboard')}
                      variant="outline"
                      className="mt-4"
                    >
                      View Dashboard
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default CRM;