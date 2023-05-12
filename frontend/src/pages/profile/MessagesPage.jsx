import React from "react";
import { useLoaderData, json } from "react-router-dom";
import MessagesLayout from "../../components/MessagesLayout";
import { Container } from "react-bootstrap";

const MessagesPage = () => {
  const data = useLoaderData();

  // 0 - rooms objects array
  // 1 - is the other username for each room
  // 2 is my own username
  const rooms = data[0];
  const otherUsername = data[1];
  const ownUsername = data[2];

  return (
    <Container>
      <MessagesLayout
        rooms={rooms}
        otherUsername={otherUsername}
        ownUsername={ownUsername}
      />
    </Container>
  );
};

export default MessagesPage;

export const loader = async ({ request, params }) => {
  let responseData = [];

  // fetch the id of the currently logged in user
  const userResponse = await fetch("http://localhost:3000/account/id/0");

  if (!userResponse.ok) {
    if (userResponse.status === 401) {
      return redirect("/");
    }

    // 428 is returned if username is not set
    if (userResponse.status === 428) {
      return redirect("/username");
    }

    return json(
      { message: "Could not fetch data from backend." },
      { status: 500 }
    );
  }

  const user = await userResponse.json();

  // get all of the current user's rooms -> array of room ids

  const roomsResponse = await fetch("http://localhost:3000/chat/rooms");

  if (!roomsResponse.ok) {
    return json(
      { message: "Could not fetch rooms from the backend" },
      { status: 500 }
    );
  }

  const rooms = await roomsResponse.json();

  // get the account username of the other person for each room
  const loggedInUsername = user.username;
  const loggedInId = user._id;

  let usernamesPromises = rooms.rooms.map(async (room) => {
    let accountIds = [];
    accountIds.push(room.account1);
    accountIds.push(room.account2);

    const otherId = accountIds.find((id) => id !== loggedInId);

    // use the id to get the other users username
    const otherUserResponse = await fetch(
      "http://localhost:3000/account/id/" + otherId
    );

    if (!otherUserResponse.ok) {
      return json(
        { message: "Could not fetch account from rest api" },
        { status: 500 }
      );
    }

    const otherUser = await otherUserResponse.json();

    const otherUsersName = otherUser.username;

    const otherusername = {
      roomId: room._id,
      otherUsername: otherUsersName,
      otherId: otherId
    };

    return otherusername;
  });

  let usernames = await Promise.all(usernamesPromises);

  // return the data as an array
  // 0 - rooms objects array
  // 1 - is the other username for each room
  // 2 is my own username

  responseData.push(rooms.rooms);
  responseData.push(usernames);
  responseData.push({
    loggedInUsername: loggedInUsername,
    loggedInId: loggedInId,
  });

  return responseData;
};
