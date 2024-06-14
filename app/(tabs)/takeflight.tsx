import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import {Suspense, useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {fetchAirports, fetchFrequencies, fetchRunways, migrateDbIfNeeded} from "@/db/database";




function Fallback() {
    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
        </View>
    );
}

export default function App() {
    return (
        <View style={styles.container}>
            <Suspense fallback={<Fallback />}>
                <SQLiteProvider databaseName="airports.db" onInit={migrateDbIfNeeded} useSuspense>
                    <Text style={styles.headerText}>SQLite Example</Text>
                    <Content />
                </SQLiteProvider>
            </Suspense>
        </View>
    );
}


function Content() {
    const db = useSQLiteContext();
    const [airports, setAirports] = useState([]);
    const [runways, setRunways] = useState([]);
    const [frequencies, setFrequencies] = useState([]);

    useEffect(() => {
        async function setup() {
            const airportsResult = await fetchAirports(db);
            setAirports(airportsResult);

            const runwaysResult = await fetchRunways(db);
            setRunways(runwaysResult);

            const frequenciesResult = await fetchFrequencies(db);
            setFrequencies(frequenciesResult);
        }
        setup();
    }, []);

    return (
        <View style={styles.contentContainer}>
            <Text>Airports:</Text>
            {airports.map((airport, index) => (
                <View key={index}>
                    <Text>{`${airport.id} - ${airport.name}`}</Text>
                </View>
            ))}

            <Text>Runways:</Text>
            {runways.map((runway, index) => (
                <View key={index}>
                    <Text>{`${runway.id} - ${runway.designator}`}</Text>
                </View>
            ))}

            <Text>Frequencies:</Text>
            {frequencies.map((frequency, index) => (
                <View key={index}>
                    <Text>{`${frequency.id} - ${frequency.value}`}</Text>
                </View>
            ))}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        padding: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contentContainer: {
        padding: 20,
    },
    todoItemContainer: {
        marginBottom: 10,
    },
});
