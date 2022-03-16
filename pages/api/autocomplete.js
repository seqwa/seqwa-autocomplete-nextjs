// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const input = req.query;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'seqwa-api-key': 'c70ead7c322c17b3fc90989342e051ec7850eb70',
    },
  };
  const params = {
    index: '335871c6-2647-41aa-b842-a93be4b08ed3',
    query: input.query,
    highlightField: 'title',
    fields: ['title'],
    maxResults: 25,
  };

  const autocompletResponse = await fetch(
    'https://www.seqwa.com/api/v1/autocomplete?' + new URLSearchParams(params),
    options
  );
  const response = await autocompletResponse.json();
  res.status(200).json(response);
};
