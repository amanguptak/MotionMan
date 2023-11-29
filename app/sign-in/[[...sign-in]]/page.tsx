import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className=" bg-[#a2c4c9] flex h-screen items-center justify-center">
        <SignIn appearance= {{variables:{colorPrimary:"#0072b1"}}} />
    </div>
  )
}