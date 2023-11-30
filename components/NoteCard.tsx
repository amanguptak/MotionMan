import React from 'react'
import { Note as NoteType } from '@prisma/client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface NoteProps{
note : NoteType
}
const NoteCard = ({note}:NoteProps) => {
    const wasUpdated = note.updatedAt > note.createdAt;

    const createdUpdatedAtTimestamp = (
      wasUpdated ? note.updatedAt : note.createdAt
    ).toDateString();
    //for creating date in human readable format
  return (
    <Card>
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
    </Card>
  )
}

export default NoteCard