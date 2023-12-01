import { AddNoteSchema, addNoteSchema } from "@/lib/validation/note";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Spinbutton from "./ui/spin-button";
import axios from "axios";
import { toast } from 'sonner';


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

import { Textarea } from "./ui/textarea";
import { Note } from "@prisma/client";

interface NoteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  noteEdit ?: Note
}

const NoteDialog = ({ open, setOpen ,noteEdit}: NoteDialogProps) => {
  const router = useRouter();
//   const { toast } = useToast()
  const form = useForm<AddNoteSchema>({
    resolver: zodResolver(addNoteSchema),
    defaultValues: {
      title: noteEdit?.title || "",
      content:noteEdit?.content || "",
    },
  });


  const onSubmit = (values: AddNoteSchema) => {
    if(noteEdit) {
      axios.put("/api/notes",{...values , id:noteEdit.id}).then((res)=>{
        console.log(res);
        toast.info("note updated successfully")
       
        router.refresh();
        setOpen(false);
       }).catch((err) => {
        console.log("Something Went Wrong",err);
       })
    }else{
      axios.post("/api/notes",values).then((res)=>{
        toast.success("You added new motion 😀")
    
        form.reset();
        router.refresh();
        setOpen(false);
       }).catch((err) => {
        console.log("Something Went Wrong",err);
       })
    }
   
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Motion</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({field}) => (
                  <FormItem>
                    {/* <FormLabel>Note Title</FormLabel> */}
                    <FormControl>
                      <Input placeholder="Note Title" {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Content</FormLabel> */}
                    <FormControl>
                      <Textarea placeholder="Content" {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              ></FormField>

<DialogFooter>
              <Spinbutton
                type="submit"
                loading={form.formState.isSubmitting}
              >
                Submit
              </Spinbutton>
            </DialogFooter>
            </form>
          </Form>
          
        </DialogContent>
      
      </Dialog>
    </>
  );
};

export default NoteDialog;
