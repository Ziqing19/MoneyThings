import React from "react";

export default function Logout() {
  async function handleClick() {
    document.cookie = "_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    const resRaw = await fetch("/user/logout");
    if (!resRaw.ok) {
      const res = await resRaw.text();
      alert(res);
    } else {
      window.location = "/auth/login";
    }
  }

  return (
    <button className="btn btn-danger" onClick={handleClick}>
      Log out
    </button>
  );
}
