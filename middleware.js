import { NextResponse } from 'next/server';
import config from './config';
import apiFetch from './functions/apiFetch';
import getAuthHeaders from './functions/getAuthHeaders';


export async function middleware(req, event) {
    // Prevent users that aren't signed in from accessing certain protected pages
    if (req.nextUrl.pathname === '/' || req.nextUrl.pathname === '/create') {
        try {
            let response = await apiFetch("/user/session", {
                headers: getAuthHeaders(req)
            });
            if (response.status !== 200) {
                throw("Unauthorized");
            }
            else {
                return NextResponse.next();
            }
        }
        catch (err) {
            console.log(err);
            return NextResponse.redirect(`${config.FRONT_END_URL}/signin`);
        }
    }
    else {
        return NextResponse.next();
    }
}