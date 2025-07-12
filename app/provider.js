'use client';

import React, { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { db } from '../config/db.js';
import { users } from '../config/schema.js';

export function Provider({ children }) {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      isNewUser();
    }
  }, [user]);

  const isNewUser = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;

      const result = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (!result[0]) {
        await db.insert(users).values({
          name: user.fullName,
          email: email,
          imageUrl: user.imageUrl,
        });
      }
    } catch (err) {
      console.error('Error in isNewUser:', err);
    }
  };

  return <>{children}</>;
}
