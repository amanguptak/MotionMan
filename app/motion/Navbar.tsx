import React from "react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/nobg.png";
const Navbar = () => {
  return (
    <div className="shadow p-4  bg-[#a2c4c9]">
      <div className="flex flex-wrap gap-3 max-w-8xl m-auto items-center justify-between">
        <Link href="/" className="flex items-center gap-1">
          <Image src={logo} alt="logo" height={60} width={60} />
          {/* <span className="font-bold text-lg text-[#0072b1]">Motion</span> */}
        </Link>
        <div className="flex items-center gap-4">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: { avatarBox: { width: "2.3rem", height: "2.3rem" } },
            }}
          />
          <Button>
            <Plus size={20} className="mr-2" />
            Add Note
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
