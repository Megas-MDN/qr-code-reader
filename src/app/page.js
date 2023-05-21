import Hero from '@/components/Hero';

export default function Home() {
  const baseUrl = process.env.URL_BASE_BACK;
  return (
    <div className='relative h-full flex flex-col items-center justify-between'>
      <Hero {...{ baseUrl }} />
    </div>
  );
}
