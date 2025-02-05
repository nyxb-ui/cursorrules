"use client"

import { XIcon } from "lucide-react"
import { useEffect, useState } from "react"

export function Banner() {
   const [isVisible, setIsVisible] = useState(true)
   const [currentBannerIndex, setCurrentBannerIndex] = useState(0)

   useEffect(() => {
      setCurrentBannerIndex(Math.floor(Math.random() * 2))
   }, []) // Run once on mount
   const [isAnimating, setIsAnimating] = useState(true) // Start as true
   const [animateDirection, setAnimateDirection] = useState<"up" | "down">("up")

   const banners = [
      {
         href: "https://nyxbui.design",
         logo: (
            <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 502.13 451.75"
               width={50}
               height={50}
               className="absolute left-1 top-4 scale-[.65]"
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
         ),
         title: "Made by NYXB",
         description:
            "Check out NYXB UI - A modern, customizable UI library for building beautiful React applications. ↗",
      },
   ]

   useEffect(() => {
      // Initial animation up
      setTimeout(() => {
         setIsAnimating(false)
      }, 300)

      const switchBanner = () => {
         setIsAnimating(true)
         setAnimateDirection("down")
         // Animate current banner down
         setTimeout(() => {
            setCurrentBannerIndex((prev) => (prev + 1) % banners.length)
            setAnimateDirection("up")
            // Animate next banner up
            setTimeout(() => {
               setIsAnimating(false)
            }, 300)
         }, 300)
      }

      // Initial switch after 8 seconds
      const timer = setTimeout(switchBanner, 8000)

      // Set up recurring switches every 16 seconds
      const interval = setInterval(switchBanner, 16000)

      return () => {
         clearTimeout(timer)
         clearInterval(interval)
      }
   }, [])

   const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setIsAnimating(true)
      setAnimateDirection("down")
      setTimeout(() => {
         setIsVisible(false)
         setIsAnimating(false)
      }, 300)
   }

   if (!isVisible) return null

   const slideClass = isAnimating
      ? animateDirection === "down"
         ? "animate-out slide-out-to-bottom duration-300"
         : "animate-in slide-in-from-bottom-full duration-300"
      : ""

   const currentBanner = banners[currentBannerIndex]

   return (
      <a href={currentBanner.href} target="_blank" rel="noreferrer">
         <div
            className={`fixed overflow-hidden ${slideClass} z-50 bottom-4 md:bottom-4 left-4 md:left-auto right-4 md:right-4 w-[calc(100vw-32px)] md:w-[calc(100vw-16px)] md:max-w-[350px] border border-border p-4 transition-all bg-background h-[88px] group`}
         >
            {currentBanner.logo}

            <div className="flex justify-between">
               <div className="flex flex-col space-y-0.5 pl-[40px]">
                  <div className="flex space-x-2 items-center">
                     <span className="text-sm font-medium">
                        {currentBanner.title}
                     </span>
                  </div>
                  <p className="text-xs text-[#878787]">
                     {currentBanner.description}
                  </p>
               </div>

               <button
                  type="button"
                  className="absolute right-1.5 top-1.5 text-[#878787] hidden group-hover:block"
                  onClick={handleClose}
               >
                  <XIcon className="w-4 h-4" />
               </button>
            </div>
         </div>
      </a>
   )
}
