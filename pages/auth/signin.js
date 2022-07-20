import { getProviders, signIn } from "next-auth/react";

import React from "react";
import Header from "../../components/Header";

const signin = ({ providers }) => {
  return (
    <>
      <Header />
      <div className="flex  flex-col  items-center justify-center min-h-screen py-2 -mt-36 px-1  text-center">
        <img
          className="w-80"
          src="https://res.cloudinary.com/dplljbrim/image/upload/v1658082960/project%20photos/Instagram_logo.svg_uzhykr.png"
          alt="instalogo"
        />
        <p className="text-xs italic">
          This is not a real app , it is built just for education
        </p>
        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-blue-500 rounded-lg text-white"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default signin;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
