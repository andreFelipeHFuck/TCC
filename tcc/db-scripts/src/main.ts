import { Client, Databases, RelationshipType } from "node-appwrite";

import { Collection, Relationship } from "./types";

import { createUsersSchema } from "./collections/create-user";
import { createLocationSchema } from "./collections/create-location";
import { createAddress } from "./collections/create-address";
import { createVehicleSchema } from "./collections/create-vehicle";
import { createIdTokenSchema } from "./collections/create-idToken";
import { createChargingSessionSchema } from "./collections/create-chargingSession";
import { createConnectorsSchema } from "./collections/create-connectors";
import { createEnergyTranderSchema } from "./collections/create-energyTranferPeriod";
import { createChargingStationSchema } from "./collections/create-chargingStation";
import { createEnergySchema } from "./collections/create-energy";
import { createFlowHistorySchema } from "./collections/create-flowHisory";

const collections: Collection[] = [
    {
        id: 'users_id',
        name: 'users',
        schemas: [
            createUsersSchema,
            createAddress
        ]
    }, 
    {
        id: 'idTokens_id',
        name: 'idTokens',
        schemas: [
            createIdTokenSchema
        ]
    },
    {
        id: 'connectors_id',
        name: 'connectors',
        schemas: [
            createConnectorsSchema
        ]
    },
    {
        id: 'chargingStations_id',
        name: 'chargingStations',
        schemas: [
            createChargingStationSchema,
            createEnergyTranderSchema
        ]
    },
    {
        id: 'chargingSessions_id',
        name: 'chargingSessions',
        schemas: [
            createChargingSessionSchema,
            createEnergyTranderSchema
        ]
    },
    {
        id: 'energyTranferPeriods_id',
        name: 'energyTranferPeriods',
        schemas: [
            createEnergyTranderSchema
        ]
    },
    {
        id: 'energies_id',
        name: 'energies',
        schemas: [
            createEnergySchema
        ]
    },
    {
        id: 'flowHistorical_id',
        name: 'flowHistorical',
        schemas: [
            createFlowHistorySchema
        ]
    },
    {
        id: 'vehicles_id',
        name: 'vehicles',
        schemas: [
            createVehicleSchema
        ]
    },
    {
        id: 'loactions_id',
        name: 'locations',
        schemas: [
            createLocationSchema,
            createAddress
        ]
    }
];

const relationships: Relationship[] = [
    // One to One
    {
        collectionId: 'chargingSessions_id',
        relationCollectionId: 'energies_id',
        relationType: RelationshipType.OneToOne,
        twoWay: true,
        onDelete: 'cascade'
    },
    {
        collectionId: 'energyTranferPeriods_id',
        relationCollectionId: 'energies_id',
        relationType: RelationshipType.OneToOne,
        twoWay: true,
        onDelete: 'null'
    },

    // One To Many
    {
        collectionId: 'loactions_id',
        relationCollectionId: 'chargingStations_id',
        relationType: RelationshipType.OneToMany,
        twoWay: true,
        onDelete: 'cascade'
    },
    {
        collectionId: 'users_id',
        relationCollectionId: 'idTokens_id',
        relationType: RelationshipType.OneToMany,
        twoWay: true,
        onDelete: 'cascade'
    },
    {
       collectionId: 'idTokens_id',
       relationCollectionId: 'chargingSessions_id',
       relationType: RelationshipType.OneToMany,
       twoWay: true,
       onDelete: 'null'  
    }, 
    {
       collectionId: 'vehicles_id',
       relationCollectionId: 'chargingSessions_id',
       relationType: RelationshipType.OneToMany,
       twoWay: true,
       onDelete: 'null'   
    },
    {
      collectionId: 'connectors_id',
      relationCollectionId: 'chargingSessions_id',
      relationType: RelationshipType.OneToMany,
      twoWay: true,
      onDelete: 'null'     
    },
    {
      collectionId: 'energyTranferPeriods_id',
      relationCollectionId: 'chargingSessions_id',
      relationType: RelationshipType.OneToMany,
      twoWay: true,
      onDelete: 'cascade'
    },
    {
      collectionId: 'energies_id',
      relationCollectionId: 'flowHistorical_id',
      relationType: RelationshipType.OneToMany,
      twoWay: true,
      onDelete: 'null'
    },

    // Mant to Many
    {
      collectionId: 'users_id',
      relationCollectionId: 'vehicles_id',
      relationType: RelationshipType.ManyToMany,
      twoWay: true,
      onDelete: 'null'
    }
    
];

