import { Menu } from "~/components/menu"
import { VideoCard } from "~/components/video-card"
import { videos } from "~/data/videos"

export const metadata = {
   title: "Learn Cursor",
   description: "Learn how to use Cursor from videos and tutorials",
}

export default function Page() {
   return (
      <div className="flex min-h-screen bg-gradient-to-b from-background to-background/80">
         <div className="hidden md:flex mt-12 sticky top-12 h-[calc(100vh-3rem)] border-r border-border/50">
            <Menu />
         </div>

         <main className="flex-1 p-6 pt-16 container mx-auto max-w-7xl">
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
               Learn Cursor
            </h1>
            <p className="text-muted-foreground mb-12 max-w-2xl">
               Discover how to use Cursor effectively through our curated
               collection of tutorials and guides.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
               {videos.map((video) => (
                  <VideoCard key={video.url} video={video} />
               ))}
            </div>
         </main>
      </div>
   )
}
