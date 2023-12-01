"use client"
import React, { useState } from 'react'
import { Note as NoteType } from '@prisma/client'
import { Button } from "@/components/ui/button"

import { toast } from 'sonner';
import axios from 'axios'
import { Badge } from "@/components/ui/badge"

import Warning from './Warning'
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

    const createdUpdatedAtTimestamp = (
      wasUpdated ? note.updatedAt : note.createdAt
    ).toDateString();
    //for creating date in human readable format

 
  return (
    <>
    <Card className='h-fit transition-shadow hover:shadow-lg cursor-pointer '>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <CardDescription>
          {createdUpdatedAtTimestamp}
          {wasUpdated && "(updated)"
}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line text-md ">{note.content}</p>
      </CardContent>
      <CardFooter className='flex justify-end space-x-2'>
      <Edit size={20} className='text-[#0072b1] hover:text-[#178dce]' onClick={()=>setDialog(true)}/>
      {/* <Trash2 size={20} className='text-red-300' onClick= {onDelete}/> */}
      <Warning noteId={note.id} noteTitle={note.title}/>
  </CardFooter>
     
 
    </Card>
    <NoteDialog open={dialog} setOpen={setDialog} noteEdit={note}/>
    </>
  )
}

export default NoteCard
// export default dynamic(() => Promise.resolve(NoteCard), { ssr: false });