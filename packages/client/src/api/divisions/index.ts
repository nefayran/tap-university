import { axiosInstance, type APIResponse } from '..'
import { type CreateDivisionDto } from '@tap/server/out/models/dtos/CreateDivisionDto'
import { type IdsQuery } from '@tap/server/out/models/dtos/IdsQuery'
import { type UpdateDivisionDto } from '@tap/server/out/models/dtos/UpdateDivisionDto'

/**
 * Create new divisions
 * @param divisions divisions array
 * @returns
 */
export async function postDivision(divisions: CreateDivisionDto['divisions']): Promise<APIResponse> {
  try {
    const { data } = await axiosInstance.post(`division`, {
      divisions
    } as CreateDivisionDto)
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
export async function getDivision(ids: IdsQuery['ids']): Promise<APIResponse> {
  const params: IdsQuery = { ids }
  try {
    const { data } = await axiosInstance.get(`division`, { params })
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
export async function deleteDivision(ids: IdsQuery['ids']): Promise<APIResponse> {
  const params: IdsQuery = { ids }
  try {
    const { data } = await axiosInstance.delete(`division`, { params })
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
export async function putDivision(division: UpdateDivisionDto['division']): Promise<APIResponse> {
  try {
    const { data } = await axiosInstance.put(`division`, { division } as UpdateDivisionDto)
    return [null, data]
  } catch (error) {
    console.error(error)
    return [error as Error]
  }
}
