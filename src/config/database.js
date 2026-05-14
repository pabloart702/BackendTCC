import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const file = './src/data/db.json';

const defaultData = { users: [], salas: [], arCondicionados: [] };
const adapter = new JSONFile(file);
const db = new Low(adapter, defaultData);
await db.read();
export default db;