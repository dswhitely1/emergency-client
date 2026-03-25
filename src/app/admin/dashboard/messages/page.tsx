// src/app/admin/dashboard/messages/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import dayjs from "@/lib/dayjs";
import type { ContactMessage } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<ContactMessage | null>(null);

  const supabase = createClient();

  const fetchMessages = useCallback(async () => {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load messages");
      return;
    }

    setMessages(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  async function toggleRead(message: ContactMessage) {
    const newRead = !message.read;

    const { error } = await supabase
      .from("contact_messages")
      .update({ read: newRead })
      .eq("id", message.id);

    if (error) {
      toast.error("Failed to update message");
      return;
    }

    setMessages((prev) =>
      prev.map((m) => (m.id === message.id ? { ...m, read: newRead } : m))
    );

    toast.success(`Marked as ${newRead ? "read" : "unread"}`);
  }

  async function handleDelete() {
    if (!deleteTarget) return;

    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", deleteTarget.id);

    if (error) {
      toast.error("Failed to delete message");
      setDeleteTarget(null);
      return;
    }

    setMessages((prev) => prev.filter((m) => m.id !== deleteTarget.id));
    toast.success("Message deleted");
    setDeleteTarget(null);
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Loading messages...</p>
      </div>
    );
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          {messages.length} message{messages.length !== 1 ? "s" : ""}
          {unreadCount > 0 && ` (${unreadCount} unread)`}
        </p>
      </div>

      {messages.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center">
          No messages yet.
        </p>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <Card
              key={message.id}
              className={message.read ? "opacity-75" : ""}
            >
              <CardContent className="p-4 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{message.subject}</h3>
                      <Badge variant={message.read ? "secondary" : "default"}>
                        {message.read ? "Read" : "New"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      From {message.first_name} {message.last_name} &middot;{" "}
                      {dayjs(message.created_at).fromNow()}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <p className="text-sm">{message.message}</p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <p className="text-sm text-muted-foreground">
                    Contact: {message.contact}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleRead(message)}
                    >
                      Mark {message.read ? "Unread" : "Read"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteTarget(message)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete &ldquo;{deleteTarget?.subject}&rdquo;?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
