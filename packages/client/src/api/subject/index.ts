import { axiosInstance, type APIResponse } from '..'

export async function getSubjectByIds(ids: []): Promise<APIResponse> {
  try {
    const { data } = await axiosInstance.get<any>(`subject`)
    return [null, data]
  } catch (error) {
    console.error(error)
    return [error as Error]
  }
}
