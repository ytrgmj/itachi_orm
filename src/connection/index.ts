/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-01-20 13:51:09
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-01-20 15:16:30
 */

export class Connection {
  readonly options

  constructor (options) {
    this.options = options
  }

  async connect (): Promise<this> {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('connect')
        resolve()
      }, 1000)
    })
    return this
  }
}
