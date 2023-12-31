import { getToken } from "next-auth/jwt"
import { verifyJwt } from '@/lib/jwt'

export async function handleToken(req : Request){
    const secret = process.env.NEXTAUTH_SECRET

    const token = req.headers.get('Authorization');
    const filteredToken = token?.replace(/^Bearer\s/, '');
    // const ddbToken = await getToken({ req, secret })
    
    const allowed = verifyJwt(filteredToken as string)
    return allowed
}