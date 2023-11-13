import { NextResponse } from 'next/server'
import { databases, ID } from '@/appwrite'

export async function POST(request: Request) {
  console.log('request', request)

  // const data = await databases.createDocument(
  //   process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  //   process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  //   ID.unique(),
  //   {

  //   }
  // )
}
