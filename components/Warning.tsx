import React from 'react'
import { Edit ,Trash2 } from 'lucide-react'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'
import axios from 'axios'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

interface WarningProps{
    noteId: string,
    noteTitle:string
}

const Warning = ({noteId,noteTitle}:WarningProps) => {
    const router = useRouter();
    const onDelete = ()=>{
        axios.delete("/api/notes", {
        data: {
          id: noteId
        }    })
        .then((res)=>{
          
          toast.error(`${noteTitle} is deleted`);
      
          router.refresh();
   
         }).catch((err) => {
          console.log("Something Went Wrong",err);
         })
    }
  return (
  <>
    <AlertDialog>
  <AlertDialogTrigger><Trash2 size={20} className='text-red-300'/></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely 🤨sure ?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your Note
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={onDelete} className='bg-red-400 hover:bg-red-600'>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  </>

  )
}

export default Warning