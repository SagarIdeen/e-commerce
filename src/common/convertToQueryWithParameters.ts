import { getConnection } from 'typeorm';
export type IConvertedQuery = {
  query: string;
  params: any[];
};
export function convertToQueryWithParameters(
  queryToExec: string,
  queryParameters: object,
): IConvertedQuery {
  const [generatedQuery, generatedParams] =
    getConnection().driver.escapeQueryWithParameters(
      queryToExec,
      queryParameters,
      {},
    );
  return { query: generatedQuery, params: generatedParams };
}
