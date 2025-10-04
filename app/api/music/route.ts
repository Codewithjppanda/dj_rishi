import { NextResponse } from 'next/server';
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function GET() {
  try {
    const files = await utapi.listFiles();
    
    const musicFiles = files.files
      .filter((file: any) => {
        const fileName = file.name || file.customId || '';
        return fileName.toLowerCase().match(/\.(mp3|wav|flac|aac|ogg|m4a)$/);
      })
      .map((file: any) => {
        return {
          id: file.key,
          src: `https://utfs.io/f/${file.key}`,
          title: file.customId || file.name || 'Untitled Track',
          artist: 'DJ Rishi', // Default artist
          album: 'Single', // Default album
          genre: 'Electronic', // Default genre
          duration: '0:00', // We'll calculate this on the frontend
          uploadedAt: file.uploadedAt,
          type: 'audio',
        };
      });
    
    return NextResponse.json(musicFiles);
  } catch (error) {
    console.error('Error fetching music files:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    // Extract file key from URL or use id directly
    const fileKey = id.includes('utfs.io') ? id.split('/').pop() : id;
    
    await utapi.deleteFiles(fileKey);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting music file:', error);
    return NextResponse.json({ error: 'Failed to delete music file' }, { status: 500 });
  }
}
