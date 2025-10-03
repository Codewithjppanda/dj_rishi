import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .input<{ title: string; category: string }>()
    .middleware(async ({ input }) => {
      return { title: input.title, category: input.category };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      console.log("Upload complete:", file.url, metadata);
      return { 
        url: file.url,
        title: metadata.title,
        category: metadata.category,
      };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;

