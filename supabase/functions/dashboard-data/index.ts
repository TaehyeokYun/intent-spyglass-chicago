import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { password, startDate, endDate } = await req.json();

    const dashPassword = Deno.env.get("DASHBOARD_PASSWORD");
    if (!dashPassword || password !== dashPassword) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch intent events
    let query = supabase
      .from("deal_intent_events")
      .select("*")
      .order("created_at", { ascending: false });

    if (startDate) query = query.gte("created_at", startDate);
    if (endDate) query = query.lte("created_at", endDate);

    // Fetch up to 5000 rows in batches
    const allEvents: any[] = [];
    const batchSize = 1000;
    for (let i = 0; i < 5; i++) {
      const { data, error } = await query.range(
        i * batchSize,
        (i + 1) * batchSize - 1
      );
      if (error) throw error;
      if (!data || data.length === 0) break;
      allEvents.push(...data);
      if (data.length < batchSize) break;
    }

    // Fetch restaurants
    const { data: restaurants, error: restError } = await supabase
      .from("happyhour_mvp_chicago")
      .select(
        "restaurant_id, name, neighborhood, latitude, longitude, address"
      );
    if (restError) throw restError;

    // Fetch campaigns
    const { data: campaigns, error: campError } = await supabase
      .from("campaigns_mvp_chicago")
      .select("campaign_id, offer_name, restaurant_id, status");
    if (campError) throw campError;

    return new Response(
      JSON.stringify({
        events: allEvents,
        restaurants: restaurants || [],
        campaigns: campaigns || [],
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
