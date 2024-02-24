import { pgTable, serial, text, varchar} from 'drizzle-orm/pg-core';
export const users =  pgTable("users",{
    id: serial("id").primaryKey(),
    fullName:text("full name"),
    phone:varchar("phone",{length:256}),
    address:varchar("address",{length:256}),
});