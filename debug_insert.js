import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Read .env file manually
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');

const env = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        env[key.trim()] = value.trim();
    }
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInserts() {
    console.log('Testing INSERT permissions...');

    // Test sell_requests INSERT
    const sellPayload = {
        phone_name: 'Debug Phone',
        year: '2024',
        details: 'Debug test entry',
        specifications: 'Debug specs',
        contact_number: '0000000000',
        status: 'pending' // Matches form default
    };

    console.log('\nAssigning payload to sell_requests:', sellPayload);
    const { data: sellData, error: sellError } = await supabase
        .from('sell_requests')
        .insert([sellPayload])
        .select();

    if (sellError) {
        console.error('❌ INSERT FAILED for sell_requests');
        console.error('Message:', sellError.message);
        console.error('Details:', sellError.details);
        console.error('Hint:', sellError.hint);
        console.error('Code:', sellError.code);
    } else {
        console.log('✅ INSERT SUCCESS for sell_requests');
        // Clean up
        await supabase.from('sell_requests').delete().eq('id', sellData[0].id);
    }

    // Test item_requests INSERT
    const itemPayload = {
        item_name: 'Debug Item',
        details: 'Debug details',
        contact_number: '0000000000',
        status: 'pending'
    };

    console.log('\nAssigning payload to item_requests:', itemPayload);
    const { data: itemData, error: itemError } = await supabase
        .from('item_requests')
        .insert([itemPayload])
        .select();

    if (itemError) {
        console.error('❌ INSERT FAILED for item_requests');
        console.error('Message:', itemError.message);
        console.error('Details:', itemError.details);
        console.error('Hint:', itemError.hint);
        console.error('Code:', itemError.code);
    } else {
        console.log('✅ INSERT SUCCESS for item_requests');
        // Clean up
        await supabase.from('item_requests').delete().eq('id', itemData[0].id);
    }
}

testInserts();
