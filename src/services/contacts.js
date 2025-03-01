import { contactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const data = await contactsCollection.find();
  return data;
};

export const getContactById = async (contactId) => {
  const contact = await contactsCollection.findById(contactId);
  return contact;
};
