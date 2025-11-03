import bcrypt from "bcryptjs";

const plain = "123456";
const hash = "$2a$10$eBPhDdVax/sK6wH5rxmTgO6j63DpB.bZ3zTkVxD6v4dV5T0s7F4cW";

const ok = await bcrypt.compare(plain, hash);
console.log("compare result =", ok);
