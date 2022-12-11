import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  //fetch data from the server
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/");
      const data = await res.json();
      setUsers(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      {
        // map over the users and display them
        users.map((user) => {
          return (
            <div key={user.name}>
              <h2>{user.name}</h2>
              <h3>{user.age}</h3>
            </div>
          );
        })
      }
    </div>
  );
}
