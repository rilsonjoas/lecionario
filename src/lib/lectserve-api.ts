import { format } from 'date-fns';

interface DailyOfficePsalms {
  morning: string[];
  evening: string[];
}

interface DailyOfficeLessons {
  first: string;
  second: string;
  gospel?: string;
}

export interface DailyOfficeReading {
  date: string;
  psalms: DailyOfficePsalms;
  lessons: DailyOfficeLessons;
}

// Simple in-memory cache with 24h TTL
const cache = new Map<string, { data: DailyOfficeReading; expires: number }>();

/**
 * Get cached readings if available and not expired
 */
function getCachedReadings(dateStr: string): DailyOfficeReading | null {
  const cached = cache.get(dateStr);
  if (cached && cached.expires > Date.now()) {
    return cached.data;
  }
  // Remove expired entry
  if (cached) {
    cache.delete(dateStr);
  }
  return null;
}

/**
 * Cache readings for 24 hours
 */
function setCachedReadings(dateStr: string, data: DailyOfficeReading): void {
  cache.set(dateStr, {
    data,
    expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  });
}

/**
 * Fetch Daily Office readings from LectServe API
 * Uses ACNA Daily Office Lectionary
 */
export async function getDailyOfficeReadings(date: Date): Promise<DailyOfficeReading> {
  const dateStr = format(date, 'yyyy-MM-dd');
  
  // Check cache first
  const cached = getCachedReadings(dateStr);
  if (cached) {
    console.log(`[LectServe] Using cached readings for ${dateStr}`);
    return cached;
  }

  console.log(`[LectServe] Fetching readings for ${dateStr}`);
  
  try {
    const response = await fetch(`https://lectserve.com/date/${dateStr}`);
    
    if (!response.ok) {
      throw new Error(`LectServe API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Transform API response to our format
    const readings: DailyOfficeReading = {
      date: dateStr,
      psalms: {
        morning: data.daily?.psalms?.morning || [],
        evening: data.daily?.psalms?.evening || [],
      },
      lessons: {
        first: data.daily?.lessons?.first || '',
        second: data.daily?.lessons?.second || '',
        gospel: data.daily?.lessons?.gospel,
      },
    };

    // Cache the result
    setCachedReadings(dateStr, readings);
    
    return readings;
  } catch (error) {
    console.error('[LectServe] Error fetching readings:', error);
    
    // Return empty readings on error
    return {
      date: dateStr,
      psalms: {
        morning: [],
        evening: [],
      },
      lessons: {
        first: '',
        second: '',
      },
    };
  }
}

/**
 * Clear the entire cache (useful for testing or manual refresh)
 */
export function clearReadingsCache(): void {
  cache.clear();
  console.log('[LectServe] Cache cleared');
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return {
    size: cache.size,
    entries: Array.from(cache.keys()),
  };
}
