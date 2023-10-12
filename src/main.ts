import * as core from '@actions/core'
import * as fs from 'fs'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // const ms: string = core.getInput('milliseconds')

    // // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    // core.debug(`Waiting ${ms} milliseconds ...`)

    // // Log the current timestamp, wait, then log the new timestamp
    // core.debug(new Date().toTimeString())
    // await wait(parseInt(ms, 10))
    // core.debug(new Date().toTimeString())

    // // Set outputs for other workflow steps to use
    // core.setOutput('time', new Date().toTimeString())
    const serviceFilePath: string = core.getInput('serviceFilePath')
    const output: string[] = []
    const jsonStr = fs.readFileSync(serviceFilePath, 'utf-8')
    const jsonData = JSON.parse(jsonStr)
    // let a = 'languageEnv'
    // let b = 'languageEnvVersion'
    const a = core.getInput('languageField')
    const b = core.getInput('languageVersionField')

    for (const index in jsonData) {
      let languageType = jsonData[index][a]
      let languageVersion = jsonData[index][b]
      if (languageType === undefined) {
        languageType = ''
      }
      if (languageVersion === undefined) {
        languageVersion = ''
      }
      const language = languageType + '/' + languageVersion
      output.push(language)
    }

    const result = Array.from(new Set(output))
    console.log(result)
    core.setOutput('language', result)
    // readLocalJsonFile('service.json').then(
    //   json => {
    //     for(let index in json) {
    //       console.log(typeof json[index].languageEnv)
    //     }
    //   }
    // ).catch(error => {
    //   console.error(error)
    // })
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}

// read service message file from localpath
// function readLocalJsonFile(filepath: string): Promise<any> {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filepath, 'utf-8', (err, data) => {
//       if (err) {
//         reject(err)
//       } else {
//         try {
//           const json = JSON.parse(data)
//           resolve(json)
//         } catch (error) {
//           reject(error)
//         }
//       }
//     })
//   })
// }
