// utils/sanitizeHtml.ts
// import createDOMPurify from 'dompurify';
// import { JSDOM } from 'jsdom';

// const window = new JSDOM('').window;
// const DOMPurify = createDOMPurify(window);

// export function sanitizeHtml(dirty: string): string {
//   return DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } });
// }
// utils/sanitizeHtml.ts
import DOMPurify from 'dompurify';

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } });
}
