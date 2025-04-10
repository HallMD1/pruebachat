import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../contexts/AuthContext";
import Message from "./Message";

export default function ChatRoom() {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const msgRef = useRef();
  const bottomRef = useRef();
  const audioRef = useRef(new Audio("/notification.mp3"));

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      audioRef.current.play();
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    return unsubscribe;
  }, []);

  async function sendMessage(e) {
    e.preventDefault();
    if (!msgRef.current.value.trim()) return;
    await addDoc(collection(db, "messages"), {
      text: msgRef.current.value,
      uid: currentUser.uid,
      email: currentUser.email,
      createdAt: serverTimestamp(),
    });
    msgRef.current.value = "";
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m) => (
          <Message key={m.id} message={m} own={m.uid === currentUser.uid} />
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={sendMessage} className="p-4 flex gap-2 border-t">
        <input ref={msgRef} className="flex-1 border rounded p-2" placeholder="Escribe un mensaje…" />
        <button className="px-4 rounded bg-green-600 text-white">Enviar</button>
      </form>
    </div>
  );
}
