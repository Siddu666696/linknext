import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { openUserConfig } from '@/amplify-configs/openUserConfig';
import { cookies } from 'next/headers';

// For use in Server Components or Route Handlers
export const serverClient = generateServerClientUsingCookies({
    config: openUserConfig,
    cookies: cookies,
  });