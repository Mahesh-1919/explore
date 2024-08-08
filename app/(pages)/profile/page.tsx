import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <main className="flex-1 p-6 md:p-12">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <h1 className="text-2xl font-bold">John Doe</h1>
                <p className="text-muted-foreground">Software Engineer</p>
              </div>
            </div>
            <div className="prose prose-gray dark:prose-invert">
              <p>
                John is a skilled software engineer with a passion for building
                innovative solutions. He has over 5 years of experience in the
                industry and has worked on a variety of projects, from
                enterprise-level applications to consumer-facing web apps.
              </p>
              <p>
                In his free time, John enjoys hiking, reading, and spending time
                with his family. He is also an active member of the local
                technology community, where he regularly attends meetups and
                conferences to share his knowledge and learn from others.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline">Edit Profile</Button>
              <Button>Update Password</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
