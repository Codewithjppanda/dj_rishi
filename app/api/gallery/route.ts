import { NextResponse } from 'next/server';
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function GET() {
  try {
    const files = await utapi.listFiles();
    
    const images = files.files.map((file: any) => ({
      id: file.key,
      src: `https://utfs.io/f/${file.key}`,
      title: file.customId || file.name || 'Untitled',
      category: 'Festivals', // Default category since we can't store custom metadata in free tier
      uploadedAt: file.uploadedAt,
    }));
    
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching files:', error);
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
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}

