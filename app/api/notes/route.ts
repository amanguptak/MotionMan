import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { addNoteSchema } from "@/lib/validation/note";

export async function POST(req:Request){
    try{
        const body = await req.json()
        const parseResult = addNoteSchema.safeParse(body)
        if(!parseResult.success){
            return Response.json({error:"Invalid note"},{status: 400})
        }
        const {title , content} = parseResult.data;
        const {userId} = auth()
        if (!userId) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
          }

          const note = await prisma.note.create({
            data:{
                title,
                content,
                userId,}
          })
          return Response.json({note},{status: 201})

    }catch(err){
        console.log(err);
        return Response.json({error:"Internal Server Error"},{status:500})
    }
}

