import {z} from "zod";

export const addNoteSchema = z.object({
    title: z.string().min(1,{message: "Title is Required"}).max(15,{message:"Title is too Long"}),
    content:z.string().optional()
})

export type AddNoteSchema = z.infer<typeof addNoteSchema>