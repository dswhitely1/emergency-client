"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Zap, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

type UserState = {
  isAuthenticated: boolean;
  role: "user" | "admin" | null;
};

export function Navigation() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [userState, setUserState] = useState<UserState>({
    isAuthenticated: false,
    role: null,
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function getUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.access_token) {
        const payload = JSON.parse(atob(session.access_token.split(".")[1]));
        setUserState({
          isAuthenticated: true,
          role: payload.user_role ?? "user",
        });
      } else {
        setUserState({ isAuthenticated: false, role: null });
      }
    }

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.access_token) {
        const payload = JSON.parse(atob(session.access_token.split(".")[1]));
        setUserState({
          isAuthenticated: true,
          role: payload.user_role ?? "user",
        });
      } else {
        setUserState({ isAuthenticated: false, role: null });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserState({ isAuthenticated: false, role: null });
    startTransition(() => {
      router.push("/");
      router.refresh();
    });
  }

  const closeMobile = () => setMobileOpen(false);

  const { isAuthenticated, role } = userState;
  const isAdmin = role === "admin";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href={isAuthenticated ? (isAdmin ? "/admin/dashboard" : "/dashboard") : "/"}
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <Zap className="h-5 w-5 text-secondary" />
          <span>Emergency Electric INC</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {!isAuthenticated && (
            <>
              <Button
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/#services">Services</Link>
              </Button>
              <Button
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/#about">About</Link>
              </Button>
              <Button
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/#contact">Contact</Link>
              </Button>
              <Separator orientation="vertical" className="mx-2 h-6 bg-primary-foreground/20" />
              <Button
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                variant="secondary"
                className="text-secondary-foreground"
                asChild
              >
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}

          {isAuthenticated && !isAdmin && (
            <>
              <Button
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Separator orientation="vertical" className="mx-2 h-6 bg-primary-foreground/20" />
              <Button
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={handleLogout}
                disabled={isPending}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          )}

          {isAuthenticated && isAdmin && (
            <>
              <Button
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/admin/dashboard">Applicants</Link>
              </Button>
              <Button
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/admin/dashboard/messages">Messages</Link>
              </Button>
              <Separator orientation="vertical" className="mx-2 h-6 bg-primary-foreground/20" />
              <Button
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={handleLogout}
                disabled={isPending}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-background">
            <nav className="flex flex-col gap-2 pt-8">
              {!isAuthenticated && (
                <>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/#services" onClick={closeMobile}>Services</Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/#about" onClick={closeMobile}>About</Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/#contact" onClick={closeMobile}>Contact</Link>
                  </Button>
                  <Separator className="my-2" />
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/login" onClick={closeMobile}>Login</Link>
                  </Button>
                  <Button variant="default" className="justify-start" asChild>
                    <Link href="/register" onClick={closeMobile}>Register</Link>
                  </Button>
                </>
              )}

              {isAuthenticated && !isAdmin && (
                <>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/dashboard" onClick={closeMobile}>Dashboard</Link>
                  </Button>
                  <Separator className="my-2" />
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => { closeMobile(); handleLogout(); }}
                    disabled={isPending}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              )}

              {isAuthenticated && isAdmin && (
                <>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/admin/dashboard" onClick={closeMobile}>Applicants</Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/admin/dashboard/messages" onClick={closeMobile}>Messages</Link>
                  </Button>
                  <Separator className="my-2" />
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => { closeMobile(); handleLogout(); }}
                    disabled={isPending}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
