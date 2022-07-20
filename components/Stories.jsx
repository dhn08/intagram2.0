import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";
import { useSession } from "next-auth/react";
const Stories = () => {
  const [suggetions, setSuggetions] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    const suggestion = new Array();
    const createRandomUser = () => {
      return {
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
      };
    };
    Array.from({ length: 20 }).forEach(() => {
      suggestion.push(createRandomUser());
    });
    setSuggetions(suggestion);
  }, []);
  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border border-gray-200 rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
      {session && (
        <>
          <Story img={session.user.image} username={session.user.username} />
        </>
      )}
      {suggetions.map((profile) => (
        <Story
          key={profile.userId}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
      {/* Story */}
      {/* Story */}
      {/* Story */}
      {/* Story */}
      {/* Story */}
    </div>
  );
};

export default Stories;
