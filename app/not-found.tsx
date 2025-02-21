import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link'; 


export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">404 - Page Not Found</CardTitle>
          <CardDescription>
            Oops! The page you're looking for doesn't exist.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p className="text-sm text-muted-foreground">
            We couldn't find the requested resource.  It might have been moved,
            deleted, or never existed in the first place.
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