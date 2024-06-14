import * as SQLite from 'expo-sqlite';

export async function migrateDbIfNeeded(db: SQLite.SQLiteDatabase) {
    const DATABASE_VERSION = 1;
    let { user_version: currentDbVersion } = await db.getFirstAsync('PRAGMA user_version');
    if (currentDbVersion >= DATABASE_VERSION) {
        return;
    }
    if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE airports (
        id TEXT PRIMARY KEY NOT NULL, 
        name TEXT,
        icaoCode TEXT,
        country TEXT,
        latitude REAL,
        longitude REAL
      );
      CREATE TABLE IF NOT EXISTS runways (
        id TEXT PRIMARY KEY NOT NULL,
        airportId TEXT,
        designator TEXT,
        trueHeading INTEGER,
        alignedTrueNorth BOOLEAN,
        FOREIGN KEY (airportId) REFERENCES airports(id)
    );
    CREATE TABLE IF NOT EXISTS frequencies (
        id TEXT PRIMARY KEY NOT NULL,
        airportId TEXT,
        value TEXT,
        type INTEGER,
        FOREIGN KEY (airportId) REFERENCES airports(id)
    );
    `);
        await db.runAsync(`
        INSERT INTO airports (id, name, icaoCode, country, latitude, longitude) 
        VALUES (?, ?, ?, ?, ?, ?)`,
            '1', 'Test Airport', 'TST', 'Test Country', 50.123, 10.456
        );

        // Insert data into the runways table
        await db.runAsync(`
        INSERT INTO runways (id, airportId, designator, trueHeading, alignedTrueNorth) 
        VALUES (?, ?, ?, ?, ?)`,
            '1', '1', '09L', 90, true
        );

        // Insert data into the frequencies table
        await db.runAsync(`
        INSERT INTO frequencies (id, airportId, value, type) 
        VALUES (?, ?, ?, ?)`,
            '1', '1', '123.45', 1
        );
        currentDbVersion = 1;
    }
    const setUserVersionResult = await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    console.log('set user_version, result:', setUserVersionResult);
}

export async function fetchAirports(db: SQLite.SQLiteDatabase) {
    const result = await db.getAllAsync('SELECT * FROM airports');
    return result;
}

export async function fetchRunways(db: SQLite.SQLiteDatabase) {
    const result = await db.getAllAsync('SELECT * FROM runways');
    return result;
}

export async function fetchFrequencies(db: SQLite.SQLiteDatabase) {
    const result = await db.getAllAsync('SELECT * FROM frequencies');
    return result;
}