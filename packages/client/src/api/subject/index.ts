import { axiosInstance, type APIResponse } from '..'
import { type CreateSubjectDto } from '@tap/server/out/models/dtos/CreateSubjectDto'
import { type UpdateSubjectDto } from '@tap/server/out/models/dtos/UpdateSubjectDto'
import { type IdsQuery } from '@tap/server/out/models/dtos/IdsQuery'

/**
 * Create new subjects
 * @param subjects subjects array
 * @returns
 */
export async function postSubject(subjects: CreateSubjectDto['subjects']): Promise<APIResponse> {
  try {
    const { data } = await axiosInstance.post(`subject`, {
      subjects
    } as CreateSubjectDto)
    return [null, data]
  } catch (error) {
    console.error(error)
    return [error as Error]
  }
}

/**
 * Get subjects
 * @param ids empty array - return all
 * @returns
 */
export async function getSubject(ids: IdsQuery['ids']): Promise<APIResponse> {
  const params: IdsQuery = { ids }
  try {
    const { data } = await axiosInstance.get(`subject/getWithDivision`, { params })
    return [null, data]
  } catch (error) {
    console.error(error)
    return [error as Error]
  }
}

/**
 * Delete subjects by ids
 * @param ids
 * @returns
 */
export async function deleteSubject(ids: IdsQuery['ids']): Promise<APIResponse> {
  const params: IdsQuery = { ids }
  try {
    const { data } = await axiosInstance.delete(`subject`, { params })
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
export async function putSubject(subject: UpdateSubjectDto['subject']): Promise<APIResponse> {
  try {
    const { data } = await axiosInstance.put(`subject`, { subject } as UpdateSubjectDto)
    return [null, data]
  } catch (error) {
    console.error(error)
    return [error as Error]
  }
}
