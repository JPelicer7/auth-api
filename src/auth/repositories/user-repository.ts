import { User } from "@prisma/client";


export interface CreateUserData {
    name: string,
    email: string,
    password: string
}

export interface UpdateUserData {
  name?: string;   
  email?: string;
}

export abstract class UserRepository {
    abstract create(attributes: CreateUserData ): Promise<User>
    abstract findByEmail(email: string): Promise<User | null>
    abstract findById(id: number): Promise<User | null>
    abstract update(id: number, attributes: UpdateUserData): Promise<User | null>
    abstract delete(userId: number): Promise<User | null>
}