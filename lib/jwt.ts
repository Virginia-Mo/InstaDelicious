import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
    expiresIn: string | number
}

const DEFAULT_SIGN_OPTIONS: SignOption = {
    expiresIn: '1h'
}

export function signJwtAccess(payload: JwtPayload, options: SignOption = DEFAULT_SIGN_OPTIONS){
    const secret_key = process.env.SECRET_KEY
    const token = jwt.sign(payload, secret_key!, options)
    return token
}

export function verifyJwt(token:string){
    try {
        const secret_key = process.env.SECRET_KEY
        const decoded = jwt.verify(token, secret_key!)
        return decoded as JwtPayload
    } catch (error) {
        return null
    }
}