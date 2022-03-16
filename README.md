# Seqwa Autocomplete API Implementation

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/nextjs-rhzhwj)

# Autocomplete

Autocomplete performs a fundamental and essential to help users complete a search. Autocomplete offers query suggestions, related named entities, and top full-text search results.</p><p>

Implementing a user interface must include an API call for any change in the query, like adding or removing a character. Having a caching mechanism can considerably reduce the number of API calls.

## Request URL

https://www.seqwa.com/api/v1/autocomplete

## Method

GET

## Headers

Content-Type application/json
seqwa-api-key API KEY generated for the Autocomplete

## Function

### Params

```
index | Index Id | required
query | Query text entered by the user. Supports Lucene query parser syntax which includes AND, OR, and NOT operands, term query like fieldName:fieldValue, and range query like fieldName:[minFieldValue TO maxFieldValue] | required
highlightField | Field for highlighting the query text | optional
fields | Array of fields | optional
maxResults | Maximum results to be returned. (Default: 10, Limit: 25) | optional
```

### Request URL Structure

```https://www.seqwa.com/api/v1/autocomplete?index=
INDEX_ID&query=QUERY_TEXT&highlightField=SEARCH_FIELD
&fields=FIELDS&maxResults=MAX_RESULTS
```

### Response

```
suggestions | Contains an array of suggestions for queries based on the query text. Each element of the array is an object with  suggest  and displaySuggest  parameters. The suggest param is plain text and displaySuggest has highlighted words with the html <b> element.
relatedItems | Contains an array of top tags from the search results.
records | Top search results based on the search query and upto maximum number of results requested.
error | Returns an error message if any error occurs on the server.
```

### Response JSON Structure

```
{
  "suggestions": [
    {
      "suggest": "...",
      "displaySuggest": "&lt;b&gt;....&lt;/b&gt; ..."
    },
    {
      "suggest": "...",
      "displaySuggest": "&lt;b&gt;....&lt;/b&gt; ..."
    }
  ],
  "relatedItems": [
    "...",
    "..."
  ],
  "records": [
    {
      "title....": "......",
      "link.....": "......",
      "image......": "......"
    },
    {
      "....": "......",
      ".....": "......",
      "......": "......"
    }
  ],
  "error": "....."
}
```
