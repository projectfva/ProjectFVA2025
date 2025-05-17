'use client';

export default function Home() {
  const handleClick = async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirect al checkout di Stripe
      }
    } catch (error) {
      console.error('Errore durante il checkout:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">PAY $1 AND SEE</h1>
      <button
        onClick={handleClick}
        className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800"
      >
        PAY $1 AND SEE
      </button>
    </main>
  );
}
