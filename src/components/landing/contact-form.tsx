"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FormValues {
  firstName: string;
  lastName: string;
  contact: string;
  subject: string;
  message: string;
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  contact: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: insertError } = await supabase
        .from("contact_messages")
        .insert({
          first_name: values.firstName,
          last_name: values.lastName,
          contact: values.contact,
          subject: values.subject,
          message: values.message,
        });

      if (insertError) throw insertError;
      setIsSuccess(true);
    } catch {
      setError("An error has occurred, please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleClose() {
    setIsSuccess(false);
    setValues(initialValues);
    setError(null);
  }

  function handleReset() {
    setValues(initialValues);
    setError(null);
  }

  return (
    <>
      <section id="contact" className="bg-background py-32">
        <div className="mx-auto max-w-5xl px-4 text-center" style={{ width: "83%" }}>
          <h3 className="mb-6 text-xl font-medium uppercase">Contact Us</h3>
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Send Us a Message!
          </h2>
          <form onSubmit={handleSubmit} className="my-4 flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex-1 space-y-2 text-left">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  value={values.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                />
              </div>
              <div className="flex-1 space-y-2 text-left">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  value={values.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </div>
              <div className="flex-1 space-y-2 text-left">
                <Label htmlFor="contact">Email or Phone Number</Label>
                <Input
                  id="contact"
                  name="contact"
                  required
                  value={values.contact}
                  onChange={handleChange}
                  placeholder="Email or Phone Number"
                />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                required
                value={values.subject}
                onChange={handleChange}
                placeholder="Subject"
              />
            </div>

            <div className="space-y-2 text-left">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                required
                value={values.message}
                onChange={handleChange}
                placeholder="Message"
                rows={5}
              />
              {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={handleReset}
                disabled={isLoading}
              >
                Reset
              </Button>
              <Button
                type="submit"
                className="bg-primary text-white hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Submit"}
              </Button>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Scroll To Top"
                className="rounded-full p-2 text-primary transition-colors hover:text-primary/80"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </section>

      <Dialog open={isSuccess} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
            <DialogDescription>
              Your Message has successfully been submitted!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleClose} className="bg-primary text-white hover:bg-primary/90">
              Ok
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
