import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService } from "myBase";
import React, { useState } from "react";

const Nweet = ({ nweet, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweet.text);
  const onDeleteClick = () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      deleteDoc(doc(dbService, `nweets/${nweet.id}`));
    } else {
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(nweet, newNweet);
    updateDoc(doc(dbService, `nweets/${nweet.id}`), { text: newNweet });
    setEditing(false);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };
  return (
    <div>
      {editing ? (
        <React.Fragment>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </React.Fragment>
      ) : (
        <div key={nweet.id}>
          <h3>{nweet.text}</h3>
          {isOwner && (
            <React.Fragment>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  );
};

export default Nweet;
