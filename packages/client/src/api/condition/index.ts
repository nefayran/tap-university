import { axiosInstance, type APIResponse } from '..'
import { type UpdateConditionDto } from '@tap/server/out/models/dtos/UpdateConditionDto'
import { type IdsQuery } from '@tap/server/out/models/dtos/IdsQuery'
import type { CreateConditionDto } from '@tap/server/out/models/dtos/CreateConditionDto'

/**
 * Get types
 * @returns
 */
export async function getTypes(): Promise<APIResponse> {
  try {
    const { data } = await axiosInstance.get(`condition/getTypes`)
    return [null, data]
  } catch (error) {
    return [error as Error]
  }
}

/**
 * Get operators
 * @returns
 */
export async function getOperators(): Promise<APIResponse> {
  try {
    const { data } = await axiosInstance.get(`condition/getOperators`)
    return [null, data]
  } catch (error) {
    return [error as Error]
  }
}

/**
 * Create new conditions
 * @param conditions conditions array
 * @returns
 */
export async function postCondition(conditions: CreateConditionDto['conditions']): Promise<APIResponse> {
  try {
    const { data } = await axiosInstance.post(`condition`, {
      conditions
    } as CreateConditionDto)
    return [null, data]
  } catch (error) {
    console.error(error)
    return [error as Error]
  }
}

/**
 * Get conditions
 * @param ids empty array - return all
 * @returns
 */
export async function getCondition(ids: IdsQuery['ids']): Promise<APIResponse> {
  const params: IdsQuery = { ids }
  try {
    const { data } = await axiosInstance.get(`condition`, { params })
    return [null, data]
  } catch (error) {
    console.error(error)
    return [error as Error]
  }
}

/**
 * Delete conditions by ids
 * @param ids
 * @returns
 */
export async function deleteCondition(ids: IdsQuery['ids']): Promise<APIResponse> {
  const params: IdsQuery = { ids }
  try {
    const { data } = await axiosInstance.delete(`condition`, { params })
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
export async function putCondition(condition: UpdateConditionDto['condition']): Promise<APIResponse> {
  try {
    const { data } = await axiosInstance.put(`condition`, { condition } as UpdateConditionDto)
    return [null, data]
  } catch (error) {
    console.error(error)
    return [error as Error]
  }
}
