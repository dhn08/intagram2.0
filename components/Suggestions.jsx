import { faker } from "@faker-js/faker";
import React, { useEffect, useState } from "react";

const Suggestions = () => {
  const [suggetions, setSuggetions] = useState([]);
  useEffect(() => {
    const suggestion = new Array();
    const createRandomUser = () => {
      return {
        id: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        company: faker.company.companyName(),
      };
    };
    Array.from({ length: 5 }).forEach(() => {
      suggestion.push(createRandomUser());
    });
    setSuggetions(suggestion);
  }, []);
  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See all</button>
      </div>

      {suggetions.map((profile) => (
        <div
          key={profile.id}
          className="flex items-center justify-between mt-3"
        >
          <img
            className="w-10 h-10 rounded-full border p-[2px]"
            src={profile.avatar}
            alt="useravatar"
          />
          <div className="flex-1 ml-4">
            <h2 className="font-semibold text-sm">{profile.username}</h2>
            <h3 className="text-xs text-gray-400">
              Works at {profile.company}
            </h3>
          </div>
          <button className="text-blue-400 text-sm font-semibold">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
