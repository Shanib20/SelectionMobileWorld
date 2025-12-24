import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) env[key.trim()] = value.trim();
});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function checkSchema() {
    console.log('Checking schema for tables...');

    // We can't easily query information_schema via JS client on anon key commonly
    // But we can try to insert a dummy row with ALL fields and see if it fails with "column does not exist"

    // 1. Check sell_requests
    const sellPayload = {
        phone_name: 'Schema Check',
        year: '2024',
        details: 'Check',
        specifications: 'Spec',
        contact_number: '123',
        images: [],
        status: 'pending'
    };

    console.log('Attempting full INSERT on sell_requests...');
    const { data, error } = await supabase.from('sell_requests').insert([sellPayload]).select();

    if (error) {
        console.error('❌ Schema mismatch or error on sell_requests:', error.message);
        console.error('Details:', error.details);
        console.error('Hint:', error.hint);
    } else {
        console.log('✅ sell_requests matches expected schema.');
        await supabase.from('sell_requests').delete().eq('id', data[0].id);
    }

    // 2. Check item_requests
    const itemPayload = {
        item_name: 'Schema Check',
        details: 'Check',
        contact_number: '123',
        image_url: 'http://test.com',
        status: 'pending'
    };

    console.log('\nAttempting full INSERT on item_requests...');
    const { data: itemData, error: itemError } = await supabase.from('item_requests').insert([itemPayload]).select();

    if (itemError) {
        console.error('❌ Schema mismatch or error on item_requests:', itemError.message);
        console.error('Details:', itemError.details);
    } else {
        console.log('✅ item_requests matches expected schema.');
        await supabase.from('item_requests').delete().eq('id', itemData[0].id);
    }
}

checkSchema();
