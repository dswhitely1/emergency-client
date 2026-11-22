"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
import Script from "next/script";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitContact, type ContactState } from "@/app/actions/contact";
import {
  contactSchema,
  TOPIC_LABELS,
  type ContactInput,
} from "@/lib/contact/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

declare global {
  interface Window {
    turnstile?: { reset: (widget?: string | HTMLElement) => void };
  }
}

const initialState: ContactState = { status: "idle" };
const topics = Object.entries(TOPIC_LABELS) as [ContactInput["topic"], string][];

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm text-destructive">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  // Blocks a second submit in the gap before isPending turns on.
  const submitting = useRef(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      topic: "general",
      message: "",
      company: "",
    },
  });

  useEffect(() => {
    submitting.current = false;
    // Turnstile tokens are single-use, so a retry needs a fresh one.
    if (state.status === "error") window.turnstile?.reset();
  }, [state]);

  const onValid = () => {
    if (submitting.current || !formRef.current) return;
    submitting.current = true;
    // Read the form element itself so the Turnstile and honeypot fields go along.
    const formData = new FormData(formRef.current);
    startTransition(() => formAction(formData));
  };

  if (state.status === "success") {
    return (
      <p
        role="status"
        className="rounded-lg border border-primary/20 bg-card p-6 text-lg"
      >
        Thank you! Your message has been sent. We&apos;ll be in touch soon.
      </p>
    );
  }

  const errorFor = (name: keyof ContactInput) =>
    errors[name]?.message ?? state.fieldErrors?.[name]?.[0];
  const fieldProps = (name: keyof ContactInput) => {
    const invalid = Boolean(errorFor(name));
    return {
      id: `contact-${name}`,
      "aria-invalid": invalid,
      "aria-describedby": invalid ? `contact-${name}-error` : undefined,
    };
  };

  return (
    <form
      ref={formRef}
      onSubmit={(event) => handleSubmit(onValid)(event)}
      noValidate
      className="grid gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            {...register("name")}
            {...fieldProps("name")}
            autoComplete="name"
          />
          <FieldError id="contact-name-error" message={errorFor("name")} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            {...register("email")}
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
          />
          <FieldError id="contact-email-error" message={errorFor("email")} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact-phone">Phone (optional)</Label>
          <Input
            {...register("phone")}
            {...fieldProps("phone")}
            type="tel"
            autoComplete="tel"
          />
          <FieldError id="contact-phone-error" message={errorFor("phone")} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact-topic">Topic</Label>
          <Controller
            control={control}
            name="topic"
            render={({ field }) => (
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  {...fieldProps("topic")}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  className="w-full"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {topics.map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError id="contact-topic-error" message={errorFor("topic")} />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          {...register("message")}
          {...fieldProps("message")}
          rows={6}
        />
        <FieldError id="contact-message-error" message={errorFor("message")} />
      </div>

      {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input
          {...register("company")}
          id="contact-company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div
        className="cf-turnstile"
        data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
      />
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />

      {state.status === "error" && state.message && (
        <p role="alert" className="font-medium text-destructive">
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="justify-self-start px-8 font-heading text-xl tracking-wide uppercase"
      >
        {isPending ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
