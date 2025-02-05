"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ny } from "~/lib/utils"

const tabs = [
   {
      name: "All",
      path: "/",
   },
   {
      name: "Popular",
      path: "/popular",
   },
]

export function Tabs() {
   const pathname = usePathname()

   return (
      <div className="relative flex w-fit items-center rounded-xl border border-white/10 bg-black/40 p-1.5 backdrop-blur-sm">
         {tabs.map((tab) => {
            const isActive = pathname === tab.path

            return (
               <Link
                  key={tab.path}
                  href={tab.path}
                  className={ny(
                     "relative z-20 px-5 py-2 text-sm font-medium transition-colors",
                     isActive
                        ? "text-white"
                        : "text-white/50 hover:text-white/80",
                  )}
               >
                  {isActive && (
                     <motion.div
                        layoutId="active-tab"
                        className="absolute inset-0 z-10 rounded-lg bg-gradient-to-b from-white/10 to-white/5"
                        transition={{
                           type: "spring",
                           bounce: 0.2,
                           duration: 0.6,
                        }}
                     />
                  )}
                  <span className="relative z-20">{tab.name}</span>
               </Link>
            )
         })}
      </div>
   )
}
