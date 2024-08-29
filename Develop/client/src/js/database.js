import { openDB } from 'idb';

const initdb = async () => {
  console.log('Initializing database...');
  try {
    const db = await openDB('jate', 1, {
      upgrade(db) {
        if (db.objectStoreNames.contains('jate')) {
          console.log('jate database already exists');
          return;
        }
        db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
        console.log('jate database created');
      },
    });
    console.log('Database initialized successfully');
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export const putDb = async (content) => {
  console.log('PUT to the database');
  try {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ id: 1, content }); 
    const result = await request;
    console.log('Data saved to the database', result);
    return result;
  } catch (error) {
    console.error('Error putting data into the database:', error);
  }
};

export const getDb = async () => {
  console.log('GET from the database');
  try {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.get(1); 
    const result = await request;
    console.log('Data retrieved from the database:', result);
    return result?.content;
  } catch (error) {
    console.error('Error getting data from the database:', error);
  }
};

initdb();