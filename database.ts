import { Database } from "bun:sqlite";
import { Message } from "./types/Message";

const db: Database = new Database("database.sqlite");

export function init() {
    db.run("CREATE TABLE IF NOT EXISTS messages (message TEXT, author TEXT, date INTEGER, recipient TEXT)");
}

export function addMessage(message: Message) {
    db.run("INSERT INTO messages (message, author, date, recipient) VALUES ($message, $author, $date, $recipient)", 
        [ message.message,
            message.author,
            message.date.getTime(),
            message.recipient
        ]);
}

export function getMessages(author: string, recipient: string) {
    return db.query("SELECT * FROM messages WHERE author = $author AND recipient = $recipient").get({
        $author: author,
        $recipient: recipient
    });
}

export function getAllMessages(): Message[] {
    return db.query("SELECT * FROM messages").all() as Message[];
}

/*
const insert = db.prepare("INSERT INTO cats (name) VALUES ($name)");
const insertCats = db.transaction(cats => {
  for (const cat of cats) insert.run(cat);
  return cats.length;
});

const count = insertCats([
  { $name: "Keanu" },
  { $name: "Salem" },
  { $name: "Crookshanks" },
]);

console.log(`Inserted ${count} cats`);*/