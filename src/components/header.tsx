"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { AuroraText } from "./ui/aurora-text"
import { Button } from "./ui/button"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "./ui/dialog"

export function Header() {
   const [isMac, setIsMac] = useState(false)

   useEffect(() => {
      const isMacOS =
         // @ts-ignore - userAgentData is not yet in TypeScript's lib
         navigator?.userAgentData?.platform === "macOS" ||
         navigator.userAgent.includes("Mac")
      setIsMac(isMacOS)
   }, [])

   return (
      <div className="md:fixed top-0 z-10 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
         <div className="container flex h-14 items-center justify-between px-4">
            <Link
               href="/"
               className="font-mono text-sm font-medium transition-colors hover:text-primary"
            >
               <AuroraText>cursorrules</AuroraText>
            </Link>

            <div className="flex items-center gap-6">
               <Link
                  href="/learn"
                  className="text-sm font-medium transition-colors hover:text-primary"
               >
                  Learn
               </Link>

               <Dialog>
                  <DialogTrigger asChild>
                     <Button
                        variant="ghost"
                        className="text-sm font-medium transition-colors hover:text-primary hover:bg-transparent p-0"
                     >
                        About
                     </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                     <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">
                           About
                        </DialogTitle>
                     </DialogHeader>

                     <div className="space-y-6 py-4">
                        <DialogDescription className="text-base leading-relaxed">
                           Copy and add a .cursorrules file in the root of your
                           project. The instructions in the .cursorrules file
                           will be included for features such as Cursor Chat and{" "}
                           <span className="inline-flex items-center gap-1">
                              <kbd className="px-2 py-1 text-sm font-semibold bg-muted rounded-md">
                                 {isMac ? "⌘" : "Ctrl"}
                              </kbd>
                              <kbd className="px-2 py-1 text-sm font-semibold bg-muted rounded-md">
                                 K
                              </kbd>
                           </span>
                           . The more specific your rules for your project, the
                           better.
                           <span className="block mt-6">
                              Feel free to create your own directory using our{" "}
                              <a
                                 href="https://git.new/cd"
                                 className="underline hover:text-primary transition-colors"
                              >
                                 template
                              </a>{" "}
                              on GitHub.
                           </span>
                        </DialogDescription>

                        <div className="mt-8">
                           <a href="https://git.new/cd">
                              <Button
                                 className="w-full bg-white hover:bg-gray-100 text-black font-medium rounded-full transition-colors"
                                 variant="rainbow-outline"
                              >
                                 Submit
                              </Button>
                           </a>
                        </div>

                        <div className="flex items-center justify-center text-sm text-muted-foreground">
                           Made by
                           <a
                              href="https://nyxbui.design"
                              className="ml-1 hover:text-primary transition-colors"
                           >
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 502.13 451.75"
                                 width={20}
                                 height={20}
                                 className="scale-75"
                              >
                                 <g>
                                    <polygon
                                       fill="currentColor"
                                       points="122.2 279.21 122.2 172.55 78.46 212.13 52.16 262.67 69.09 339.57 122.2 451.75 122.2 279.21"
                                    />
                                    <polygon
                                       fill="currentColor"
                                       points="122.2 451.75 52.16 262.67 .04 329.73 122.2 451.75"
                                    />
                                    <polygon
                                       fill="currentColor"
                                       points=".86 329.73 52.97 262.67 .86 122.01 .86 329.73"
                                    />
                                    <polygon
                                       fill="currentColor"
                                       points=".04 122.01 52.16 262.67 122.2 172.55 .04 122.01"
                                    />
                                    <polygon
                                       fill="currentColor"
                                       points="0 125.26 117.81 174 122.16 175.8 111.29 14.12 0 125.26"
                                    />
                                    <polygon
                                       fill="currentColor"
                                       points="111.33 10.86 122.2 172.55 191.06 212.76 251.09 225.87 223.4 158.74 111.33 10.86"
                                    />
                                    <polygon
                                       fill="currentColor"
                                       points="251.09 225.87 122.2 172.55 304.48 354.6 390.86 440.88 320.46 297.62 251.09 225.87"
                                    />
                                    <polygon
                                       fill="currentColor"
                                       points="111.33 10.86 251.09 225.87 319.7 265.95 379.98 279.21 197.71 97.14 122.2 21.74 111.33 10.86"
                                    />
                                    <polygon
                                       fill="currentColor"
                                       points="379.98 279.21 251.09 225.87 390.86 440.88 400.34 343.32 379.98 279.21"
                                    />
                                    <polygon
                                       fill="currentColor"
                                       points="379.98 279.21 390.86 440.88 502.13 329.73 435.3 290.91 379.98 279.21"
                                    />
                                    <polygon
                                       fill="currentColor"
                                       points="379.98 279.21 502.13 329.73 471.39 227.04 450.03 189.07 412.83 218.01 379.98 279.21"
                                    />
                                    <polygon
                                       fill="currentColor"
                                       points="379.98 279.21 450.03 189.07 428.35 118.78 379.98 0 379.98 172.53 379.98 279.21"
                                    />
                                    <polygon
                                       fill="currentColor"
                                       points="450.03 189.07 502.13 329.73 502.13 122.01 466.71 153.8 450.03 189.07"
                                    />
                                    <polygon
                                       fill="currentColor"
                                       points="450.03 189.07 502.13 122.01 379.98 0 450.03 189.07"
                                    />
                                 </g>
                              </svg>
                           </a>
                        </div>
                     </div>
                  </DialogContent>
               </Dialog>
            </div>
         </div>
      </div>
   )
}
