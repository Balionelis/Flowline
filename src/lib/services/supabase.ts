import { createClient } from '@supabase/supabase-js';
import type { Database } from '$lib/types/database';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!import.meta.env.PUBLIC_SUPABASE_URL || !import.meta.env.PUBLIC_SUPABASE_ANON_KEY) {
	console.warn(
		'Missing Supabase environment variables. Make sure PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY are set in your .env file.',
		'Current values:',
		{
			PUBLIC_SUPABASE_URL: import.meta.env.PUBLIC_SUPABASE_URL,
			PUBLIC_SUPABASE_ANON_KEY: import.meta.env.PUBLIC_SUPABASE_ANON_KEY ? '[PRESENT]' : '[MISSING]'
		}
	);
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export const signUp = async (email: string, password: string) => {
	return await supabase.auth.signUp({
		email,
		password
	});
};

export const signIn = async (email: string, password: string) => {
	return await supabase.auth.signInWithPassword({
		email,
		password
	});
};

export const signOut = async () => {
	return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
	return await supabase.auth.getUser();
};

export const onAuthStateChange = (callback: Function) => {
	return supabase.auth.onAuthStateChange((event, session) => {
		callback(event, session);
	});
};
