import React from 'react'
import { auth } from '@clerk/nextjs'
import prisma from '@/lib/db/prisma'
import NoteCard from '@/components/NoteCard'
import Banner from '@/components/Banner'
const Motion = async () => {
  const { userId } = auth();

  if (!userId) throw Error("userId undefined");
  const allMotions = await prisma.note.findMany({where :{userId: userId}})
  return (
   <div className="">
    
     <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
  
  {allMotions.map((note) => (
    <NoteCard note={note} key={note.id} />
  ))}
  {allMotions.length === 0 && (
    <div className="col-span-full text-center">
      {"You don't have any notes yet. Why don't you create one?"}
    </div>
  )}
</div>
   </div>
  )
}

export default Motion