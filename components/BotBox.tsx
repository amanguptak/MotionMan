import React from "react";
import { useChat } from "ai/react";
import { Message } from "ai";
import { cn } from "@/lib/utils";
import { XCircle } from "lucide-react";

interface BotProps {
  open: boolean;
onClose : ()=>void;
}
const BotBox = ({ open, onClose }: BotProps) => {
   const  {messages,input , handleInputChange,handleSubmit,setMessages, isLoading ,error }= useChat()
  return (
    <div
      className={cn(
        "bottom-0 right-0 z-10 w-full max-w-[493px]  p-1 lg:right-36",
        open ? "fixed" : "hidden"
      )}
    >
      
      {/* <button  className="mb-1 text-gray-700 ms-auto block bg-slate-600 p-2">
      close
      </button> */}
      <XCircle onClick={onClose}  className="mb-1 text-[#a2c4c9] ms-auto block" />
      <div className="flex h-[600px] flex-col  border bg-background rounded-md border-[#a2c4c9] text-gray-300 shadow-xl">
        <div className="mt-3 h-full overflow-y-auto px-3">
         Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
      </div>
    </div>
  );
};

export default BotBox;
