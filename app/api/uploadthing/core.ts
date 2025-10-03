import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .middleware(async ({ req }) => {
      return { title: "Uploaded Image", category: "Festivals" };
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

