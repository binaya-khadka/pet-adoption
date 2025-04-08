import { User } from "src/types";
import { Users } from ".";

export const fetchAllUsers = async () => {
    try {
        const users = await Users.find();
        return users;
    } catch (error) {
        throw new Error("Error fetching users");
    }
}


export const fetchUserByEmail = async (email: string) => {
    return await Users.findOne({ email: email })
}

export const fetchUserById = async (id: string) => {
    return await Users.findById(id);
}

export const createUser = async (payload: Omit<User, "id" | "createdAt">) => {
    return await Users.create(payload);
}

export const updateUser = async (payload: any) => {
    const { id, ...rest } = payload;
    return await Users.findByIdAndUpdate(id, { ...rest }, { new: true });
}

export const deleteUser = async (id: string) => {
    return await Users.findByIdAndDelete(id);
}