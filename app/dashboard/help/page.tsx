// app/help-support/page.tsx
'use client'
import React, { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FileText,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  Search,
  ThumbsUp,
  User,
  Video,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function HelpSupportPage() {
  const [activeTab, setActiveTab] = useState("faq");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showContactDialog, setShowContactDialog] = useState(false);

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (index: number) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Help & Support</h1>
          <p className="text-muted-foreground">
            Find answers or get in touch with our support team
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search for help..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 py-6 text-lg"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setShowContactDialog(true)}
        >
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Chat with Us</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Start a conversation with our support team
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Call Support</h3>
            <p className="text-xs text-muted-foreground mt-1">
              1800-123-4567 (Toll Free)
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Email Us</h3>
            <p className="text-xs text-muted-foreground mt-1">
              support@bankapp.com
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Report Issue</h3>
            <p className="text-xs text-muted-foreground mt-1">
              File a complaint or issue
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="video">Video Tutorials</TabsTrigger>
          <TabsTrigger value="tickets">My Support Tickets</TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find answers to the most common questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div
                      className="p-4 flex justify-between items-center cursor-pointer hover:bg-muted/50"
                      onClick={() => toggleFaq(index)}
                    >
                      <h3 className="font-medium">{faq.question}</h3>
                      {expandedFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    {expandedFaq === index && (
                      <div className="p-4 bg-muted/30 border-t">
                        <p>{faq.answer}</p>
                        <div className="flex items-center mt-4 text-sm text-muted-foreground">
                          <span>Was this helpful?</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2"
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Yes
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                          >
                            <ThumbsUp className="h-4 w-4 mr-1 rotate-180" />
                            No
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-2 text-muted-foreground">
                    No FAQs found matching your search.
                  </p>
                  <Button
                    variant="link"
                    onClick={() => setSearchQuery("")}
                    className="mt-1"
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Can't find what you're looking for?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => setShowContactDialog(true)}
                >
                  Contact support
                </Button>
              </p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {popularTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  >
                    <div className="font-medium">{topic.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {topic.count} articles
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Video Tutorials Tab */}
        <TabsContent value="video" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>
                Learn how to use our banking features with step-by-step videos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videoTutorials.map((video, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative aspect-video bg-muted">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                          <Video className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium">{video.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {video.duration} • {video.views} views
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Tutorials
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Support Tickets Tab */}
        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>My Support Tickets</CardTitle>
                <CardDescription>
                  Track and manage your support requests
                </CardDescription>
              </div>
              <Button>
                New Support Ticket
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportTickets.length > 0 ? (
                  supportTickets.map((ticket, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{ticket.subject}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Ticket ID: {ticket.id} • Created: {ticket.date}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Badge
                            variant="outline"
                            className={`
                              ${ticket.status === "Open" ? "bg-green-50 text-green-700 border-green-200" : ""}
                              ${ticket.status === "Closed" ? "bg-gray-50 text-gray-700 border-gray-200" : ""}
                              ${ticket.status === "In Progress" ? "bg-blue-50 text-blue-700 border-blue-200" : ""}
                            `}
                          >
                            {ticket.status}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2"
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-2">You don't have any support tickets.</p>
                    <Button className="mt-4">Create Support Ticket</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Contact Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Contact Support</DialogTitle>
            <DialogDescription>
              Describe your issue and we'll connect you with a support agent.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Choose a Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {supportCategories.map((category, index) => (
                  <div
                    key={index}
                    className="border p-3 rounded-lg cursor-pointer hover:bg-muted/50 text-center"
                  >
                    {category.icon}
                    <div className="text-sm mt-1">{category.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Describe Your Issue
              </label>
              <Textarea
                placeholder="Please provide details about your issue"
                rows={4}
              />
            </div>
            <div className="flex items-center gap-2">
              <Input type="file" className="flex-1" />
              <span className="text-xs text-muted-foreground">
                Attach screenshots or files (optional)
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowContactDialog(false)}>
              Cancel
            </Button>
            <Button>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Sample data
const faqs = [
  {
    question: "How do I reset my password?",
    answer:
      "To reset your password, go to the login page and click on 'Forgot Password'. You'll receive a password reset link on your registered email address. Follow the link to create a new password."
  },
  {
    question: "How do I set up a recurring payment?",
    answer:
      "To set up a recurring payment, go to 'Payments & Transfers' tab, select 'Bill Payments', and click on 'Setup New Auto-pay'. Choose the biller, enter your details, select frequency, and confirm the setup."
  },
  {
    question: "What is the daily transfer limit?",
    answer:
      "The default daily transfer limit is ₹1,00,000 for UPI transactions and ₹5,00,000 for NEFT/RTGS. You can view or modify your transaction limits under Settings > Security > Transaction Limits."
  },
  {
    question: "How do I report a suspicious transaction?",
    answer:
      "If you notice a suspicious transaction, immediately call our 24/7 helpline at 1800-123-4567 or use the 'Report Issue' option under Help & Support. You can also visit your nearest branch to report the issue."
  },
  {
    question: "How long does it take for a fund transfer to be processed?",
    answer:
      "UPI and IMPS transfers are instant. NEFT transfers typically take 30 minutes to 2 hours based on clearing cycles. RTGS transfers (above ₹2,00,000) are processed in real-time during banking hours."
  },
  {
    question: "How can I update my contact information?",
    answer:
      "You can update your contact information by going to Settings > Profile > Personal Information. You can update your mobile number, email address, and communication preferences there."
  }
];

const popularTopics = [
  { title: "Account Management", count: 15 },
  { title: "Funds Transfer", count: 12 },
  { title: "Mobile Banking", count: 10 },
  { title: "Cards", count: 8 },
  { title: "Security", count: 14 },
  { title: "Loans & Mortgages", count: 9 }
];

const videoTutorials = [
  {
    title: "How to transfer money using UPI",
    duration: "3:45",
    views: "15K"
  },
  {
    title: "Setting up automatic bill payments",
    duration: "4:20",
    views: "12K"
  },
  {
    title: "Managing your savings goals",
    duration: "5:15",
    views: "8K"
  },
  {
    title: "How to apply for a loan online",
    duration: "6:30",
    views: "20K"
  },
  {
    title: "Setting up account alerts",
    duration: "2:50",
    views: "10K"
  },
  {
    title: "Mobile check deposit guide",
    duration: "3:10",
    views: "7K"
  }
];

const supportTickets = [
  {
    id: "TKT-001234",
    subject: "Unable to link UPI ID",
    date: "25 Feb, 2025",
    status: "Open"
  },
  {
    id: "TKT-001210",
    subject: "Card declined at merchant",
    date: "20 Feb, 2025",
    status: "In Progress"
  },
  {
    id: "TKT-001198",
    subject: "Help with loan statement",
    date: "15 Feb, 2025",
    status: "Closed"
  }
];

const supportCategories = [
  {
    name: "Account Issues",
    icon: <User className="mx-auto h-5 w-5 text-primary" />
  },
  {
    name: "Payments",
    icon: <Mail className="mx-auto h-5 w-5 text-primary" />
  },
  {
    name: "Cards",
    icon: <MessageCircle className="mx-auto h-5 w-5 text-primary" />
  },
  {
    name: "Technical Help",
    icon: <HelpCircle className="mx-auto h-5 w-5 text-primary" />
  }
];