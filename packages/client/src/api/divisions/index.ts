import { axiosInstance, type APIResponse } from '..'

/**
 * Create new divisions
 * @param divisions divisions array
 * @returns
 */
export async function postDivision(divisions: []): Promise<APIResponse> {
  try {
    // TODO: Remove any
    const { data } = await axiosInstance.post<any>(`division`, {
      divisions
    })
    return [null, data]
  } catch (error) {
    console.error(error)
    return [error as Error]
  }
}

/**
 * Get divisions
 * @param ids empty array - return all
 * @returns
 */
export async function getDivision(ids: []): Promise<APIResponse> {
  const params = { ids }
  try {
    // TODO: Remove any
    const { data } = await axiosInstance.get<any>(`division`, { params })
    return [null, data]
  } catch (error) {
    console.error(error)
    return [error as Error]
  }
}

/**
 * Delete divisions by ids
 * @param ids
 * @returns
 */
export async function deleteDivision(ids: []): Promise<APIResponse> {
  const params = { ids }
  try {
    // TODO: Remove any
    const { data } = await axiosInstance.delete<any>(`division`, { params })
    return [null, data]
  } catch (error) {
    console.error(error)
    return [error as Error]
  }
}

/**
 * Delete divisions by ids
 * @param ids
 * @returns
 */
export async function putDivision(division: {}): Promise<APIResponse> {
  try {
    // TODO: Remove any
    const { data } = await axiosInstance.put<any>(`division`, { division })
    return [null, data]
  } catch (error) {
    console.error(error)
    return [error as Error]
  }
}
