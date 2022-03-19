import Head from 'next/head';
import AutocompleteBox from '../components/autocompletebox';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-400 to-sky-400">
      <Head>
        <title>Seqwa | Autocomplete</title>
      </Head>
      <AutocompleteBox />
    </div>
  );
}
