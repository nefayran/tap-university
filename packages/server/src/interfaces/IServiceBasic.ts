export default interface IServiceBasic {
  Get: (payload: any) => Promise<any>;
  Create: (payload: any) => Promise<any>;
  Delete: (payload: any) => Promise<any>;
  Update: (payload: any) => Promise<any>;
}
