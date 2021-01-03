export interface IBaseCategory {
    id: number;
    name: string;
    parentModel?: IBaseCategory;
}
