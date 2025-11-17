import {
  ADMIN_PASSWORD,
  ADMIN_USERNAME,
} from '../../src/auth/middlewares/admin.duard-middleware';

export function generateAuthToken() {
  const credentials = `${ADMIN_USERNAME}:${ADMIN_PASSWORD}`;
  const token = Buffer.from(credentials).toString('base64');
  return `Basic ${token}`;
}
