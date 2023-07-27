export default interface IControllerBasic {
  get: (payload: any) => Promise<any>;
  post: (payload: any) => Promise<any>;
  delete: (payload: any) => Promise<any>;
  update: (payload: any) => Promise<any>;
}
