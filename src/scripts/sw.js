self.addEventListener('push', (event) => {
  console.log('Service worker pushing...');
 
  async function chainPromise() {
    await self.registration.showNotification('Ada cerita baru untuk Anda!', {
      body: 'Cek cerita terbaru di aplikasi kami.',
    });
  }
 
  event.waitUntil(chainPromise());
});