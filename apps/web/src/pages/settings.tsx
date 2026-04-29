import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, X, RefreshCw, Shield, ShieldAlert, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.js';
import { Button } from '@/components/ui/button.js';
import { Input } from '@/components/ui/input.js';
import { Label } from '@/components/ui/label.js';
import { Badge } from '@/components/ui/badge.js';
import { Separator } from '@/components/ui/separator.js';
import { APP_NAME, APP_VERSION, DEFAULT_API_BASE_URL, ServerUrlSchema } from '@repo/config';
import { fetchHealth } from '@/lib/api.js';

const ServerUrlFormSchema = z.object({
  url: ServerUrlSchema,
});

interface ServerFormData {
  url: string;
}

interface ApiKeyFormData {
  apiKey: string;
}

export function SettingsPage() {
  const [connectionStatus, setConnectionStatus] = useState<
    'idle' | 'testing' | 'success' | 'error'
  >('idle');
  const [connectionError, setConnectionError] = useState<string>('');
  const [savedApiKey, setSavedApiKey] = useState<string>(localStorage.getItem('api-key') || '');

  const {
    register: registerServer,
    handleSubmit: handleServerSubmit,
    formState: { errors: serverErrors, isValid: serverIsValid },
  } = useForm<ServerFormData>({
    resolver: zodResolver(ServerUrlFormSchema),
    mode: 'onChange',
    defaultValues: {
      url: localStorage.getItem('api-base-url') || DEFAULT_API_BASE_URL,
    },
  });

  const {
    register: registerApiKey,
    handleSubmit: handleApiKeySubmit,
    formState: { errors: apiKeyErrors },
  } = useForm<ApiKeyFormData>({
    mode: 'onChange',
    defaultValues: {
      apiKey: savedApiKey,
    },
  });

  const onTestConnection = async (data: ServerFormData) => {
    setConnectionStatus('testing');
    setConnectionError('');

    localStorage.setItem('api-base-url', data.url);

    try {
      await fetchHealth();
      setConnectionStatus('success');
    } catch (err) {
      setConnectionStatus('error');
      setConnectionError(err instanceof Error ? err.message : 'Connection failed');
    }
  };

  const onSaveApiKey = (data: ApiKeyFormData) => {
    if (data.apiKey.trim()) {
      localStorage.setItem('api-key', data.apiKey.trim());
      setSavedApiKey(data.apiKey.trim());
    } else {
      localStorage.removeItem('api-key');
      setSavedApiKey('');
    }
  };

  const isAuthenticated = !!savedApiKey;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-2 text-muted-foreground">Configure your application preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Server Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleServerSubmit(onTestConnection)(e);
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="server-url">Server Address</Label>
              <Input
                id="server-url"
                placeholder="http://localhost:13001"
                {...registerServer('url')}
              />
              {serverErrors.url && (
                <p className="text-sm text-destructive">{serverErrors.url.message}</p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={!serverIsValid || connectionStatus === 'testing'}>
                {connectionStatus === 'testing' ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Testing...
                  </>
                ) : (
                  'Test Connection'
                )}
              </Button>

              {connectionStatus === 'success' && (
                <Badge variant="default" className="gap-1">
                  <Check className="h-3 w-3" />
                  Connected
                </Badge>
              )}
              {connectionStatus === 'error' && (
                <Badge variant="destructive" className="gap-1">
                  <X className="h-3 w-3" />
                  Connection failed
                </Badge>
              )}
            </div>

            {connectionError && <p className="text-sm text-destructive">{connectionError}</p>}
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Shield className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium">Authenticated</span>
              </>
            ) : (
              <>
                <ShieldAlert className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium">Not authenticated</span>
              </>
            )}
          </div>

          {!isAuthenticated && (
            <p className="text-sm text-muted-foreground">
              Please copy the access URL from the server startup log, or manually enter the API Key
              below.
            </p>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleApiKeySubmit(onSaveApiKey)(e);
            }}
            className="space-y-3"
          >
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter API Key..."
                {...registerApiKey('apiKey')}
              />
              {apiKeyErrors.apiKey && (
                <p className="text-sm text-destructive">{apiKeyErrors.apiKey.message}</p>
              )}
            </div>
            <Button type="submit" variant="outline">
              Save API Key
            </Button>
          </form>
        </CardContent>
      </Card>

      <Separator />

      <footer className="py-4 text-sm text-muted-foreground">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-medium text-foreground">{APP_NAME}</span>{' '}
            <span>v{APP_VERSION}</span>
          </div>
          <a
            href="https://github.com/yuexiaoliang/ai-app-starter"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-foreground"
          >
            GitHub Repository
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </footer>
    </div>
  );
}
