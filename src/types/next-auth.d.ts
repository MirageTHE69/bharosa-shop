import type { DefaultSession } from 'next-auth';
import type { ProfileRole } from '@/types/database';

declare module 'next-auth' {
  interface User {
    role: ProfileRole;
  }

  interface Session {
    user: {
      id: string;
      role: ProfileRole;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: ProfileRole;
  }
}
