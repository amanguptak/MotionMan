import { Loader2 } from "lucide-react";
import { Button  ,ButtonProps} from "./button";


type SpinButtonProps ={
    loading: boolean

}&ButtonProps  
// also including button props type


const Spinbutton = ({children,loading,...props}:SpinButtonProps) => {
  return (
    <Button {...props} disabled={props.disabled || loading}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}

export default Spinbutton