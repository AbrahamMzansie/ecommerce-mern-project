import bycrpt from "bcryptjs";

const Users = [
  {
    name: "Abraham nkomo",
    email: "abraham.mzansie@gmail.com",
    password: bycrpt.hashSync("12345678", 10),
    isAdmin: true,
  },
  {
    name: "Vusa Nkomo",
    email: "vusa.nkomo@gmail.com",
    password: bycrpt.hashSync("12345678", 10),
    isAdmin: false,
  },
  {
    name: "Zibusiso Nkomo",
    email: "zibusiso.nkomo@gmail.com",
    password: bycrpt.hashSync("12345678", 10),
    isAdmin: false,
  },
];

export default Users;
