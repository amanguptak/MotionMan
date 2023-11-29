import { SignIn } from "@clerk/nextjs";
 import img from "@/public/images/motion.png"
 import Image from "next/image"

export default function Page() {
  return (
    <div className=" bg-[#a2c4c9] flex flex-col h-screen items-center justify-center">
   <Image src={img} alt="logo" height={200} width={200}/>



        <SignIn appearance= {{variables:{colorPrimary:"#0072b1"}}} />
    </div>
  )
}