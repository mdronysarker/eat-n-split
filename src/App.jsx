const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
      </div>
    </div>
  );
}

function FriendList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((item) => (
        <Friend friend={item} key={item.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt="image" />
      <h3>{friend.name}</h3>
      {friend.balance > 0 ? (
        <p className="red">
          you owe {friend.name} {friend.balance}
        </p>
      ) : friend.balance === 0 ? (
        <p>You and {friend.name} is even</p>
      ) : (
        <p className="green">
          {friend.name} owes you {friend.balance}
        </p>
      )}
    </li>
  );
}
