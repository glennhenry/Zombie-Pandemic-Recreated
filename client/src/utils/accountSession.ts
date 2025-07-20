// utils/accountSession.ts
import { Account } from "../core/types/Account";

const COOKIE_KEY = "zp_account";

export function saveAccountToCookie(account: Account) {
  document.cookie = `${COOKIE_KEY}=${encodeURIComponent(JSON.stringify(account))}; path=/; max-age=31536000`; // 1 year
}

export function clearAccountCookie() {
  document.cookie = `${COOKIE_KEY}=; path=/; max-age=0`;
}

export function getAccountFromCookie(): Account | null {
  const match = document.cookie.match(new RegExp(`${COOKIE_KEY}=([^;]+)`));
  if (!match) return null;

  try {
    return Account.fromJSON(JSON.parse(decodeURIComponent(match[1])));
  } catch {
    return null;
  }
}
