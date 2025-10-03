import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .middleware(async ({ req }) => {
      return { title: "Uploaded Image", category: "Festivals", type: "image" };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      console.log("Upload complete:", file.url, metadata);
      return { 
        url: file.url,
        title: metadata.title,
        category: metadata.category,
        type: metadata.type,
      };
    }),
  
  videoUploader: f({ video: { maxFileSize: "100MB", maxFileCount: 5 } })
    .middleware(async ({ req }) => {
      return { title: "Uploaded Video", category: "Festivals", type: "video" };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      console.log("Video upload complete:", file.url, metadata);
      return { 
        url: file.url,
        title: metadata.title,
        category: metadata.category,
        type: metadata.type,
      };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;

