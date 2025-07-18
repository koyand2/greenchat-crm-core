import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, Users, TrendingUp, Clock } from 'lucide-react';
import { Send, UserPlus, BarChart3, Activity, Plus } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Conversations',
      value: '2,847',
      change: '+12%',
      changeType: 'positive' as const,
      icon: MessageCircle,
    },
    {
      title: 'Active Contacts',
      value: '1,234',
      change: '+8%',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: 'Response Rate',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: TrendingUp,
    },
    {
      title: 'Avg Response Time',
      value: '2.4min',
      change: '-15%',
      changeType: 'negative' as const,
      icon: Clock,
    },
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'message',
      title: 'New message from Sarah Johnson',
      description: 'Hi, I need help with my recent order...',
      time: '2 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      status: 'unread',
    },
    {
      id: '2',
      type: 'contact',
      title: 'New contact added',
      description: 'Michael Chen joined from website form',
      time: '15 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      status: 'new',
    },
    {
      id: '3',
      type: 'resolved',
      title: 'Ticket resolved',
      description: 'Support case #2847 has been closed',
      time: '1 hour ago',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      status: 'resolved',
    },
    {
      id: '4',
      type: 'message',
      title: 'Message from David Wilson',
      description: 'Thank you for the quick response!',
      time: '2 hours ago',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      status: 'read',
    },
  ];

  const quickActions = [
    {
      title: 'Send Broadcast',
      description: 'Send message to multiple contacts',
      icon: Send,
      color: 'bg-primary',
    },
    {
      title: 'Add Contact',
      description: 'Create new contact record',
      icon: UserPlus,
      color: 'bg-primary',
    },
    {
      title: 'View Reports',
      description: 'Analyze performance metrics',
      icon: BarChart3,
      color: 'bg-primary',
    },
    {
      title: 'Manage Teams',
      description: 'Configure team settings',
      icon: Users,
      color: 'bg-primary',
    },
  ];

  return (
    <div className="flex-1 p-6 space-y-6 bg-background min-h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-black">Dashboard</h1>
        <p className="text-primary-foreground">
          Welcome back! Here's what's happening with your customer conversations.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs text-foreground">
                <Badge
                  variant={stat.changeType === 'positive' ? 'secondary' : 'destructive'}
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>
              Latest interactions and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/20 transition-colors">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={activity.avatar} alt="User" />
                      <AvatarFallback className="bg-gradient-primary text-white text-xs">
                        {activity.title.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{activity.title}</p>
                        <Badge
                          variant='secondary'
                          className="text-xs text-bold text-foreground"
                        >
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-accent/50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-sm">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;