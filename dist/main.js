"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs"));
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
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
        const serviceFilePath = core.getInput('serviceFilePath');
        const output = [];
        const jsonStr = fs.readFileSync(serviceFilePath, 'utf-8');
        const jsonData = JSON.parse(jsonStr);
        // let a = 'languageEnv'
        // let b = 'languageEnvVersion'
        const a = core.getInput('languageField');
        const b = core.getInput('languageVersionField');
        for (const index in jsonData) {
            let languageType = jsonData[index][a];
            let languageVersion = jsonData[index][b];
            if (languageType === undefined) {
                languageType = '';
            }
            if (languageVersion === undefined) {
                languageVersion = '';
            }
            const language = languageType + '/' + languageVersion;
            output.push(language);
        }
        const result = Array.from(new Set(output));
        console.log(result);
        core.setOutput('language', result);
        // readLocalJsonFile('service.json').then(
        //   json => {
        //     for(let index in json) {
        //       console.log(typeof json[index].languageEnv)
        //     }
        //   }
        // ).catch(error => {
        //   console.error(error)
        // })
    }
    catch (error) {
        // Fail the workflow run if an error occurs
        if (error instanceof Error)
            core.setFailed(error.message);
    }
}
exports.run = run;
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
//# sourceMappingURL=main.js.map