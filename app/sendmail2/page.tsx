"use client";

import { sendEmail } from "../actions/actions";
export default function Page() {
  return (
    <>
      <form action={sendEmail}>
        <input className="text-black" type="text" name="name" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
