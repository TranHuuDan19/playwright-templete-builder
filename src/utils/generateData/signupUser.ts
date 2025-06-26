import { faker } from "@faker-js/faker";
import fs from "fs";

export default function generateUsers() {
  const users = {
    account: {
      title: "Mr",
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      day: "9",
      month: "September",
      year: "2019",
      newsletter: false,
      specialOffer: true,
    },
    address: {
      firstName: "Tester",
      lastName: "2025",
      street: "Main St",
      country: "Canada",
      state: "ON",
      city: "HCM",
      zipcode: "70000",
      phone: "123123123",
    },
  };

  return users;
}

const data = { users: generateUsers() };

fs.writeFileSync("src/data/signupUser.json", JSON.stringify(data, null, 2));
console.log("✅ signupUser.json created!");
