import { test, expect } from '../../fixtures/test-data-fixtures'
import compareResponseWithRequest from '../../helpers/compareResponseWithRequest'
import runQuery from '../../helpers/dbUtils'

test.describe.configure({ mode: 'serial' })



test.describe('Students', async () => {
  let studentId: string

  test('Create a new student using POST', async ({ request, studentsData }) => {


    const response = await request.post(process.env.API_ENDPOINT, {
      // headers: {
      //     Accept: 'application/json',
      //     Authorization: 'Bearer 2131sadaswd12312dasdas'
      // },
      data: studentsData.postRequestBody,
      // {
      //     firstName: 'Tech',
      //     lastName: 'Global',
      //     email: 'techy@gmail.com',
      //     dob: '2023-12-05'
      // }
    })

    expect(response.ok()).toBeTruthy()

    // Fetching the status code
    const statusCode = response.status()
    console.log('Status Code: ', statusCode)

    const responseBody = await response.json()
    console.log(responseBody) // log the entire response body

    // Accessing the 'name' property from the response body
    const name = responseBody.firstName
    console.log(name)

    studentId = responseBody.id

    // This will work if the response body EXACTLY matches with request body
    // expect(responseBody).toEqual(studentsData.postRequestBody)

    // for (const key in studentsData.postRequestBody) {
    //   expect(responseBody[key]).toBe(studentsData.postRequestBody[key])
    // }
    compareResponseWithRequest(responseBody, studentsData.postRequestBody)

    const query = `SELECT * FROM student WHERE email = '${studentsData.postRequestBody.email}'`
    const result = await runQuery(query)

    console.log(result + ' Is my Query')

    expect(result).toBeDefined()
    expect(result.length).toBe(1)
  })

  test('Create a new request using GET', async ({ request }) => {
    const response = await request.get(`${process.env.API_ENDPOINT}/${studentId}`)

    expect(response.ok()).toBeTruthy()

    const responseBody = await response.json()
    console.log(responseBody) // log the entire response body
  })


  test('Update a request using PUT', async ({ request, studentsData }) => {

    const response = await request.put(`${process.env.API_ENDPOINT}/${studentId}`, {
        data: studentsData.putRequestBody
    })

    expect(response.ok()).toBeTruthy()

    const responseBody = await response.json()
    console.log(responseBody) // log the entire response body

    compareResponseWithRequest(responseBody, studentsData.putRequestBody)
  })

  test('Delete a request using DELETE', async ({ request, studentsData }) => {
    const response = await request.delete(`${process.env.API_ENDPOINT}/${studentId}`)
    expect(response.ok()).toBeTruthy()


    const query = `SELECT * FROM student WHERE email = '${studentsData.putRequestBody.email}'`
    const result = await runQuery(query)

    expect(result.length).toBe(0)
  })
})
