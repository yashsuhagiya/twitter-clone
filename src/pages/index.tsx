import Head from "next/head";
import { api } from "~/utils/api";
import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { NextPage } from "next";

const CreatePostWizard = () => {

  const { user } = useUser();

  console.log(user);

  if(!user) return null;

  return (
  <div className="flex gap-3 w-full">
    <img src="{user.profileImageUrl}" alt="profile image" className="h-14 w-14 rounded-full" />
    <input placeholder="Type some emojis!" className="grow bg-transparent outline-none" />
  </div>
  );
}


const Home: NextPage = () => {
  
  const user = useUser();

  const {data, isLoading} = api.posts.getAll.useQuery();

  if(isLoading) return <div> Loading...</div>
  if(!data) return <div>Something went wrong!</div>

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
       <div className="h-full w-full border-slate-400 md:max-w-2xl border-x">
         <div className="flex border-b border-slate-400 p-4">
          {!user.isSignedIn && (
          <div className="flex justify-center">
            <SignInButton />
            </div>
          )}
          {user.isSignedIn && <CreatePostWizard />}
       </div>
        <div className="flex flex-col">
          {[...data, ...data]?.map((post) => (
            <div key={post.id} className="p-8 border-b border-slate-400">{post.content}</div>))}
        </div>
        </div>
      </main>
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </>
  );
}

export default Home;
