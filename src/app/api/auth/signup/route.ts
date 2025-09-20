import { NextResponse } from 'next/server';
import { storage } from '@/lib/db/mockData';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const existingUser = storage.users.find((user) => user.email === email);
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: String(storage.users.length + 1),
      name,
      email,
      password: hashedPassword,
      role: 'CUSTOMER' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    storage.users.push(newUser);

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred', error: String(error) },
      { status: 500 }
    );
  }
}
