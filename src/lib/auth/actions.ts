'use server'

import z from "zod"
import { auth } from "."
import { cookies, headers } from "next/headers";
import { randomUUID } from "crypto";
import { guests } from "../db/schema";
import { db } from "../db";
import { and, eq, lt } from "drizzle-orm";


const COOKIE_OPTIONS = {
  httpOnly: true as const,
  secure: true as const,
  sameSite: 'strict' as const,
  path: '/' as const,
  maxAge: 60*60*24*7,
}

// ALL THE SCHEMAS
const emailSchema = z.email();
const passwordSchema = z.string().min(6).max(128);
const nameSchema = z.string().min(1).max(100);

const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema
})

const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema, 
})


// AUTH FUNCTIONS
export const signUp = async (formData : FormData) => {
  const rawData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const data = signUpSchema.parse(rawData);

  const res = await auth.api.signUpEmail({
    body: {
      email: data.email,
      password: data.password,
      name: data.name
    }
  })

  await migrateGuestToUser();
  return { ok: true, userId: res.user?.id }
}

export const signIn = async (formData : FormData) => {
  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  const data = signInSchema.parse(rawData);

  const res = await auth.api.signInEmail({
    body: {
      email: data.email,
      password: data.password
    }
  });

  await migrateGuestToUser();
  return { ok: true, userId: res.user?.id}
}



// HELPER FUNCTIONS

export const createGuestSession = async () => {
  const cookieStore = await cookies();
  const existing = (await cookieStore).get('guest_session');
  if (existing?.value) {
    return { ok: true, sessionToken: existing.value }
  }

  const sessionToken = randomUUID();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + COOKIE_OPTIONS.maxAge * 1000)

  await db.insert(guests).values({
    sessionToken, expiresAt
  });

  cookieStore.set('guest_session', sessionToken, COOKIE_OPTIONS)
  
  return { ok: true, sessionToken }
}


export const guestSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('guest_session')?.value;

  if (!token) return { sessionToken: null }

  const now = new Date();
  await db.delete(guests).where(and(eq(guests.sessionToken, token), lt(guests.expiresAt, now)));

  return { sessionToken: token }
}

export const getCurrentUser = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    return session?.user ?? null
  } catch (e) {
    console.log(e);
    return null
  }
}

export const mergeGuestCartWithUserCart = async () => {
  await migrateGuestToUser();
  return { ok: true }
}

export const migrateGuestToUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('guest_session')?.value;
  if (!token) return;

  await db.delete(guests).where(eq(guests.sessionToken, token));
  cookieStore.delete('guest_session')
}