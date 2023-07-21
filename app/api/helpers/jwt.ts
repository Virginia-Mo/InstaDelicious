import { getToken } from "next-auth/jwt"
import { verifyJwt } from '@/lib/jwt'

export async function handleToken(req : Request){
    const secret = process.env.NEXTAUTH_SECRET
console.log("herehe", req.headers.get('Authorization'))
    const token = req.headers.get('Authorization');
    const filteredToken = token?.replace(/^Bearer\s/, '');
    // const ddbToken = await getToken({ req, secret })
    const allowed = verifyJwt(filteredToken)
    console.log("This token ", allowed)
    return allowed
}