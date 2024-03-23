/* eslint-disable no-console */
import { NextRequest, NextResponse } from 'next/server';
// import { sendEmail } from '@/helpers/mailer';
const fs = require('fs');
const path = require('path');
export async function POST(request: NextRequest) {
  try {
    // const reqBody = await request.json();
    // const { username, email, password } = reqBody;

    const filePath = path.join(__dirname, 'writeScribe.json');
  const data = [{
    "id": "0.7299173019022522",
    "language": "malayalam",
    "show": true,
    "textType": [],
    "type": "text"
  },
  {
    "id": "0.7299173019022522",
    "language": "malayalam",
    "show": true,
    "textType": [],
    "type": "text"
  },
  {
    "id": "0.7299173019022522",
    "language": "malayalam",
    "show": true,
    "textType": [],
    "type": "text"
  }];

  try {
    if (fs.existsSync(filePath)) {
      // If the file exists, read its content and overwrite
      const existingData = fs.readFileSync(filePath);
      const parsedData = JSON.parse(existingData);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log('File overwritten successfully!', filePath);
    } else {
      // If the file doesn't exist, create it and write data to it
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log('File created successfully!', filePath);
    }
    } catch (error) {
      console.error('Error writing file:', error);
    }
    return NextResponse.json({
      message: 'User created successfully',
      path: filePath,
      success: true
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}