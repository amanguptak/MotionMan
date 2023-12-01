"use client"
import React, { useState } from 'react'
import { Note as NoteType } from '@prisma/client'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner';
import axios from 'axios'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Edit ,Trash2 } from 'lucide-react'
import NoteDialog from './NoteDialog'
interface NoteProps{
note : NoteType
}
const NoteCard = ({note}:NoteProps) => {
    const wasUpdated = note.updatedAt > note.createdAt;
    const [dialog , setDialog] = useState(false)
    const router = useRouter();
    const createdUpdatedAtTimestamp = (
      wasUpdated ? note.updatedAt : note.createdAt
    ).toDateString();
    //for creating date in human readable format

    const onDelete = ()=>{
        axios.delete("/api/notes", {
        data: {
          id: note.id,
        }    })
        .then((res)=>{
          console.log(res);
          toast.error(`${note?.title} is deleted`);
      
          router.refresh();
   
         }).catch((err) => {
          console.log("Something Went Wrong",err);
         })
    }
  return (
    <>
    <Card className='h-fit hover:shadow-lg cursor-pointer transition-shadow'>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <CardDescription>
          {createdUpdatedAtTimestamp}
          {wasUpdated && " (updated)"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line text-md ">{note.content}</p>
      </CardContent>
      <CardFooter className='flex justify-end space-x-2'>
      <Edit size={20} className='text-[#0072b1]' onClick={()=>setDialog(true)}/>
      <Trash2 size={20} className='text-red-300' onClick= {onDelete}/>
  </CardFooter>
     
 
    </Card>
    <NoteDialog open={dialog} setOpen={setDialog} noteEdit={note}/>
    </>
  )
}

export default NoteCard