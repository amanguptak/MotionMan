import React, { useState } from "react";
import { Button } from "./ui/button";
import BotBox from "./BotBox";
import { BotIcon } from "lucide-react";
const BotButton = () => {
  const [chatBox, setChatBox] = useState(false);
  return (
    <>
      <Button onClick={() => setChatBox(!chatBox)}>
        <BotIcon size={20} className="mr-2" />
        Motion AI
        <BotBox open={chatBox} onClose={()=>setChatBox(false)}/>
      </Button>
    </>
  );
};

export default BotButton;
