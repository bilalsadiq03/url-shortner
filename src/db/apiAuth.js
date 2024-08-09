import supabase from "./supabse";

export function login({email, password}) {
    const {data, error} = supabase.auth.signInWithPassword({
        email, 
        password,
    })

    if (error) throw new Error(error.message);

    return data;
}