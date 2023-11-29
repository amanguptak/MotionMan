import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
    return (
        <div className="flex h-screen items-center justify-center bg-[#a2c4c9]">
            <SignUp appearance= {{variables:{colorPrimary:"#0072b1"}}} />
        </div>
      )
}