const res = await fetch("http://localhost:4000/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ identifier: "admin", password: "123456" }),
});
console.log(res.status, await res.text());
