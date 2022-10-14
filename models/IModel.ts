import { QueryResult } from 'pg';

interface IModel {
	insert(a?: any, b?: any, c?: any): Promise<QueryResult | Error>;
	select(a?: number): Promise<QueryResult | Error>;
	searchBy(a?: number | string): Promise<QueryResult | Error>;
	update(a?: number, b?: string, c?: any): Promise<QueryResult | Error>;
	remove(a?: number): Promise<QueryResult | Error>;
	itExists(a?: any): Promise<boolean>;
}

export default IModel;
