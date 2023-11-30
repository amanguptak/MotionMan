import { AddNoteSchema , addNoteSchema } from "@/lib/validation/note";
import {zodResolver} from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import {useForm} from "react-hook-form"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "./ui/dialog";
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "./ui/form";
  import { Input } from "./ui/input";
// import LoadingButton from "./ui/loading-button";
import { Textarea } from "./ui/textarea";

interface NoteDialogProps{
    open:boolean;
    setOpen:(open:boolean) => void;
}



const NoteDialog = ({open,setOpen}:NoteDialogProps) => {
    const router = useRouter()
    const form = useForm<AddNoteSchema>({
        resolver : zodResolver(addNoteSchema),
        defaultValues: {
            title: "",
            content: "",
          },
    })
 
    const onSubmit = async(values:AddNoteSchema)=>{
        console.log(values)
    }
  return (
    <div>NoteDialog</div>
  )
}

export default NoteDialog