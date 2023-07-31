import { axiosInstance, type APIResponse } from '..'
import type { CalculateExamineDto } from '@tap/server/out/models/dtos/CalculateExamineDto'
import type { ExamineBasic } from '@tap/server/out/models/domain/models/Examine'

/**
 * Calculate examines
 * @param examines examines array
 * @returns
 */
export async function calculateExamines(examines: Array<ExamineBasic>): Promise<APIResponse> {
  try {
    const { data } = await axiosInstance.post(`examine/calculate`, {
      examines
    } as CalculateExamineDto)
    return [null, data]
  } catch (error) {
    console.error(error)
    return [error as Error]
  }
}
