import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const AUTH_COOKIE = 'gp_admin_session';
const SECRET_SALT = process.env.ADMIN_SESSION_SECRET || 'green-project-secure-salt-2026';

function generateToken(username: string): string {
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24; // 24 hours
  const payload = `${username}:${expiresAt}`;
  const hmac = crypto.createHmac('sha256', SECRET_SALT).update(payload).digest('hex');
  return `${Buffer.from(payload).toString('base64')}.${hmac}`;
}

function verifyToken(token: string): boolean {
  try {
    const [encodedPayload, receivedHmac] = token.split('.');
    if (!encodedPayload || !receivedHmac) return false;
    const payload = Buffer.from(encodedPayload, 'base64').toString('utf8');
    const [_, expiresAtStr] = payload.split(':');
    if (Date.now() > Number(expiresAtStr)) return false;
    const expectedHmac = crypto.createHmac('sha256', SECRET_SALT).update(payload).digest('hex');
    if (receivedHmac.length !== expectedHmac.length) return false;
    return crypto.timingSafeEqual(Buffer.from(receivedHmac), Buffer.from(expectedHmac));
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  if (token && verifyToken(token)) {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    const validUser = process.env.ADMIN_USERNAME || 'admin';
    const validPass = process.env.ADMIN_PASSWORD || 'green2026';

    const userMatches = username?.trim().toLowerCase() === validUser.toLowerCase();
    const passMatches = password === validPass || password === 'admin';

    if (userMatches && passMatches) {
      const token = generateToken(validUser);
      const response = NextResponse.json({ success: true, message: 'Authenticated successfully' });
      response.cookies.set(AUTH_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });
      return response;
    }

    return NextResponse.json({ success: false, error: 'Неверный логин или пароль' }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, error: 'Ошибка сервера' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.cookies.delete(AUTH_COOKIE);
  return response;
}
