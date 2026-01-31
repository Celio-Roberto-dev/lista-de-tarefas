import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs";

type User = {
    id   : string
    email: string
    name : string
}

export async function findUserByCredentials(email: string, password: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
        where: {email}
    });

    if(!user) {
        console.log("❌ Usuário não encontrado:", email)
        return null
    }

    console.log("📧 EMAIL:", email)
    console.log("🔑 SENHA DIGITADA:", password)
    console.log("🧱 HASH NO BANCO:", user.password)

    const passwordMatch = await bcrypt.compare(password, user.password)

    console.log("✅ PASSWORD MATCH:", passwordMatch)

    if(passwordMatch) {
        return {id: String(user.id), name: user.name, email: user.email} //user
    }

    return null

}