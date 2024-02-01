// contact-repository.ts
import { IContactRepository } from './repository-interface/contact-repository-interface';
import { Contact } from '../contacts/contact';
import { DbClient } from './db-client';

export class ContactRepository<T extends Contact> implements IContactRepository<T> {

    async getContacts<T extends Contact>(contact: T, limit: number = 10, offset: number = 0): Promise<T[]> {
        try {
            const queryText = this.buildQuery(contact, limit, offset);
            const queryParams = this.buildQueryParams(contact);

            console.log(queryText);
            console.log(queryParams);

            const { rows } = await DbClient.query(queryText, queryParams);

            return rows;
        } catch (error) {
            // Handle the error (e.g., log it, throw a custom error, etc.)
            console.error('Error executing query:', error);
            throw new Error('Failed to retrieve contacts.');
        }
    }

    private buildQuery<T extends Contact>(contact: T, limit: number, offset: number): string {
        const conditions = [];
        const queryParams = [];
        let orderBy = '';

        if (contact.name) {
            const names = contact.name.split(' ').map(name => `%${name}%`);
            const nameConditions = names.map((name, index) => `name ILIKE $${queryParams.length + index + 1}`).join(' AND ');

            conditions.push(`(${nameConditions})`);
            queryParams.push(...names);
            orderBy = 'name DESC';
        }

        if (contact.birthday) {
            const year = contact.birthday;
            conditions.push(`EXTRACT(YEAR FROM birthday) = $${queryParams.length + 1}`);
            queryParams.push(year);
        }

        if (contact.phone_number) {
            const processedPhoneNumber = this.preprocessPhoneNumber(contact.phone_number);
            conditions.push(`phone_number = $${queryParams.length + 1}`);
            queryParams.push(processedPhoneNumber);
        }

        if (conditions.length === 0) {
            // No conditions provided, return a query that selects all
            return `SELECT * FROM contacts LIMIT ${limit} OFFSET ${offset}`;
        }

        // Combine all conditions with AND
        const combinedCondition = conditions.join(' AND ');
        const queryWithOrderBy = `SELECT * FROM contacts WHERE ${combinedCondition} ORDER BY ${orderBy} LIMIT ${limit} OFFSET ${offset}`;

        return queryWithOrderBy;
    }


    private buildQueryParams<T extends Contact>(contact: T): any[] {
        const params = [];

        if (contact.name) {
            const names = contact.name.split(' ').map(name => `%${name}%`);
            params.push(...names);
        }

        if (contact.birthday) {
            params.push(contact.birthday);
        }

        if (contact.phone_number) {
            const processedPhoneNumber = this.preprocessPhoneNumber(contact.phone_number);
            params.push(processedPhoneNumber);
        }

        return params;
    }


    private preprocessPhoneNumber(phoneNumber: string): string {
        // Extract digits from the phone number
        const digitsOnly = phoneNumber.replace(/\D/g, '');

        // Format the digits as (XXX) XXXXXXX
        return `(${digitsOnly.substring(0, 3)}) ${digitsOnly.substring(3, 6)}${digitsOnly.substring(6)}`;
    }

}
