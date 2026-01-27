// Quick test script for LectServe API
import { getDailyOfficeReadings } from '../src/lib/lectserve-api';

async function testLectServeAPI() {
  console.log('🧪 Testing LectServe API Integration\\n');
  
  // Test with today's date
  const today = new Date();
  console.log(`Testing with date: ${today.toISOString().split('T')[0]}`);
  
  try {
    const readings = await getDailyOfficeReadings(today);
    
    console.log('\\n✅ API Response:');
    console.log(JSON.stringify(readings, null, 2));
    
    console.log('\\n📊 Summary:');
    console.log(`- Morning Psalms: ${readings.psalms.morning.length} items`);
    console.log(`- Evening Psalms: ${readings.psalms.evening.length} items`);
    console.log(`- First Lesson: ${readings.lessons.first || 'N/A'}`);
    console.log(`- Second Lesson: ${readings.lessons.second || 'N/A'}`);
    console.log(`- Gospel: ${readings.lessons.gospel || 'N/A'}`);
    
    console.log('\\n✅ Test passed!');
  } catch (error) {
    console.error('\\n❌ Test failed:', error);
  }
}

testLectServeAPI();
