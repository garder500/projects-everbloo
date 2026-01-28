import { handleSabreShopping } from "./src/commands/sabreShopping";

async function main() {
  const args = Bun.argv.slice(2);

  if (args.length < 2) {
    printUsage();
    return;
  }

  const [command, subcommand, ...rest] = args;

  switch (command) {
    case "sabre":
      switch (subcommand) {
        case "shopping":
          const fileIndex = rest.indexOf("--file");
          if (fileIndex === -1 || fileIndex + 1 >= rest.length) {
            console.error("Error: --file argument missing or incomplete");
            return;
          }
          const filename = rest[fileIndex + 1];

          const flightIndex = rest.indexOf("--flight");
          let flightFilter: string | undefined;
          if (flightIndex !== -1 && flightIndex + 1 < rest.length) {
            flightFilter = rest[flightIndex + 1];
          }

          const brandIndex = rest.indexOf("--brand");
          let brandFilter: string | undefined;
          if (brandIndex !== -1 && brandIndex + 1 < rest.length) {
            brandFilter = rest[brandIndex + 1];
          }

          const offerIndex = rest.indexOf("--offer");
          let offerId: string | undefined;
          if (offerIndex !== -1 && offerIndex + 1 < rest.length) {
            offerId = rest[offerIndex + 1];
          }

          await handleSabreShopping(filename, { flightFilter, brandFilter, offerId });
          break;
        default:
          printUsage();
          break;
      }
      break;
    default:
      printUsage();
      break;
  }
}

function printUsage() {
  console.error("Usage: metis-db <command> <subcommand> [options]");
  console.error("Commands:");
  console.error("  sabre shopping --file <filename> [--flight <code] [--brand <name>] [--offer <id>]");
  console.error("    --flight: Filter by flight number (e.g. AF123)");
  console.error("    --brand:  Filter by brand name (e.g. Standard)");
  console.error("    --offer:  Show detailed tariff conditions for a specific Offer ID");
}

main();