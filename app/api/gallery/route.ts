import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const GALLERY_FILE = path.join(process.cwd(), 'data', 'gallery.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(GALLERY_FILE)) {
    fs.writeFileSync(GALLERY_FILE, JSON.stringify([]));
  }
};

export async function GET() {
  try {
    ensureDataDir();
    const data = fs.readFileSync(GALLERY_FILE, 'utf-8');
    const images = JSON.parse(data);
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    ensureDataDir();
    const newImage = await request.json();
    const data = fs.readFileSync(GALLERY_FILE, 'utf-8');
    const images = JSON.parse(data);
    images.push({
      ...newImage,
      id: Date.now().toString(),
      uploadedAt: new Date().toISOString(),
    });
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(images, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save image' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    ensureDataDir();
    const { id } = await request.json();
    const data = fs.readFileSync(GALLERY_FILE, 'utf-8');
    const images = JSON.parse(data);
    const filtered = images.filter((img: any) => img.id !== id);
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(filtered, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}

