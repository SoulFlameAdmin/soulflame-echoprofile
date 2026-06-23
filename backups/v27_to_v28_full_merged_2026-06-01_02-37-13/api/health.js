module.exports = async function handler(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL || "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const anonKey = process.env.SUPABASE_ANON_KEY || "";
  const configured = Boolean(supabaseUrl && (serviceKey || anonKey));

  res.status(200).json({
    ok: true,
    app: "SoulFlame Twins",
    module: "EchoProfile",
    version: process.env.APP_VERSION || "V28_FULL_MERGED_INDEX",
    appMode: process.env.APP_MODE || "production",
    requestedDataMode: process.env.DATA_MODE || "supabase",
    activeDataMode: configured ? "supabase" : "missing_supabase_env",
    supabaseConfigured: configured,
    warnings: configured ? [] : ["Missing SUPABASE_URL or SUPABASE key"],
    ownerEmail: process.env.OWNER_EMAIL || "stere0metal360@gmail.com",
    time: new Date().toISOString()
  });
};