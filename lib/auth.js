import { verifyToken } from './jwt';

/**
 * Extracts and verifies JWT from the Authorization header.
 * Returns decoded user payload or null if invalid/missing.
 */
export function getAuthUser(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7);
  return verifyToken(token);
}

/**
 * Checks if the request is from an authenticated employer.
 */
export function requireEmployer(request) {
  const user = getAuthUser(request);
  if (!user) return { error: 'Unauthorized', status: 401 };
  if (user.role !== 'employer') return { error: 'Forbidden: employer access only', status: 403 };
  return { user };
}

/**
 * Checks if the request is from an authenticated jobseeker.
 */
export function requireJobseeker(request) {
  const user = getAuthUser(request);
  if (!user) return { error: 'Unauthorized', status: 401 };
  if (user.role !== 'jobseeker') return { error: 'Forbidden: jobseeker access only', status: 403 };
  return { user };
}

/**
 * Checks if the request is from any authenticated user.
 */
export function requireAuth(request) {
  const user = getAuthUser(request);
  if (!user) return { error: 'Unauthorized', status: 401 };
  return { user };
}
