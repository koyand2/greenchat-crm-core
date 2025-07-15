import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Contact } from '@/types/chat';
import { MessageCircle, Users, Bell, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactSidebarProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

const ContactSidebar: React.FC<ContactSidebarProps> = ({
  contacts,
  selectedContact,
  onSelectContact,
  isCollapsed,
  onToggle,
}) => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredContacts = {
    all: contacts,
    unread: contacts.filter(c => c.unreadCount > 0),
    active: contacts.filter(c => c.status === 'online' || c.status === 'typing'),
  };

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const ContactItem: React.FC<{ contact: Contact }> = ({ contact }) => (
    <Button
      variant="ghost"
      className={cn(
        "w-full p-3 h-auto justify-start text-left transition-all duration-200",
        selectedContact?.id === contact.id && "bg-primary-light border-l-2 border-l-primary",
        !isCollapsed && "hover:bg-accent/50"
      )}
      onClick={() => onSelectContact(contact)}
    >
      <div className="flex items-center space-x-3 w-full min-w-0">
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={contact.avatar} alt={contact.name} />
            <AvatarFallback className="bg-gradient-primary text-white text-sm">
              {contact.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {contact.status === 'online' && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-white" />
          )}
          {contact.status === 'typing' && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-warning rounded-full border-2 border-white animate-pulse" />
          )}
        </div>
        
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <p className="font-medium text-sm truncate">{contact.name}</p>
              {contact.unreadCount > 0 && (
                <Badge variant="default" className="h-5 px-1.5 text-xs">
                  {contact.unreadCount}
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground truncate max-w-32">
                {contact.lastMessage?.content || 'No messages yet'}
              </p>
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                {formatLastSeen(contact.lastSeen)}
              </span>
            </div>
            {contact.tags.length > 0 && (
              <div className="flex space-x-1 mt-1">
                {contact.tags.slice(0, 2).map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs px-1 py-0">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Button>
  );

  return (
    <div className={cn(
      "border-r border-border bg-card transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-80"
    )}>
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <h2 className="font-semibold text-lg">Contacts</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-muted-foreground hover:text-foreground"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {!isCollapsed ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
            <TabsTrigger value="all" className="text-xs flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>All</span>
              <Badge variant="secondary" className="h-4 px-1 text-xs">
                {filteredContacts.all.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="unread" className="text-xs flex items-center space-x-1">
              <Bell className="w-3 h-3" />
              <span>Unread</span>
              {filteredContacts.unread.length > 0 && (
                <Badge variant="default" className="h-4 px-1 text-xs">
                  {filteredContacts.unread.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="active" className="text-xs flex items-center space-x-1">
              <Activity className="w-3 h-3" />
              <span>Active</span>
              {filteredContacts.active.length > 0 && (
                <Badge variant="success" className="h-4 px-1 text-xs">
                  {filteredContacts.active.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="flex-1 mt-4">
            <ScrollArea className="h-full">
              <div className="space-y-1 px-2">
                {filteredContacts.all.map(contact => (
                  <ContactItem key={contact.id} contact={contact} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="unread" className="flex-1 mt-4">
            <ScrollArea className="h-full">
              <div className="space-y-1 px-2">
                {filteredContacts.unread.map(contact => (
                  <ContactItem key={contact.id} contact={contact} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="active" className="flex-1 mt-4">
            <ScrollArea className="h-full">
              <div className="space-y-1 px-2">
                {filteredContacts.active.map(contact => (
                  <ContactItem key={contact.id} contact={contact} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      ) : (
        <ScrollArea className="flex-1">
          <div className="space-y-2 p-2">
            {contacts.slice(0, 8).map(contact => (
              <ContactItem key={contact.id} contact={contact} />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default ContactSidebar;