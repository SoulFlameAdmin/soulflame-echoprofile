const fs = require("fs");
const path = require("path");
const { LocalDataAdapter } = require("./local-data-adapter");
const { SupabaseDataAdapter } = require("./supabase-adapter");

function createDataAdapter(options) {
  const {
    dataMode,
    dataDir,
    supabaseUrl,
    supabaseAnonKey,
    supabaseServiceRoleKey
  } = options;

  const warnings = [];

  if (dataMode === "supabase") {
    try {
      const adapter = new SupabaseDataAdapter({
        url: supabaseUrl,
        anonKey: supabaseAnonKey,
        serviceRoleKey: supabaseServiceRoleKey
      });

      return {
        adapter,
        activeMode: "supabase",
        warnings
      };
    } catch (error) {
      warnings.push(error.message);
      warnings.push("Fallback activated: local JSON adapter is being used.");
    }
  }

  const adapter = new LocalDataAdapter(fs, path, dataDir);

  return {
    adapter,
    activeMode: "local",
    warnings
  };
}

module.exports = { createDataAdapter };
