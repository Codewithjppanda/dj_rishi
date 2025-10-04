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
  
  videoUploader: f({ video: { maxFileSize: "64MB", maxFileCount: 5 } })
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

  // New: Audio uploader for high-quality music files
  audioUploader: f({ 
    audio: { 
      maxFileSize: "128MB", // Support high-quality audio files
      maxFileCount: 10 
    } 
  })
    .middleware(async ({ req }) => {
      return { 
        title: "Uploaded Audio", 
        artist: "DJ Rishi",
        album: "Single",
        genre: "Electronic",
        type: "audio" 
      };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      console.log("Audio upload complete:", file.url, metadata);
      return { 
        url: file.url,
        title: metadata.title,
        artist: metadata.artist,
        album: metadata.album,
        genre: metadata.genre,
        type: metadata.type,
      };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;

