async function getUser() {
  const resRaw = await fetch("/user/get-user");
  if (resRaw.status !== 204) {
    return await resRaw.json();
  }
}

export { getUser };
