-- Create the contacts table
CREATE TABLE IF NOT EXISTS contacts (
    _id VARCHAR(24) PRIMARY KEY,
    picture VARCHAR(255),
    birthday TIMESTAMP WITH TIME ZONE,
    name VARCHAR(255),
    address VARCHAR(255),
    phone_number VARCHAR(15)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_name ON contacts(name);
CREATE INDEX IF NOT EXISTS idx_birthday ON contacts(birthday);
CREATE INDEX IF NOT EXISTS idx_phone_number ON contacts(phone_number);
CREATE INDEX IF NOT EXISTS idx_name_partial ON contacts (name) WHERE name IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_name_birthday ON contacts (name, birthday);
CREATE INDEX IF NOT EXISTS idx_name_phone ON contacts (name, phone_number);

-- Load data from the contacts.json file into the contacts table
DO $$ 
DECLARE
    contact_data JSONB;
    contact_record JSONB;
BEGIN
    contact_data := pg_read_file('/data/contacts.json')::JSONB;
    
    FOR contact_record IN SELECT * FROM jsonb_array_elements(contact_data)
    LOOP
        INSERT INTO contacts (
            _id,
            picture,
            birthday,
            name,
            address,
            phone_number
        ) VALUES (
            (contact_record->>'_id')::VARCHAR(24),
            contact_record->>'picture',
            (contact_record->>'birthday')::TIMESTAMP WITH TIME ZONE,
            contact_record->>'name',
            contact_record->>'address',
            contact_record->>'phone_number'
        );
    END LOOP;
END $$;
