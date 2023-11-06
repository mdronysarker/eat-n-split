import { useState } from "react";

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

function Button({ children, handleClick }) {
  return (
    <button onClick={handleClick} className="button">
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriend] = useState(initialFriends);
  const [friendOpen, setFriendOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleClick = () => {
    setFriendOpen((friendOpen) => !friendOpen);
  };

  const handleAddFriend = (friend) => {
    setFriend((friends) => [...friends, friend]);
  };

  const handleSelection = (friend) => {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    // selectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setFriendOpen(false);
  };
  // console.log(selectedFriend);

  const handleSplitBill = (value) => {
    // console.log(value);

    setFriend((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend?.id
          ? {
              ...friend,
              balance: friend.balance + value,
            }
          : friend
      )
    );
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          selectedFriend={selectedFriend}
          friends={friends}
          handleSelection={handleSelection}
        />
        {friendOpen && (
          <FromAddFriend
            setFriendOpen={setFriendOpen}
            onAddFriend={handleAddFriend}
          />
        )}
        <Button handleClick={handleClick}>
          {friendOpen ? "colse" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FromSpiltBill
          onSplitFriend={handleSplitBill}
          setSelectedFriend={setSelectedFriend}
          selectedFriend={selectedFriend}
        />
      )}
    </div>
  );
}

function FriendList({ friends, handleSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((item, i) => (
        <Friend
          selectedFriend={selectedFriend}
          handleSelection={handleSelection}
          friend={item}
          key={i}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, handleSelection, selectedFriend }) {
  const isSelected = friend.id === selectedFriend?.id;
  // console.log(isSelected);
  return (
    <li className={isSelected ? "selected" : ""}>
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
      <Button handleClick={() => handleSelection(friend)}>
        {isSelected ? "colse" : "Select"}
      </Button>
    </li>
  );
}

function FromAddFriend({ onAddFriend, setFriendOpen }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=499476");

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = crypto.randomUUID;
    if (!name || !image) return;

    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    // console.log(newFriend);
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48?u=499476");
    setFriendOpen(false);
  };

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Friends Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Image Url</label>
      <input
        type=" text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FromSpiltBill({ selectedFriend, onSplitFriend, setSelectedFriend }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPayIng, setWhoIsPayIng] = useState("user");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bill || !paidByUser) return;

    onSplitFriend(whoIsPayIng === "user" ? paidByFriend : -paidByUser);
    setSelectedFriend(null);
  };

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split the bill with {selectedFriend.name}</h2>
      <label>Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>Your Expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value > bill ? paidByUser : Number(e.target.value))
          )
        }
      />
      <label>{selectedFriend.name} Expense</label>
      <input type="text" disabled value={paidByFriend} />
      <label>Who is paying the bill</label>
      <select onChange={(e) => setWhoIsPayIng(e.target.value)}>
        <option value="user"> you</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
