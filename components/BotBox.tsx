import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Message } from "ai";
import { useChat } from "ai/react";
import { Bot, Trash, XCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface BotProps {
  open: boolean;
onClose : ()=>void;
}
const BotBox = ({ open, onClose }: BotProps) => {
   const  {messages,input , handleInputChange,handleSubmit,setMessages, isLoading ,error }= useChat()
   const inputRef = useRef<HTMLInputElement>(null);
   const scrollRef = useRef<HTMLDivElement>(null);
 
   useEffect(() => {
     if (scrollRef.current) {
       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
     }
   }, [messages]);
 
   useEffect(() => {
     if (open) {
       inputRef.current?.focus();
     }
   }, [open]);
   
  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";
  return (
    <div
    className={cn(
        "bottom-0 right-0 z-10 w-full max-w-[500px] p-1 xl:right-36",
        open ? "fixed" : "hidden",
      )}
    >
   
      <XCircle onClick={onClose}  className="mb-1 text-[#a2c4c9]  block"/>

      <div className="flex h-[600px] flex-col  border bg-background rounded-md border-[#a2c4c9] shadow-xl">
        <div className="mt-3 h-full overflow-y-auto px-3 text-gray-800">
        <div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
          {isLoading && lastMessageIsUser && (
            <ChatMessage
              message={{
                role: "assistant",
                content: "Thinking...",
              }}
            />
          )}
          {error && (
            <ChatMessage
              message={{
                role: "assistant",
                content: "Something went wrong. Please try again.",
              }}
            />
          )}
          {!error && messages.length === 0 && (
            <div className="flex h-full items-center justify-center mx-8">
              {/* <Bot /> */}
              Unlock the power of Motion AI 🤖 to enhance your experience!
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="m-3 flex gap-1 space-x-2">
          <Button
            title="Clear chat"
            variant="outline"
            size="icon"
            className="shrink-0"
            type="button"
            onClick={() => setMessages([])}
          >
            <Trash />
          </Button>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Say something..."
            ref={inputRef}
          />
          <Button type="submit">Ask</Button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default BotBox;

function ChatMessage({
    message: { role, content },
  }: {
    message: Pick<Message, "role" | "content">;
  }) {
    const { user } = useUser();
  
    const isAiMessage = role === "assistant";
  
    return (
      <div
        className={cn(
          "mb-3 flex items-center",
          isAiMessage ? "me-5 justify-start" : "ms-5 justify-end",
        )}
      >
        {isAiMessage && <Bot className="mr-2 shrink-0" />}
        <p
          className={cn(
            "whitespace-pre-line rounded-2xl border px-3 py-1",
            isAiMessage ? "bg-background" : "bg-[#0072b1] text-primary-foreground",
          )}
        >
          {content}
        </p>
        {!isAiMessage && user?.imageUrl && (
          <Image
            src={user.imageUrl}
            alt="User image"
            width={100}
            height={100}
            className="ml-2 h-8 w-8 rounded-full object-cover"
          />
        )}
      </div>
    );
  }