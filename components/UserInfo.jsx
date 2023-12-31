"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Button from '@mui/material/Button';


export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className="grid place-items-center h-50">
      <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
        <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        <Button
          variant="outlined"
          color='error'
          onClick={() => signOut()}>
          Log Out
        </Button>
      </div>
    </div >
  );
}
