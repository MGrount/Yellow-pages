// contact-repository.interface.ts
import { Contact } from '../../contacts/contact';

export interface IContactRepository<T extends Contact> {
  getContacts(contact: T, limit: number, offset: number): Promise<T[]>;
}
