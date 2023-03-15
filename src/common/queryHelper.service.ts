import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class QueryHelper {
  constructor(@InjectDataSource() private readonly dataSoruce: DataSource) {}

  convertToQueryWithParameters(
    queryToExec: string,
    queryParameters: object,
  ): IConvertedQuery {
    const [generatedQuery, generatedParams] =
      this.dataSoruce.driver.escapeQueryWithParameters(
        queryToExec,
        queryParameters,
        {},
      );
    return { query: generatedQuery, params: generatedParams };
  }
}

export type IConvertedQuery = {
  query: string;
  params: any[];
};
