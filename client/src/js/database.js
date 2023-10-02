import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('POST into database')

  // creating connection and transaction to database
  const contact_db =  await openDB('contact', 1);

  // specifies privileges to read and write
  const transaction = contact_db.transaction('contact', 'readwrite');
  const store = transaction.objectStore('contact');

  // passes content into request
  const request = store.add({content: content});

  // confirms POST request
  const result = await request;
  console.log("content posted into database!", result)
};

export const getDb = async () => {
  console.log("GET from database");

  // creating connection and transaction to database
  const contact_db =  await openDB('contact', 1);

  // specifies privileges to read only
  const transaction = contact_db.transaction('contact', 'readonly');
  const store = transaction.objectStore('contact');
  const request = store.getAll();

  // confirms the GET request
  const result = await request;
  console.log("content retrieved from database!", result);

  return result
};

initdb();
