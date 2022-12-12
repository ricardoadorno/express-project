import { useEffect, useState } from "react";

// ! Add the change user

export default function Home() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");

  const [changeUserName, setChangeUserName] = useState("");
  const [editUser, setEditUser] = useState(false);

  //fetch data from the server
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/");
      const data = await res.json();
      setUsers(data);
    };
    fetchData();
  }, [setUsers]);

  // create a new user and add it to the users array on the server
  const createUser = async () => {
    // check if the user already exists
    const userExists = users.find((user) => user.name === newUser);
    if (userExists) return alert("User already exists");

    const res = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newUser }),
    });
    const data = await res.json();
    setUsers([...users, data]);
  };

  // increment the score of a user
  const increment = async (name) => {
    const res = await fetch(`http://localhost:5000/${name}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, action: "increment" }),
    });
    const data = await res.json();
    setUsers(data);
  };

  // decrement the score of a user
  const decrement = async (name) => {
    const res = await fetch(`http://localhost:5000/${name}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, action: "decrement" }),
    });
    const data = await res.json();
    setUsers(data);
  };

  // change the name of a user
  const changeName = async (name) => {
    const res = await fetch(`http://localhost:5000/${name}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, action: "changeName" }),
    });
    const data = await res.json();
    setUsers(data);
  };

  return (
    <div>
      <h1>Create User</h1>
      <input
        type="text"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
      />
      <button onClick={createUser}>Create User</button>
      <br />
      <h1>User List</h1>
      {
        // map over the users and display them
        users.map((user) => {
          return (
            <div key={user.name}>
              <h2>{user.name}</h2>
              <p>Score: {user.score}</p>
              <button onClick={() => increment(user.name)}>Increment</button>
              <button onClick={() => decrement(user.name)}>Decrement</button>

              <button onClick={() => setEditUser(!editUser)}>Edit</button>
              {editUser && (
                <div>
                  <input
                    type="text"
                    value={changeUserName}
                    onChange={(e) => setChangeUserName(e.target.value)}
                  />
                  <button onClick={() => changeName(user.name)}>
                    Change Name
                  </button>
                </div>
              )}
            </div>
          );
        })
      }
    </div>
  );
}
