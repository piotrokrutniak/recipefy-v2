import { User } from "@prisma/client";

export type UpdateUserDto = Partial<Omit<User, "id">>;