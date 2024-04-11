import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/nobg.png";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { auth } from "@clerk/nextjs";

import {redirect} from "next/navigation"
export default function Home() {

  const {userId} = auth()
  if(userId){redirect("/motion")}
  return (
   <main className="flex  items-center justify-center h-screen lg:gap-4 flex-col ">
    <div className="grid place-items-center p-4 gap-4 lg:max-w-3xl lg:grid-flow-col">
    <Image src={logo} alt="logo" height={300} width={300} />
    <p className="tracking-tight text-sm  lg:text-md text-[#fefde6] font-medium">Discover Motion: Your Note-Taking Companion, now elevated with AI precision. Effortlessly capture ideas, and watch as Motion transforms them into polished notes. Seamlessly organized, profoundly professional. Your thoughts, refined. :- Made By Aman Gupta</p>
    </div>
    
    <Button size='lg' asChild>
      <Link href="/motion" className="tracking-tight font-extrabold "><ArrowRight size={20} className="mr-2" />Continue</Link>
    </Button>
   </main>
  )
}
