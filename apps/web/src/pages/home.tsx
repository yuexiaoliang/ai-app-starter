import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.js';
import { Button } from '@/components/ui/button.js';
import { HealthPanel } from '@/components/health-panel.js';
import {
  AnimatedDialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog.js';

export function HomePage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>
        <p className="mt-2 text-muted-foreground">
          This is a full-stack AI application starter template. Get started by exploring the
          settings or checking the server connection below.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <HealthPanel />

        <Card>
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              <strong>1.</strong> Start the server:{' '}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                pnpm --filter @repo/server dev
              </code>
            </p>
            <p>
              <strong>2.</strong> Configure the API base URL in{' '}
              <a href="/settings" className="text-primary underline">
                Settings
              </a>
            </p>
            <p>
              <strong>3.</strong> Copy the frontend access URL from the server log for automatic
              authentication
            </p>
            <p>
              <strong>4.</strong> Build your features on top of this foundation
            </p>
            <div className="pt-2">
              <Button variant="outline" size="sm" onClick={() => setDialogOpen(true)}>
                About This Template
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <AnimatedDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogHeader>
          <DialogTitle>AI App Starter</DialogTitle>
          <DialogDescription>
            A full-stack starter template built with React, Hono, and Tailwind CSS.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <p>
            This template includes a pre-configured monorepo with frontend and backend packages, API
            key authentication, theme switching, and shadcn/ui components.
          </p>
          <p>
            The dialog you are seeing uses Motion for enter/exit animations with AnimatePresence and
            forceMount.
          </p>
        </div>
      </AnimatedDialog>
    </div>
  );
}
