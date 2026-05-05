import { cookies } from 'next/headers';

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');
    if (!token) return false;

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) return false;

    const decoded = Buffer.from(token.value, 'base64').toString();
    const [storedPassword] = decoded.split(':');
    return storedPassword === adminPassword;
  } catch {
    return false;
  }
}
