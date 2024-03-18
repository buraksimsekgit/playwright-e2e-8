import { expect } from '@playwright/test'

// Utility function to compare response body against the request body
function compareResponseWithRequest(responseBody, requestBody) {
  for (const key in requestBody) {
    expect(responseBody[key]).toBe(requestBody[key])
  }
}

export default compareResponseWithRequest
