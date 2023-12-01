import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { addNoteSchema , updateNoteSchema ,deleteNoteSchema} from "@/lib/validation/note";

export const POST = async(req:Request)=>{
    try{
        const body = await req.json()
        // console.log("add",body)
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



export const PUT = async(req:Request)=>{
    try{
        const body = await req.json()
        // console.log("Edit",body)
        const parseResult = updateNoteSchema.safeParse(body)
        if(!parseResult.success){
            return Response.json({error:"Invalid note"},{status: 400})
        }
        const {title , content , id} = parseResult.data;
        const note = await prisma.note.findUnique({where: {id}})
        console.log("Note",note)
        if(!note){
            return Response.json({ error: "User not found" }, { status: 401 });
        }


        const {userId} = auth()
        if (!userId || userId !== note.userId) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
          }

    
        const updateNote = await prisma.note.update({
            where:{id},
            data:{
                title,
                content
            }
        })
        return Response.json({updateNote},{status: 200})

    }catch(err){
        console.log(err);
        return Response.json({error:"Internal Server Error"},{status:500})
    }
}


export const DELETE = async(req:Request)=>{
    try{
        const body = await req.json()
        // console.log("Delete",body)
        const parseResult = deleteNoteSchema.safeParse(body)
        if(!parseResult.success){
            return Response.json({error:"Invalid note"},{status: 400})
        }
        const {id} = parseResult.data;
     
        const note = await prisma.note.findUnique({where: {id}})
     
        if(!note){
            return Response.json({ error: "User not found" }, { status: 401 });
        }


        const {userId} = auth()
        if (!userId || userId !== note.userId) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
          }

    
          await prisma.note.delete({ where: { id } });
        return Response.json({message: "Note Deleted"},{status: 200})

    }catch(err){
        console.log(err);
        return Response.json({error:"Internal Server Error"},{status:500})
    }
}
