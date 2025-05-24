import React, { createContext, useContext } from "react";
import type { SQLiteDatabase } from "expo-sqlite";
import { drizzle as drizzleORM } from "drizzle-orm/expo-sqlite";
import * as schema from "../db/schema"; 

const DatabaseContext = createContext<ReturnType<typeof drizzleORM> | null>(null);

export const useDrizzle = () => {
    const ctx = useContext(DatabaseContext);
    if (!ctx) throw new Error("Drizzle context not initialized");
    return ctx;
};

export const DatabaseProvider = ({ db, children }: { db: SQLiteDatabase; children: React.ReactNode }) => {
    const drizzleDb = drizzleORM(db, { schema });
    return <DatabaseContext.Provider value={drizzleDb}>{children}</DatabaseContext.Provider>;
};