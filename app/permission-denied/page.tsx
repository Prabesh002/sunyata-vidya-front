import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PermissionDenied() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Permission Denied</CardTitle>
          <CardDescription>
            You do not have the necessary permissions to access this resource.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p className="text-sm text-muted-foreground">
            Please ensure you are logged in with an account that has the required
            access rights.  If you believe this is an error, please contact support.
          </p>
          <div className="flex justify-center">
            <Link href="/">
              <Button variant="outline">Go to Homepage</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}