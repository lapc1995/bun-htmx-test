import { Database } from "bun:sqlite";
import { Message } from "./types/Message";

const db: Database = new Database("database.sqlite");

export function init() {
    db.run("CREATE TABLE IF NOT EXISTS messages (message TEXT, author TEXT, date INTEGER, room TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS users (name TEXT, password TEXT, email TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS rooms (name TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS user_rooms (user TEXT, room TEXT)");
}

export function addMessage(message: Message) {
    db.run("INSERT INTO messages (message, user, date, room) VALUES ($message, $user, $date, $room)", 
        [ message.message,
            message.user,
            message.date.getTime(),
            message.room
        ]);
}

export function getMessages(user: string, room: string) {
    return db.query("SELECT * FROM messages WHERE user = $user AND room = $room").get({
        $author: user,
        $room: room
    });
}

export function getAllMessages(): Message[] {
    return db.query("SELECT * FROM messages").all() as Message[];
}

export function addUser(email: string, name: string, password: string) {
    db.run("INSERT INTO users (email, name, password) VALUES ($email, $name, $password)", [
        email,
        name,
        password
    ]);
}

export function getUser(email: string) {
    return db.query("SELECT * FROM users WHERE email = $email").get({
        $email: email
    });
}

export function getAllUsers() {
    return db.query("SELECT * FROM users").all();
}