import {z} from "zod";

export const addNoteSchema = z.object({
    title: z.string().min(1,{message: "Title is Required"}).max(50,{message:"Title is too Long"}),
    content:z.string().optional()
})

export type AddNoteSchema = z.infer<typeof addNoteSchema>


export const updateNoteSchema = addNoteSchema.extend({
    id: z.string().min(1)

})

export const deleteNoteSchema = z.object({
    id: z.string().min(1)
})