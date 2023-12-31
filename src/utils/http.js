import { baseURL } from 'constants/httpConstants';
import { toast } from 'react-toastify';

// NOTE: fetch function accept object that includes:
// endpoint, method, headers, body, params
export const fetchData = async ({
  endpoint,
  method = 'GET',
  headers = {},
  body = null,
  params = {},
  notification = null,
}) => {
  // create new url based on constant url and endpoint
  const url = new URL(`${baseURL}/${endpoint}`);

  const preparedParams = Object.keys(params);

  // Append params to the URL if any are provided
  if (preparedParams?.length) {
    preparedParams.forEach((key) => url.searchParams.append(key, params[key]));
  }

  // request options could be updated
  const options = {
    method: method.toLowerCase(), // request type should be standardized
    headers: {
      'Content-Type': 'application/json', // headers could be rewrite
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  };

  // waiting for response
  const response = await fetch(url.toString(), options);

  // if any error occurs it will be throw with current status
  if (!response.ok) {
    toast(notification ? notification.error.message : 'Failed to fetch data');
  }

  const data = await response.json();

  toast(notification ? notification.success.message : 'Successfully fetched');
  return data;
};
