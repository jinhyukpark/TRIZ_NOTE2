import 'react-native-url-polyfill/auto';
import { createClient, processLock } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

// Chunk sessions for Keychain small-value compatibility; commit the index last.
const storage = {
  async getItem(key: string) {
    const meta = await SecureStore.getItemAsync(key);
    if (!meta) return null;
    const { count, version } = JSON.parse(meta);
    if (!Number.isInteger(count) || count < 1 || count > 100) return null;
    const parts = await Promise.all(Array.from({ length: count }, (_, i) => SecureStore.getItemAsync(`${key}.${version}.${i}`)));
    return parts.some(p => p === null) ? null : parts.join('');
  },
  async setItem(key: string, value: string) {
    const old = await SecureStore.getItemAsync(key);
    const version = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const chunks = value.match(/[\s\S]{1,500}/g) ?? [''];
    for (let i = 0; i < chunks.length; i++) await SecureStore.setItemAsync(`${key}.${version}.${i}`, chunks[i]);
    await SecureStore.setItemAsync(key, JSON.stringify({ count: chunks.length, version }));
    if (old) { const prior = JSON.parse(old); for (let i = 0; i < prior.count; i++) await SecureStore.deleteItemAsync(`${key}.${prior.version}.${i}`); }
  },
  async removeItem(key: string) {
    const old = await SecureStore.getItemAsync(key);
    await SecureStore.deleteItemAsync(key);
    if (old) { const prior = JSON.parse(old); for (let i = 0; i < prior.count; i++) await SecureStore.deleteItemAsync(`${key}.${prior.version}.${i}`); }
  },
};
const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) throw new Error('Supabase configuration missing. See .env.example.');
export const supabase = createClient(url, key, {
  auth: { storage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false, flowType: 'pkce', lock: processLock },
});
