import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.80.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface REMACompany {
  name: string;
  registration_number: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  mine_location_lat?: number;
  mine_location_lng?: number;
  certification_status: string;
  certification_start_date: string;
  certification_end_date: string;
  regional_compliance: {
    AU: boolean;
    REMA: boolean;
    ICGLR: boolean;
    COMESA: boolean;
  };
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          persistSession: false
        }
      }
    )

    // Verify the user is an administrator
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token)

    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    // Check if user is administrator
    const { data: roles, error: roleError } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'administrator')
      .maybeSingle()

    if (roleError || !roles) {
      console.error('Role check error:', roleError)
      throw new Error('Administrator access required')
    }

    console.log('Starting REMA company sync...')

    // TODO: Replace with actual REMA API endpoint
    // For now, we'll create mock data simulating REMA API response
    const remaApiUrl = 'https://api.rema.gov.rw/mining-companies' // This is a placeholder
    
    // Mock REMA companies data (replace with actual API call when available)
    const mockREMACompanies: REMACompany[] = [
      {
        name: 'REMA Certified Mining Co.',
        registration_number: 'REMA-2024-101',
        contact_email: 'info@remacertified.rw',
        contact_phone: '+250788456789',
        address: 'Kigali City, Rwanda',
        mine_location_lat: -1.9536,
        mine_location_lng: 30.0605,
        certification_status: 'active',
        certification_start_date: '2024-01-15',
        certification_end_date: '2026-01-15',
        regional_compliance: {
          AU: true,
          REMA: true,
          ICGLR: true,
          COMESA: true
        }
      },
      {
        name: 'Northern Rwanda Minerals',
        registration_number: 'REMA-2024-102',
        contact_email: 'contact@nrminerals.rw',
        contact_phone: '+250788567890',
        address: 'Musanze, Northern Province',
        mine_location_lat: -1.4984,
        mine_location_lng: 29.6363,
        certification_status: 'active',
        certification_start_date: '2024-02-01',
        certification_end_date: '2025-08-31',
        regional_compliance: {
          AU: false,
          REMA: true,
          ICGLR: true,
          COMESA: true
        }
      },
      {
        name: 'Southern Mining Operations Ltd',
        registration_number: 'REMA-2024-103',
        contact_email: 'admin@southernmining.rw',
        contact_phone: '+250788678901',
        address: 'Huye, Southern Province',
        mine_location_lat: -2.5962,
        mine_location_lng: 29.7396,
        certification_status: 'active',
        certification_start_date: '2024-03-10',
        certification_end_date: '2025-12-31',
        regional_compliance: {
          AU: true,
          REMA: true,
          ICGLR: false,
          COMESA: true
        }
      },
      {
        name: 'Western Province Gold Mines',
        registration_number: 'REMA-2024-104',
        contact_email: 'info@westerngold.rw',
        contact_phone: '+250788789012',
        address: 'Karongi, Western Province',
        mine_location_lat: -2.0108,
        mine_location_lng: 29.2768,
        certification_status: 'active',
        certification_start_date: '2024-01-20',
        certification_end_date: '2026-06-30',
        regional_compliance: {
          AU: true,
          REMA: true,
          ICGLR: true,
          COMESA: false
        }
      }
    ]

    let syncedCount = 0
    let skippedCount = 0
    const errors: string[] = []

    for (const company of mockREMACompanies) {
      try {
        // Check if company already exists
        const { data: existing } = await supabaseClient
          .from('companies')
          .select('id')
          .eq('registration_number', company.registration_number)
          .maybeSingle()

        if (existing) {
          console.log(`Company ${company.registration_number} already exists, updating...`)
          const { error: updateError } = await supabaseClient
            .from('companies')
            .update({
              name: company.name,
              contact_email: company.contact_email,
              contact_phone: company.contact_phone,
              address: company.address,
              mine_location_lat: company.mine_location_lat,
              mine_location_lng: company.mine_location_lng,
              certification_status: company.certification_status,
              certification_start_date: company.certification_start_date,
              certification_end_date: company.certification_end_date,
              regional_compliance: company.regional_compliance,
              is_active: true,
            })
            .eq('id', existing.id)

          if (updateError) {
            errors.push(`Failed to update ${company.name}: ${updateError.message}`)
          } else {
            syncedCount++
          }
        } else {
          console.log(`Inserting new company: ${company.name}`)
          const { error: insertError } = await supabaseClient
            .from('companies')
            .insert({
              name: company.name,
              registration_number: company.registration_number,
              contact_email: company.contact_email,
              contact_phone: company.contact_phone,
              address: company.address,
              mine_location_lat: company.mine_location_lat,
              mine_location_lng: company.mine_location_lng,
              certification_status: company.certification_status,
              certification_start_date: company.certification_start_date,
              certification_end_date: company.certification_end_date,
              regional_compliance: company.regional_compliance,
              is_active: true,
            })

          if (insertError) {
            errors.push(`Failed to insert ${company.name}: ${insertError.message}`)
          } else {
            syncedCount++
          }
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error'
        errors.push(`Error processing ${company.name}: ${errorMsg}`)
      }
    }

    console.log(`REMA sync completed: ${syncedCount} synced, ${skippedCount} skipped, ${errors.length} errors`)

    return new Response(
      JSON.stringify({
        success: true,
        message: 'REMA company sync completed',
        synced: syncedCount,
        skipped: skippedCount,
        errors: errors.length > 0 ? errors : undefined
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error in sync-rema-companies:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
