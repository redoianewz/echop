'use client';
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

const Page = () => {
  const [uuid, setUuid] = useState("");

  useEffect(() => {
    const storedUuid = localStorage.getItem("deviceUuid");
    if (storedUuid) {
      setUuid(storedUuid);
    } else {
      const newUuid = uuidv4();
      setUuid(newUuid);
      localStorage.setItem("deviceUuid", newUuid);
    }
  }, []); 

  return (
    <div>
      <h1>Page</h1>
      <p>UUID: {uuid}</p>
   
    </div>
  );
};

export default Page;
