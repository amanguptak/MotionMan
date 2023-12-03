import React, { useState } from "react";
import { Button } from "./ui/button";
import BotBox from "./BotBox";
import { BotIcon } from "lucide-react";
const BotButton = () => {
  const [chatBox, setChatBox] = useState(false);
  return (
    <>
      <Button onClick={() => setChatBox(true)}>
        <BotIcon size={20} className="mr-2" /> 
        Motion AI
    
      </Button>
      {/* // do not write bot box components directly inside button it will create nesting issues */}
      <BotBox open={chatBox} onClose={() => setChatBox(false)}/>
    </>
  );
};

export default BotButton;


