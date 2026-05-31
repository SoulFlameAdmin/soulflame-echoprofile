function getSystemInfo() {
  return {
    app: "SoulFlame EchoProfile",
    version: process.env.APP_VERSION || "V23_VERCEL_PREP",
    appMode: process.env.APP_MODE || "production",
    requestedDataMode: process.env.DATA_MODE || "supabase",
    supabaseConfigured: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
    ownerEmail: process.env.OWNER_EMAIL || "stere0metal360@gmail.com",
    time: new Date().toISOString()
  };
}

module.exports = { getSystemInfo };
