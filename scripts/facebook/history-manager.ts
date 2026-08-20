import fs from 'fs';
import path from 'path';

export interface RepliedRecord {
  id: string;
  leadId: string;
  author: string;
  postUrl: string;
  destination: string;
  messageSent: string;
  repliedAt: string;
  status: 'SENT' | 'MANUAL_SENT' | 'SKIPPED';
}

const HISTORY_FILE_PATH = path.join(process.cwd(), 'scripts/facebook/data/replied-history.json');

/**
 * Loads the array of previously addressed posts.
 */
export function loadRepliedHistory(): RepliedRecord[] {
  if (!fs.existsSync(HISTORY_FILE_PATH)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(HISTORY_FILE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Checks if a specific post URL or author combination has already been replied to.
 */
export function isAlreadyReplied(postUrl: string, author: string): boolean {
  const history = loadRepliedHistory();
  const cleanUrl = postUrl.split('?')[0];

  return history.some((h) => {
    const historyCleanUrl = h.postUrl.split('?')[0];
    const isSpecificPostUrl =
      cleanUrl.includes('/posts/') ||
      cleanUrl.includes('/permalink/') ||
      cleanUrl.includes('multi_permalinks=');
    const sameUrl = isSpecificPostUrl && cleanUrl === historyCleanUrl;
    const sameAuthorAndDest =
      author &&
      author !== 'Desconocido' &&
      h.author.toLowerCase() === author.toLowerCase() &&
      new Date(h.repliedAt).getTime() > Date.now() - 48 * 60 * 60 * 1000;

    return sameUrl || sameAuthorAndDest;
  });
}

/**
 * Saves a new record into the history log.
 */
export function saveReplyRecord(record: RepliedRecord): void {
  const history = loadRepliedHistory();
  history.push(record);

  const dataDir = path.dirname(HISTORY_FILE_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(HISTORY_FILE_PATH, JSON.stringify(history, null, 2), 'utf-8');
}
