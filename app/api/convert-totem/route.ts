import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    let skinImageData;

    // Process uploaded skin file
    const skinFile = formData.get('skin') as File | null;
    
    if (skinFile) {
      // Process uploaded skin file
      const arrayBuffer = await skinFile.arrayBuffer();
      skinImageData = new Uint8Array(arrayBuffer);
      
      // Return the skin data as base64 for client-side processing
      const skinBase64 = `data:image/png;base64,${Buffer.from(skinImageData).toString('base64')}`;
      return NextResponse.json({ skinBase64 });
    } else {
      return NextResponse.json({ error: 'No skin file provided' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error processing skin:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' }, 
      { status: 500 }
    );
  }
}

// Change the default config for API endpoint
export const config = {
  runtime: 'edge', // Use Edge runtime
}; 