import { faker } from "@faker-js/faker";

export default function generateUserInformation() {
  return {
    account: {
      title: Math.random() < 0.5 ? "Mr" : "Mrs",
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      day: faker.number.int({ min: 10, max: 30 }).toString(),
      month: faker.date.month(),
      year: faker.number.int({ min: 2000, max: 2020 }).toString(),
      newsletter: faker.datatype.boolean(),
      specialOffer: faker.datatype.boolean(),
    },
    address: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      street: faker.location.streetAddress(),
      country: Math.random() < 0.5 ? "Israel" : "Canada",
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.countryCode(),
      phone: faker.phone.number(),
    },
  };
}
