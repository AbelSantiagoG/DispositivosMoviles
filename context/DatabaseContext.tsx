import React, { createContext, useContext } from "react";
import type { SQLiteDatabase } from "expo-sqlite";
import { drizzle as drizzleORM } from "drizzle-orm/expo-sqlite";
import * as schema from "../db/schema"; 

interface DatabaseContextType {
    db: ReturnType<typeof drizzleORM>;
    isInitialized: boolean;
}

const DatabaseContext = createContext<DatabaseContextType | null>(null);

export const useDrizzle = () => {
    const ctx = useContext(DatabaseContext);
    if (!ctx) throw new Error("Drizzle context not initialized");
    return ctx.db;
};

export const DatabaseProvider = ({ db, children }: { db: SQLiteDatabase; children: React.ReactNode }) => {
    const drizzleDb = drizzleORM(db, { schema });
    const value = {
        db: drizzleDb,
        isInitialized: true
    };
    
    return (
        <DatabaseContext.Provider value={value}>
            {children}
        </DatabaseContext.Provider>
    );
};