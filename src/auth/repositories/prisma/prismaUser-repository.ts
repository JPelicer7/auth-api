import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserData, UpdateUserData, UserRepository } from "../user-repository";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

@Injectable()
export class prismaUserRepository implements UserRepository {
    constructor(private prisma: PrismaService) {}

    async create(attributes: CreateUserData): Promise<User> {
        const newUser = await this.prisma.user.create({
            data: attributes
        })
        return newUser
    }

    async findByEmail(email : string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        })
        return user
    }

    async findById(id: number): Promise<User | null> {
        const user = await this.prisma.user.findFirst({
            where: {
                id
            }
        })
        return user
    }

    async update(id: number, attributes: UpdateUserData) {
        const updatedUser = await this.prisma.user.update({
            where: {id: id},
            data: {...attributes}
        })

        return updatedUser;
    }

    async delete(userId: number): Promise<User | null> {
        const user = await this.prisma.user.delete({
            where: {
                id: userId
            }
        })
        return user
    }


} 