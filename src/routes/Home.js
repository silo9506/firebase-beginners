import { dbService } from "myBase";
import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";
import Nweet from "components/Nweet";
const Home = ({ userObj }) => {
  const [nweet, setNeweet] = useState("");
  const [nweets, setNeweets] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    // console.log(data);
    setNeweet("");
  };

  const onChange = (e) => {
    setNeweet(e.target.value);
  };

  // const getNweets = async () => {
  //   const dbnweet = await getDocs(collection(dbService, "nweets"));
  //   // console.log(dbnweet);
  //   dbnweet.forEach((doc) => {
  //     const nweetsObj = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };
  //     console.log(nweetsObj);
  //     setNeweets((prev) => [nweetsObj, ...prev]);
  //   });
  // };

  useEffect(() => {
    // getNweets();
    onSnapshot(collection(dbService, "nweets"), (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNeweets(nweetArray);
    });
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="what's on your mind?"
          maxLength={120}
          onChange={onChange}
          value={nweet}
        />
        <input type="submit" value="nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweet={nweet}
            isOwner={userObj.uid === nweet.creatorId}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
