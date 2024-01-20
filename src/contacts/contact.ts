// contact.ts
// Interface representing the structure of a contact
export interface Contact {
    name?: string;
    birthday?: string;
    phone_number?: string;
    picture?: string;
    address?: string;
}

export interface ContactProcessorResult<T> {
    success: boolean;
    data?: T[];
    error?: string;
  }