async function waitColection(databases: Databases, databaseId: string, collectionId: string) {
     while (true) {
        try {
             await databases.getCollection(databaseId, collectionId);
             console.info(`[Script] Collection "${collectionId}" disponível`);
            return;
        } catch (error: any) {
            if (error.code !== 404) {
                throw error;
            }
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

async function createSingleCollection(
    databases: Databases, 
    databaseId: string,
    collection: Collection,
) {
    console.log('[Script Create Database] criando a coleção ', collection.name);
    const collectionPromise = await databases.createCollection({
        databaseId: databaseId,
        collectionId: collection.id,
        name: collection.name,
    });

    if (collection) {
        console.info(`[Script Create Database] collection ${collection.name} criado com sucesso`);
    }else{
        console.error(`[Script Create Database] não foi possível criar a collection ${collection.name}`);
    }
 
    await waitColection(databases, databaseId, collection.id);
    await new Promise(resolve => setTimeout(resolve, 500));

    console.info(`[Script Create Database] criando schemas para a collection ${collection.name}`);
    for (const schema of collection.schemas) {
        await schema({
            databases: databases,
            databaseId: databaseId,
            collectionId: collection.id
        });
    }
}

async function createCollections(databases: Databases, databaseId: string, collections: Collection[]) {
    console.log('[Script Create Database] criando as coleções');

    for (const collection of collections) {
        await createSingleCollection(databases, databaseId, collection);
    }
}

async function createSingleRelationship(databases: Databases, databaseId: string, relationship: Relationship) {
    
    console.log(`[Script Create Database] criando a relação ${relationship.relationType} para ${relationship.collectionId} e ${relationship.relationCollectionId}`);
    const RelationshipTypeEnumPromise = await databases.createRelationshipAttribute(
        databaseId,
        relationship.collectionId,
        relationship.relationCollectionId,
        relationship.relationType,
        relationship.twoWay,
        relationship.onDelete
    )

    if (RelationshipTypeEnumPromise) {
        console.info(`[Script Create Database] relação ${relationship.relationType} para ${relationship.collectionId} e ${relationship.relationCollectionId} criada com sucesso`);
    } else {
        console.error(`[Script Create Database] não foi possivel criar o relacionamento`)
    }

    await new Promise(resolve => setTimeout(resolve, 500));
}

async function createRelationships(databases: Databases, databaseId: string, relationships: Relationship[]) {
    console.log('[Script Create Database] criando relações');

    for (const relationship of relationships) {
        await createSingleRelationship(databases, databaseId, relationship);
    }

}

async function waitCreateDatabases(databases: Databases, databaseId: string) {
    while (true) {
        try {
             await databases.get(databaseId);
             console.info(`[Script] Database "${databaseId}" disponível`);
            return;
        } catch (error: any) {
            if (error.code !== 404) {
                throw error;
            }
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

async function main(databaseId: string, databaseName: string) {
    const client = new Client()
    .setEndpoint('http://localhost/v1')
    .setProject('69598d0e0005838fd88f')
    .setKey('standard_49034ff277c651e091373ad13545cca48fee48f9df9d9a2a120b5a648f488c3b15b3a38a5f3d4a174af2c04607e08c15976059ecffdcbb2bdddc486bcbed03dadca78be01fd9c8e1ab67c81584eee817b329212426d2a3db1e7d762016232536ac8b37624bf6b588ba5b9ae89b68117c46ccd3697ab09d150ca9b5eda05e1cc0');
    
    const databases = new Databases(client);
    const appDatabasePromise = await databases.create(databaseId, databaseName);

    if(appDatabasePromise) {
        console.info(`[Script Create Database] database ${databaseName} criado com sucesso`);
    } else {
        console.error(`[Script Create Database] não foi possível criar a database ${databaseName}`);
    }

    await waitCreateDatabases(databases, databaseId);

    await createCollections(databases, databaseId, collections);
    await createRelationships(databases, databaseId, relationships);

}

main('tste-db', 'Teste');
