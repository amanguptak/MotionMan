import { AddNoteSchema, addNoteSchema } from "@/lib/validation/note";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Spinbutton from "./ui/spin-button";
import axios from "axios";
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

interface NoteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const NoteDialog = ({ open, setOpen }: NoteDialogProps) => {
  const router = useRouter();
  const form = useForm<AddNoteSchema>({
    resolver: zodResolver(addNoteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (values: AddNoteSchema) => {
   axios.post("/api/notes",values).then((res)=>{
    console.log(res);
    form.reset();
    router.refresh();
    setOpen(false);
   }).catch((err) => {
    console.log("Something Went Wrong",err);
   })
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
