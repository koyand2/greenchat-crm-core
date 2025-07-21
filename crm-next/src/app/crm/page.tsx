'use client'

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import ChatSidebar from "@/components/ChatSidebar";
import ChatInterface from "@/components/ChatInterface";
import Contato from "@/components/Contato";
import Dashboard from "@/components/Dashboard";
import Atendimentos from "@/components/Atendimentos";
import { ContactType, Message } from "@/types/chat";
import { mockContacts, mockMessages } from "@/data/mockData";
import { LayoutDashboard, MessageCircle, Contact, History } from "lucide-react";

const CRM = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [contacts] = useState<ContactType[]>(mockContacts);
  const [selectedContact, setSelectedContact] = useState<ContactType | null>(null);
  const [messages, setMessages] =
    useState<Record<string, Message[]>>(mockMessages);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSelectContact = (contact: ContactType) => {
    setSelectedContact(contact);
    setActiveTab("chat");
  };

  const handleSendMessage = (content: string) => {
    if (!selectedContact) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      timestamp: new Date(),
      senderId: "admin",
      senderName: "Admin",
      type: "text",
      status: "sent",
      isFromUser: true,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage],
    }));

    // Simulate message delivery after a short delay
    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [selectedContact.id]: prev[selectedContact.id].map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
        ),
      }));
    }, 1000);

    // Simulate read receipt after another delay
    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [selectedContact.id]: prev[selectedContact.id].map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "read" } : msg
        ),
      }));
    }, 2000);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div className="flex-1 flex overflow-auto h-[calc(100vh)]">
        <ChatSidebar
          contacts={contacts}
          selectedContact={selectedContact}
          onSelectContact={handleSelectContact}
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <main className="flex-1 flex flex-col">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col"
          >
            <div className="border-b border-border px-3 py-1">
              <TabsList className="grid w-fit grid-cols-4 gap-4">
                <TabsTrigger
                  value="dashboard"
                  className="flex items-center"
                >
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </TabsTrigger>
                <TabsTrigger
                  value="chat"
                  className="flex items-center"
                >
                  <MessageCircle />
                  <span>Chat</span>
                  {selectedContact && (
                    <span className="text-xs text-muted-foreground">
                      - {selectedContact.name}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="contatos"
                  className="flex items-center"
                >
                  <Contact />
                  <span>Contatos</span>
                </TabsTrigger>
                <TabsTrigger
                  value="atendimentos"
                  className="flex items-center"
                >
                  <History />
                  <span>Atendimentos</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="dashboard" className="flex-1 m-0">
              <Dashboard />
            </TabsContent>

            <TabsContent
              value="chat"
              className="flex-1 m-0 h-0 overflow-auto"
            >
              {selectedContact ? (
                <ChatInterface
                  contact={selectedContact}
                  messages={messages[selectedContact.id] || []}
                  onSendMessage={handleSendMessage}
                />
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                      <MessageCircle className="w-8 h-8 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Selecione um atendimento
                      </h3>
                      <p className="text-muted-foreground">
                        Escolha um contato da barra lateral para começar a conversa.
                      </p>
                    </div>
                    <Button
                      onClick={() => setActiveTab("dashboard")}
                      variant="default"
                      className="mt-4"
                    >
                      Visualizar Dashboard
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent
              className="flex-1 m-0"
              value="contatos"
            >
              <Contato />
            </TabsContent>
            <TabsContent
              className="flex-1 m-0 overflow-auto"
              value="atendimentos"
            >
              <Atendimentos />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default CRM;