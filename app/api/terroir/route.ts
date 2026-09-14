import { NextRequest, NextResponse } from 'next/server';
import { TERROIR_PROFILES_DATA, TerroirZoneData } from '@/lib/terroirData';
import { PRODUCTS } from '@/lib/products';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const zoneQuery = searchParams.get('zone');
    const batchQuery = searchParams.get('batch');

    // Generate real-time dynamic timestamp and subtle sensor telemetry jitter for realistic live apiary data
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', {
      timeZone: 'America/New_York',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    // 1. Batch Certificate Lookup endpoint
    if (batchQuery) {
      const normalizedBatch = batchQuery.trim().toUpperCase();
      const matchedZone = TERROIR_PROFILES_DATA.find(
        (z) => z.labCertificate.lotNumber.toUpperCase() === normalizedBatch
      );

      if (!matchedZone) {
        return NextResponse.json(
          {
            success: false,
            error: `Lot certificate '${batchQuery}' not found in official apiary harvest registry. Valid active lots: LOT-NJ-2026-DEC, LOT-NJ-2026-SKY, LOT-NJ-2026-PIN, LOT-NJ-2026-DEL.`
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        type: 'batch_certificate',
        lotNumber: matchedZone.labCertificate.lotNumber,
        zoneName: matchedZone.name,
        region: matchedZone.region,
        certificate: matchedZone.labCertificate,
        sensoryProfile: matchedZone.sensory,
        purityGuarantee: {
          heatTreated: false,
          maxExtractionTempF: 95.0,
          spectrophotometerVerified: true,
          zeroMicroFiltration: true,
          rawEnzymeActive: true
        },
        verifiedAt: `${now.toISOString()} (${formattedTime} EDT)`
      });
    }

    // 2. Zone specific query
    if (zoneQuery) {
      const normalizedZone = zoneQuery.trim().toLowerCase();
      const zone = TERROIR_PROFILES_DATA.find((z) => z.id.toLowerCase() === normalizedZone);

      if (!zone) {
        return NextResponse.json(
          { success: false, error: `Zone '${zoneQuery}' not found.` },
          { status: 404 }
        );
      }

      // Attach matching products from catalog
      const matchingProducts = PRODUCTS.filter((p) =>
        zone.associatedProductIds.includes(p.id)
      );

      return NextResponse.json({
        success: true,
        type: 'single_zone',
        zone: {
          ...zone,
          telemetry: {
            ...zone.telemetry,
            lastSyncTime: `${formattedTime} EDT`
          }
        },
        matchingProducts,
        syncedAt: now.toISOString()
      });
    }

    // 3. Full Terroir Telemetry & Profiles list
    const enrichedZones: TerroirZoneData[] = TERROIR_PROFILES_DATA.map((zone, idx) => {
      // Small simulated diurnal variation
      const tempVariation = (idx % 2 === 0 ? 0.3 : -0.2);
      return {
        ...zone,
        telemetry: {
          ...zone.telemetry,
          ambientTempF: Number((zone.telemetry.ambientTempF + tempVariation).toFixed(1)),
          lastSyncTime: `${formattedTime} EDT`
        }
      };
    });

    const activeHarvest = {
      season: 'Autumn Extraction & Cellar Vaulting',
      harvestYear: 2026,
      apiaryHeadquarters: 'Avenoir Sussex Research Apiary, High Point Foothills, NJ',
      activeHivesMonitored: 84,
      totalCertifiedVarietals: 4,
      aggregateDiastaseAverageDN: 31.2,
      maxCellarTempF: 95.0
    };

    return NextResponse.json(
      {
        success: true,
        timestamp: now.toISOString(),
        liveTimeDisplay: `${formattedTime} EDT`,
        weatherStation: {
          location: 'Sussex County Microclimate Weather Array',
          latitude: 41.2218,
          longitude: -74.6205,
          elevationFt: 980,
          barometricTrend: 'Steady (30.10 inHg)',
          airQualityIndex: 'Pristine (AQI 14)',
          foragingActivityStatus: 'Peak Foraging & Propolis Gathering',
          sensorStatus: '100% Operational (4/4 telemetry nodes reporting)'
        },
        activeHarvest,
        zones: enrichedZones
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=30'
        }
      }
    );
  } catch (error) {
    console.error('Error fetching terroir data:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error fetching terroir data' },
      { status: 500 }
    );
  }
}
