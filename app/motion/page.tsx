import React from 'react'
import { auth } from '@clerk/nextjs'
import prisma from '@/lib/db/prisma'
const Motion = async () => {
  const { userId } = auth();

  if (!userId) throw Error("userId undefined");
  const allMotions = await prisma.note.findMany({where :{userId: userId}})
  return (
    <div>{JSON.stringify(allMotions)}</div>
  )
}

export default Motion