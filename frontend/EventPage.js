import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function EventPage({ eventId }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const q = query(collection(db, "items"), where("event", "==", eventId));
      const querySnapshot = await getDocs(q);
      setItems(querySnapshot.docs.map(doc => doc.data()));
    };
    fetchItems();
  }, [eventId]);

  return (
    <div>
      <h2>Lost & Found Items</h2>
      {items.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default EventPage;
