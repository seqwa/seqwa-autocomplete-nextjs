// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const input = req.query;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'seqwa-api-key': 'ca3a6ba08d244a50ee43774b4e367c8876c214c4', // Replace with your API Key
    },
  };
  const params = {
    index: 'cde1d8e5-f0af-4498-801d-3ff82acec9c6', // Replace with your Index Id
    query: input.query,
    highlightField: 'title', // Include the field that needs to be highlighted for the suggestions. It is optional. By not setting this field you may end up with results from any field.
    fields: ['title', 'price', 'image', 'link'],
    maxResults: 25,
  };

  const autocompleteResponse = await fetch(
    'https://www.seqwa.com/api/v1/autocomplete?' + new URLSearchParams(params),
    options
  );
  const response = await autocompleteResponse.json();
  res.status(200).json(response);
};
