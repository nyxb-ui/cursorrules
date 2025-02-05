"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Play } from "lucide-react"
import React from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"
import {
   VideoModal,
   VideoModalContent,
   VideoModalTitle,
   VideoModalTrigger,
   VideoPlayButton,
   VideoPlayer,
   VideoPreview,
} from "./ui/video-modal"

type VideoCardProps = {
   video: {
      url: string
      thumbnail?: string
      title: string
      description: string
      author: {
         name: string
         image: string
      }
   }
}

export function VideoCard({ video }: VideoCardProps) {
   const [isPlaying, setIsPlaying] = React.useState(false)

   return (
      <VideoModal
         onOpenChange={(open) => {
            if (!open) setIsPlaying(false)
         }}
      >
         <VideoModalTrigger asChild>
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-border/50 hover:border-border/80 hover:-translate-y-1">
               <CardHeader className="p-0">
                  <div className="relative aspect-video">
                     <VideoPlayer
                        isPlaying={isPlaying}
                        onPlay={() => setIsPlaying(true)}
                     >
                        <VideoPreview>
                           <img
                              src={
                                 video.thumbnail ||
                                 `https://img.youtube.com/vi/${video.url.split("/").pop()?.split("?")[0]}/maxresdefault.jpg`
                              }
                              alt={video.title}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                        </VideoPreview>
                        <VideoPlayButton>
                           <div className="bg-black/30 flex size-16 items-center justify-center rounded-full backdrop-blur-sm transform group-hover:scale-110 transition-all duration-300 group-hover:bg-black/40">
                              <div className="from-zinc-900 to-zinc-950 relative flex size-12 items-center justify-center rounded-full bg-gradient-to-b shadow-lg">
                                 <Play className="size-6 text-white drop-shadow-lg" />
                              </div>
                           </div>
                        </VideoPlayButton>
                     </VideoPlayer>
                  </div>

                  <div className="p-5">
                     <div className="flex items-start gap-3 mb-3">
                        <Avatar className="ring-2 ring-border/50">
                           <AvatarImage
                              src={video.author.image}
                              className="size-10"
                           />
                           <AvatarFallback className="size-10 bg-primary/10 text-primary flex items-center justify-center text-xs font-medium uppercase">
                              {video.author.name.slice(0, 2)}
                           </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                           <CardTitle className="text-base font-semibold mb-1 truncate">
                              {video.title}
                           </CardTitle>
                           <span className="text-sm text-muted-foreground">
                              {video.author.name}
                           </span>
                        </div>
                     </div>

                     <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                        {video.description}
                     </CardDescription>
                  </div>
               </CardHeader>
            </Card>
         </VideoModalTrigger>

         <VideoModalContent>
            <VideoModalTitle className="sr-only">{video.title}</VideoModalTitle>
            <iframe
               src={video.url}
               className="w-full h-full rounded-xl"
               allowFullScreen
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
         </VideoModalContent>
      </VideoModal>
   )
}
